import React from 'react';
import * as filmAction from "../filmAction";
import {bindActionCreators} from "redux";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Loading from "../../../components/common/Loading";
import Search from "../../../components/common/Search";
import Pagination from "../../../components/common/Pagination";
import {Modal, OverlayTrigger, Tooltip} from 'react-bootstrap';
import * as helper from "../../../helpers/helper";
import {Link} from "react-router";


class FIlmCustomerContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            query: '',
            page: 1
        };
        this.limit = 20;
        this.timeOut = null;
        this.loadOrders = this.loadOrders.bind(this);
        this.customerSearchChange = this.customerSearchChange.bind(this);
        this.showLoadingModal = this.showLoadingModal.bind(this);
        this.closeLoadingModal = this.closeLoadingModal.bind(this);
    }

    componentWillMount() {
        this.props.filmAction.loadAllCustomer();
    }

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.filmAction.loadAllCustomer(page);
    }

    customerSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.filmAction.loadAllCustomer(
                this.state.page,
                value,
            );
        }.bind(this), 500);
    }

    showLoadingModal() {
        this.props.filmAction.exportCustomer(
            this.state.query,
            this.closeLoadingModal
        );
    }

    closeLoadingModal() {

        let json = this.props.exportCustomer;
        if (!json || json.length === 0) {
            helper.showErrorNotification("Không có dữ liệu");
            return;
        }
        let cols = [{"wch": 4}, {"wch": 10}, {"wch": 20}, {"wch": 15}, {"wch": 30}];//độ rộng cột
        //begin điểm danh
        json = this.props.exportCustomer.map((item, index) => {
            if (item) {
                let res = {
                    'STT': index + 1,
                    'Mã khách hàng': item.account_code,
                    'Tên': item.name,
                    'Số điện thoại': item.phone,
                    'Email': item.email
                };
                /* eslint-enable */
                return res;
            }
        });
        let wb = helper.newWorkBook();
        helper.appendJsonToWorkBook(json, wb, 'Danh sách', cols, []);
        helper.saveWorkBookToExcel(wb,
            'Danh sách khách hàng'
        );
    }

    render() {
        let first = this.props.totalCountCustomer ? (this.props.currentPageCustomer - 1) * this.limit + 1 : 0;
        let end = this.props.currentPageCustomer < this.props.totalPagesCustomer ? this.props.currentPageCustomer * this.limit : this.props.totalCountCustomer;
        const Export = <Tooltip id="tooltip">Xuất thành file excel</Tooltip>;
        return (

            <div className="card">
                <div className="card-content">
                    <div className="tab-content">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{display: "flex"}}>
                                <h4 className="card-title">
                                    <strong>Quản Lý Khách hàng</strong></h4>
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
                                            this.props.isLoadingCustomer
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
                            onChange={this.customerSearchChange}
                            value={this.state.query}
                            placeholder="Nhập tên, điện thoại hoặc email để tìm kiếm"
                        />
                        <br/>
                    </div>
                    <div>

                        {
                            this.props.isLoadingCustomer ? <Loading/> :
                                <div className="table-responsive">
                                    <table className="table table-hover table-striped">
                                        <thead className="text-rose">
                                        <tr className="text-rose">
                                            <th>STT</th>
                                            <th>Mã Khách Hàng</th>
                                            <th>Tên</th>
                                            <th>Điện Thoại</th>
                                            <th>Email</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.customer && this.props.customer.map((customer, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            &ensp;{index + 1}
                                                        </td>
                                                        <td>
                                                            {customer.account_code}
                                                        </td>
                                                        <td>
                                                            <Link to={`/film/booking-history`}
                                                                  onClick={() => this.props.filmAction.showFilmSession(customer.name)}>

                                                                <span className="film-name">  {customer.name}</span>
                                                            </Link>
                                                        </td>
                                                        <td>
                                                            {customer.phone}
                                                        </td>
                                                        <td>
                                                            {customer.email}
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                        }
                        <br/>
                        <div className="row float-right">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                                 style={{textAlign: 'right'}}>
                                <b style={{marginRight: '15px'}}>
                                    Hiển thị kêt quả từ {first}
                                    - {end}/{this.props.totalCountCustomer}</b><br/>
                                <Pagination
                                    totalPages={this.props.totalPagesCustomer}
                                    currentPage={this.props.currentPageCustomer}
                                    loadDataPage={this.loadOrders}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    show={this.props.isExportCustomer}
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

FIlmCustomerContainer.propTypes = {
    filmAction: PropTypes.object.isRequired,
    customer: PropTypes.array.isRequired,
    isLoadingCustomer: PropTypes.bool.isRequired,
    totalCountCustomer: PropTypes.number.isRequired,
    totalPagesCustomer: PropTypes.number.isRequired,
    currentPageCustomer: PropTypes.number.isRequired,
    exportCustomer: PropTypes.array.isRequired,
    isExportCustomer: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        customer: state.film.customer,
        isLoadingCustomer: state.film.isLoadingCustomer,
        totalCountCustomer: state.film.totalCountCustomer,
        totalPagesCustomer: state.film.totalPagesCustomer,
        currentPageCustomer: state.film.currentPageCustomer,
        exportCustomer: state.film.exportCustomer,
        isExportCustomer: state.film.isExportCustomer,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FIlmCustomerContainer);






