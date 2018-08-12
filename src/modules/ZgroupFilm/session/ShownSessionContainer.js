import React from "react";
import SessionComponent from "./SessionComponent";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as filmAction from "../filmAction";
import {bindActionCreators} from 'redux';
import Pagination from "../../../components/common/Pagination";
import Loading from "../../../components/common/Loading";
import TooltipButton from "../../../components/common/TooltipButton";
import Search from "../../../components/common/Search";
import * as helper from "../../../helpers/helper";
// import Select from "react-select";
// import {Panel} from "react-bootstrap";
// import FormInputDate from "../../components/common/FormInputDate";


class ShownSessionContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.path = '';
        this.state = {
            type: "edit",
            link: "/film/session",
            // openFilter: false,
            // filter: {
            //     startTime: "",
            //     endTime: "",
            // },
            page: 1,
            query: '',
        };
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.showingSessionSearchChange = this.showingSessionSearchChange.bind(this);
    }

    componentWillMount() {
        if (!helper.isEmptyInput(this.props.search)) {
            this.setState({
                query: this.props.search,
                page: 1
            });
        }
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.filmAction.loadShownSession(page);
    }

    // updateFormFilter(event) {
    //     const field = event.target.name;
    //     let filter = {...this.state.filter};
    //     filter[field] = event.target.value;
    //     this.setState({filter: filter});
    // }
    showingSessionSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        this.props.filmAction.showFilmSession(value);
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.filmAction.loadShownSession(1, value);
            this.props.filmAction.loadAllSessions(1, value);
        }.bind(this), 500);
    }

    render() {
        let first = this.props.totalCountSSShown ? (this.props.currentPageSSShown - 1) * this.props.limitSSShown + 1 : 0;
        let end = this.props.currentPageSSShown < this.props.totalPagesSSShown ? this.props.currentPageSSShown * this.props.limitSSShown : this.props.totalCountSSShown;
        return (
            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div className="flex-row flex">
                            <h4 className="card-title">
                                <strong>Danh sách suất chiếu đã chiếu</strong>
                            </h4>
                            {
                                this.props.user.role === 2 ?
                                    <div>
                                        <TooltipButton
                                            placement="top"
                                            text="Thêm suất chiếu">
                                            <button
                                                className="btn btn-primary btn-round btn-xs button-add none-margin"
                                                type="button"
                                                onClick={() => {
                                                    this.props.filmAction.toggleSessionModal();
                                                    this.props.filmAction.handleSessionModal({});
                                                }}>

                                                <strong>+</strong>
                                            </button>
                                        </TooltipButton>
                                    </div>
                                    : ""
                            }
                            {/*<div>*/}
                            {/*<TooltipButton*/}
                            {/*placement="top"*/}
                            {/*text="Lọc theo ngày">*/}
                            {/*<button*/}
                            {/*className="btn btn-primary btn-round btn-xs button-add none-margin"*/}
                            {/*type="button"*/}
                            {/*onClick={() => this.setState({openFilter: !this.state.openFilter,})}>*/}
                            {/*<i className="material-icons">*/}
                            {/*filter_list*/}
                            {/*</i>*/}
                            {/*</button>*/}
                            {/*</TooltipButton>*/}
                            {/*</div>*/}
                        </div>


                        <Search
                            onChange={this.showingSessionSearchChange}
                            value={this.state.query}
                            placeholder="Nhập tên phim để tìm kiếm"
                        /><br/>
                        {/*<Panel collapsible expanded={this.state.openFilter}>*/}
                        {/*<div className="row">*/}
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
                        {/*<div className="col-md-3">*/}
                        {/*<FormInputDate*/}
                        {/*label="Từ ngày"*/}
                        {/*name="startTime"*/}
                        {/*updateFormData={() =>*/}
                        {/*this*/}
                        {/*.updateFormFilter*/}
                        {/*}*/}
                        {/*id="form-start-time"*/}
                        {/*value={*/}
                        {/*this.state.filter.startTime*/}
                        {/*}*/}
                        {/*maxDate={*/}
                        {/*this.state.filter.endTime*/}
                        {/*}*/}
                        {/*/>*/}
                        {/*</div>*/}
                        {/*<div className="col-md-3">*/}
                        {/*<FormInputDate*/}
                        {/*label="Đến ngày"*/}
                        {/*name="endTime"*/}
                        {/*updateFormData={() =>*/}
                        {/*this.updateFormFilter*/}
                        {/*}*/}
                        {/*id="form-end-time"*/}
                        {/*value={*/}
                        {/*this.state.filter.endTime*/}
                        {/*}*/}
                        {/*minDate={*/}
                        {/*this.state.filter.startTime*/}
                        {/*}*/}
                        {/*/>*/}
                        {/*</div>*/}

                        {/*</div>*/}
                        {/*</Panel>*/}
                        <br/>

                    </div>
                    <div>
                        {
                            this.props.isLoadingShownSession ? <Loading/> :
                                <SessionComponent
                                    sessions={this.props.shownSession}/>
                        }

                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {first}
                                    - {end}/{this.props.totalCountSSShown}</b><br/>
                                <Pagination
                                    totalPages={this.props.totalPagesSSShown}
                                    currentPage={this.props.currentPageSSShown}
                                    loadDataPage={this.loadOrders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}

ShownSessionContainer.propTypes = {
    shownSession: PropTypes.array.isRequired,
    allFilms: PropTypes.array.isRequired,
    filmAction: PropTypes.object.isRequired,
    isLoadingShownSession: PropTypes.bool.isRequired,
    totalCountSSShown: PropTypes.number.isRequired,
    totalPagesSSShown: PropTypes.number.isRequired,
    limitSSShown: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
    currentPageSSShown: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        shownSession: state.film.shownSession,
        isLoadingShownSession: state.film.isLoadingShownSession,
        totalCountSSShown: state.film.totalCountSSShown,
        totalPagesSSShown: state.film.totalPagesSSShown,
        currentPageSSShown: state.film.currentPageSSShown,
        limitSSShown: state.film.limitSSShown,
        allFilms: state.film.allFilms,
        search: state.film.search,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShownSessionContainer);