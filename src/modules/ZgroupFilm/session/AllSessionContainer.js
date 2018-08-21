import React from "react";
import SessionComponent from "./SessionComponent";
import * as filmAction from "../filmAction";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import Search from "../../../components/common/Search";
import {Modal, OverlayTrigger, Panel, Tooltip} from 'react-bootstrap';
import FormInputDate from "../../../components/common/FormInputDate";
import * as helper from "../../../helpers/helper";


class AllSessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
            openFilter: false,
            filter: {
                startTime: "",
                endTime: "",
            },
            page: 1,
            query: '',
        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.allSessionSearchChange = this.allSessionSearchChange.bind(this);
        this.updateFormFilter = this.updateFormFilter.bind(this);
        this.showLoadingModal = this.showLoadingModal.bind(this);
        this.closeLoadingModal = this.closeLoadingModal.bind(this);
    }

    componentWillMount() {
        if (!helper.isEmptyInput(this.props.search)) {
            this.setState({
                query: this.props.search,
                page: 1
            });
        }
    }


    showLoadingModal() {
        this.props.filmAction.exportSessions(
            this.state.query,
            this.state.filter.startTime,
            this.state.filter.endTime,
            this.closeLoadingModal
        );
    }

    closeLoadingModal() {

        let json = this.props.excelSession;
        if (!json || json.length == 0) {
            helper.showErrorNotification("Không có dữ liệu");
            return;
        }
        let cols = [{"wch": 5}, {"wch": 25}, {"wch": 16}, {"wch": 8}, {"wch": 12}, {"wch": 10}, {"wch": 60}];//độ rộng cột
        //begin điểm danh
        json = this.props.excelSession.map((item, index) => {
            let a = this.props.allFilms.filter((film) => (film.id == item.film_id))[0];
            let b = this.props.rooms.filter((room) => (room.id === item.room_id))[0];
            if (item) {
                /* eslint-disable */
                let aa = "";
                item.seats && item.seats.map((seat) => {
                    aa += seat.type + ": " + (seat.price == '' ? 0 : seat.price) + " Vnđ; ";
                });
                let res = {
                    'STT': index + 1,
                    'Tên phim': a.name,
                    'Phòng': b.base_name + '-' + b.name,
                    'Chất lượng phim': item.film_quality,
                    'Ngày chiếu': item.start_date,
                    'Giờ chiếu': item.start_time,
                    'Giá vé': aa,
                };
                /* eslint-enable */
                return res;
            }
        });
        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(json, wb, 'Danh sách', cols, []);
        helper.saveWorkBookToExcel(wb,
            'Danh sách suất chiếu'
        );
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.filmAction.loadAllSessions(page);
    }

    updateFormFilter(event) {
        const field = event.target.name;
        let filter = {...this.state.filter};
        filter[field] = event.target.value;
        if (!helper.isEmptyInput(filter.startTime) && !helper.isEmptyInput(filter.endTime)) {
            this.setState({filter: filter, page: 1});
            this.props.filmAction.loadAllSessions(this.state.page, this.state.query, filter.startTime, filter.endTime);
        }
        else {
            this.setState({filter: filter});
        }

    }

    allSessionSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        this.props.filmAction.showFilmSession(value);
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.filmAction.loadAllSessions(
                1,
                value,
                this.state.filter.startTime,
                this.state.filter.endTime,
            );
            this.props.filmAction.loadShowingSession(1, value);
        }.bind(this), 500);
    }

    render() {
        const Filter = <Tooltip id="tooltip">Lọc</Tooltip>;
        const Export = <Tooltip id="tooltip">Xuất thành file excel</Tooltip>;
        const Add = <Tooltip id="tooltip">Thêm suất chiếu</Tooltip>;
        let first = this.props.totalCountAll ? (this.props.currentPageAll - 1) * this.props.limitAll + 1 : 0;
        let end = this.props.currentPageAll < this.props.totalPagesAll ? this.props.currentPageAll * this.props.limitAll : this.props.totalCountAll;
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{display: "flex"}}>
                                <h4 className="card-title">
                                    <strong>Danh sách tất cả suất chiếu</strong>
                                </h4>
                                {
                                    this.props.user.role === 2 ?
                                        <div>
                                            <OverlayTrigger
                                                placement="top"
                                                overlay={Add}
                                            >
                                                <button
                                                    onClick={() => {
                                                        this.props.filmAction.toggleSessionModal();
                                                        this.props.filmAction.handleSessionModal({});
                                                    }}
                                                    className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                    type="button">
                                                    <strong>+</strong>
                                                    <div className="ripple-container"/>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                        :
                                        ""
                                }

                                <div>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={Filter}
                                    >
                                        <button
                                            onClick={() => this.setState({openFilter: !this.state.openFilter,})}
                                            className="btn btn-primary btn-round btn-xs button-add none-margin "
                                            disabled={
                                                this.props.isLoadingAllSessions
                                            }
                                        >
                                            <i className="material-icons"
                                               style={{margin: "0px -4px", top: 0}}
                                            >filter_list</i>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                            </div>
                            <div>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={Export}
                                >
                                    <button
                                        onClick={this.showLoadingModal}
                                        className="btn btn-primary btn-round btn-xs button-add none-margin "
                                        disabled={
                                            this.props.isLoadingAllSessions
                                        }
                                    >
                                        <i className="material-icons"
                                           style={{margin: "0px -4px", top: 0}}
                                        >file_download</i>
                                    </button>
                                </OverlayTrigger>
                            </div>


                        </div>


                        <Search
                            onChange={this.allSessionSearchChange}
                            value={this.state.query}
                            placeholder="Nhập tên phim để tìm kiếm"
                        />
                        <Panel collapsible expanded={this.state.openFilter}>
                            <div className="row">
                                {/*<div className="col-md-3">*/}
                                {/*<br/>*/}
                                {/*<label className="label-control">Tên phim</label>*/}
                                {/*<Select*/}
                                {/*disabled={false}*/}
                                {/*value={''}*/}
                                {/*options={this.props.allFilms.map((film) => {*/}
                                {/*return {*/}
                                {/*...film,*/}
                                {/*value: film.id,*/}
                                {/*label: film.name*/}
                                {/*};*/}
                                {/*})}*/}
                                {/*onChange={() => {*/}
                                {/*}}*/}

                                {/*/>*/}
                                {/*</div>*/}
                                <div className="col-md-4">
                                    <FormInputDate
                                        label="Từ ngày"
                                        name="startTime"
                                        updateFormData={this.updateFormFilter}
                                        id="form-start-time"
                                        value={this.state.filter.startTime}
                                        maxDate={this.state.filter.endTime}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <FormInputDate
                                        label="Đến ngày"
                                        name="endTime"
                                        updateFormData={this.updateFormFilter}
                                        id="form-end-time"
                                        value={this.state.filter.endTime}
                                        minDate={this.state.filter.startTime}
                                    />
                                </div>

                            </div>
                        </Panel>
                        <br/>

                    </div>
                    <div>
                        {
                            this.props.isLoadingAllSessions ? <Loading/> :
                                <SessionComponent
                                    totalCount={this.props.totalCountAll}
                                    currentPage={this.props.currentPageAll}
                                    sessions={this.props.allSessions}/>
                        }
                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {first}
                                    - {end}/{this.props.totalCountAll}</b><br/>
                                <Pagination
                                    totalPages={this.props.totalPagesAll}
                                    currentPage={this.props.currentPageAll}
                                    loadDataPage={this.loadOrders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.props.isLoadingExcelSession}
                    onHide={() => {
                    }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading/></Modal.Body>
                </Modal>
            </div>
        );
    }
}

AllSessionContainer.propTypes = {
    allSessions: PropTypes.array.isRequired,
    allFilms: PropTypes.array.isRequired,
    excelSession: PropTypes.array.isRequired,
    search: PropTypes.string.isRequired,
    filmAction: PropTypes.object.isRequired,
    isLoadingAllSessions: PropTypes.bool.isRequired,
    isLoadingExcelSession: PropTypes.bool.isRequired,
    totalCountAll: PropTypes.number.isRequired,
    totalPagesAll: PropTypes.number.isRequired,
    limitAll: PropTypes.oneOfType([
        PropTypes.number.isRequired,
        PropTypes.string.isRequired
    ]),
    currentPageAll: PropTypes.number.isRequired,
    rooms: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        allSessions: state.film.allSessions,
        allFilms: state.film.allFilms,
        isLoadingAllSessions: state.film.isLoadingAllSessions,
        totalCountAll: state.film.totalCountAll,
        totalPagesAll: state.film.totalPagesAll,
        currentPageAll: state.film.currentPageAll,
        limitAll: state.film.limitAll,
        search: state.film.search,
        isLoadingExcelSession: state.film.isLoadingExcelSession,
        excelSession: state.film.excelSession,
        rooms: state.film.rooms,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllSessionContainer);