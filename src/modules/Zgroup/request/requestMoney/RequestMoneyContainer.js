import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as requestActions from "../requestActions";
import * as PropTypes from "prop-types";
import Loading from "../../../../components/common/Loading";
import ButtonGroupAction from "../../../../components/common/ButtonGroupAction";
import Pagination from "../../../../components/common/Pagination";
import moment from "moment";
import * as helper from "../../../../helpers/helper";
import PayConfirmModal from "./PayConfirmModal";
import ReceiveConfirmModal from "./ReceiveConfirmModal";
import InfoRequestMoneyModal from "./InfoRequestMoneyModal";
import { Link } from "react-router";
import { Modal } from 'react-bootstrap';

class RequestMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showPayConfirmModal: false,
            showReceiveConfirmModal: false,
            showInfoModal: false,
            idPay: "",
            idReceive: "",
            currentRequest: {
                staff: {},
            },
            showLoadingModal: false,
        };
        this.openPayConfirmModal = this.openPayConfirmModal.bind(this);
        this.closePayConfirmModal = this.closePayConfirmModal.bind(this);
        this.submitPayConfirmModal = this.submitPayConfirmModal.bind(this);
        this.openReceiveConfirmModal = this.openReceiveConfirmModal.bind(this);
        this.closeReceiveConfirmModal = this.closeReceiveConfirmModal.bind(this);
        this.submitReceiveConfirmModal = this.submitReceiveConfirmModal.bind(this);
        this.openInfoModal = this.openInfoModal.bind(this);
        this.closeInfoModal = this.closeInfoModal.bind(this);
        this.exportExcel = this.exportExcel.bind(this);
        this.openLoadingModal = this.openLoadingModal.bind(this);
    }

    componentWillMount() {
        let { requestActions } = this.props;
        requestActions.getAllRequestMoney();
    }

    // componentWillReceiveProps(next){
    //     console.log(next);
    // }

    openPayConfirmModal(obj) {
        this.setState({ showPayConfirmModal: true, idPay: obj.id, currentRequest: obj });
    }

    closePayConfirmModal() {
        this.setState({ showPayConfirmModal: false });
    }

    submitPayConfirmModal(money) {
        this.closePayConfirmModal();
        this.props.requestActions.confirmPayRequest(this.state.idPay, money,
            this.props.requestActions.getAllRequestMoney
        );
    }

    openReceiveConfirmModal(obj) {
        this.setState({ showReceiveConfirmModal: true, idReceive: obj.id, currentRequest: obj });
    }

    closeReceiveConfirmModal() {
        this.setState({ showReceiveConfirmModal: false });
    }

    submitReceiveConfirmModal(money) {
        this.closeReceiveConfirmModal();
        this.props.requestActions.confirmReceiveRequest(this.state.idReceive, money,
            this.props.requestActions.getAllRequestMoney);
    }

    openInfoModal(obj) {
        this.setState({ showInfoModal: true, currentRequest: obj });
    }

    closeInfoModal() {
        this.setState({ showInfoModal: false });
    }


    openLoadingModal() {
        this.setState({ showLoadingModal: true });
        this.props.requestActions.getRequestMoneyNoPaging(this.exportExcel, () => this.setState({ showLoadingModal: false }));
    }

    exportExcel(input) {
        let wb = helper.newWorkBook();
        let data;
        let cols = [{ "wch": 5 }, { "wch": 40 }, { "wch": 25 }, { "wch": 15 }, { "wch": 15 },{ "wch": 25 },{ "wch": 15 },{ "wch": 15 },{ "wch": 15 },{ "wch": 15 },{ "wch": 15 },{ "wch": 15 },];//độ rộng cột  
        
        data = input.reverse().map((item, index) => {

            /* eslint-disable */
            let status = "Chưa duyệt";
            switch (item.status) {
                case 1: {
                    status = "Đã ứng";
                    break;
                }
                case 2: {
                    status = "Đã hoàn ứng";
                    break;
                }
            }
            let res = {
                'STT': index + 1,
                'Mã tạm ứng': item.command_code,
                'Người ứng': item.staff ? item.staff.name : "Không có",
                'Ngày tạm ứng': moment(item.created_at.date).format("D/M/YYYY"),
                'Ngày hoàn trả': moment(item.date_complete).isValid() ? moment(item.date_complete).format("D/M/YYYY") : "Không có",
                'Lý do': item.reason,
                'Số tiền yêu cầu': item.money_payment,
                'Số tiền thực nhận': item.money_received,
                'Số tiền đã sử dụng': item.money_used,
                'Số tiền hòan trả': item.money_received - item.money_used,
                'Hình thức': item.type == "atm" ? "Chuyển khoản" : "Tiền mặt",
                'Trạng thái': status,

            };
            /* eslint-enable */
            return res;
        });
        helper.appendJsonToWorkBook(data, wb, 'Danh sách ứng tiền', cols);
        //end điểm danh

        //xuất file
        helper.saveWorkBookToExcel(wb, 'Danh sách ứng tiền Zgroup');

        this.setState({ showLoadingModal: false });
    }

    render() {
        //console.log(this.props);
        let { isLoading, requestMoneys, paginator, requestActions, user } = this.props;
        let { showPayConfirmModal, showReceiveConfirmModal, showInfoModal, currentRequest } = this.state;
        return (
            <div className="content">
                <PayConfirmModal
                    show={showPayConfirmModal}
                    onHide={this.closePayConfirmModal}
                    submit={this.submitPayConfirmModal}
                    data={currentRequest}
                />
                <ReceiveConfirmModal
                    show={showReceiveConfirmModal}
                    onHide={this.closeReceiveConfirmModal}
                    submit={this.submitReceiveConfirmModal}
                    data={currentRequest}
                />
                <InfoRequestMoneyModal
                    show={showInfoModal}
                    onHide={this.closeInfoModal}
                    data={currentRequest}
                />
                <Modal
                    show={this.state.showLoadingModal}
                    onHide={() => { }}
                >
                    <Modal.Header><h3>{"Đang xuất file..."}</h3></Modal.Header>
                    <Modal.Body><Loading /></Modal.Body>
                </Modal>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">

                            <div className="card">
                                <div className="card-header card-header-icon" data-background-color="rose">
                                    <i className="material-icons">attach_money</i>
                                </div>

                                <div className="card-content">
                                    <h4 className="card-title">Danh sách xin tạm ứng</h4>
                                    <div className="row">
                                        <div className="col-md-2">
                                            <Link className="btn btn-rose" to="/administration/request/money/create">
                                                <i className="material-icons">add</i>Xin tạm ứng</Link>

                                        </div>
                                        <div className="col-md-2">
                                            <button className="btn btn-rose" onClick={this.openLoadingModal} >Xuất file excel</button>
                                        </div>
                                    </div>
                                    {
                                        isLoading ? <Loading /> :
                                            <div className="col-md-12">
                                                {
                                                    requestMoneys.length == 0 ?
                                                        <div>Chưa có yêu cầu</div>
                                                        :
                                                        <div className="table-responsive">
                                                            <table id="datatables" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{ width: "100%" }}>
                                                                <thead className="text-rose">
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Mã hành chính</th>
                                                                        <th>Số tiền ứng</th>
                                                                        <th>Người ứng tiền</th>
                                                                        <th>Ngày ứng tiền</th>
                                                                        <th>Ngày hoàn trả</th>
                                                                        <th>Trạng thái</th>
                                                                        <th />
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {requestMoneys.map((obj, index) => {
                                                                        let status = "Chưa duyệt";
                                                                        switch (obj.status) {
                                                                            case 1: {
                                                                                status = "Đã ứng";
                                                                                break;
                                                                            }
                                                                            case 2: {
                                                                                status = "Đã hoàn ứng";
                                                                                break;
                                                                            }
                                                                        }
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td><a onClick={() => { return this.openInfoModal(obj); }}>{obj.command_code}</a></td>
                                                                                <td>{helper.dotNumber(obj.money_payment)}</td>

                                                                                <td>{obj.staff.name}</td>
                                                                                <td>{moment(obj.created_at.date).format("D/M/YYYY")}</td>
                                                                                <td>{moment(obj.date_complete).isValid() ? moment(obj.date_complete).format("D/M/YYYY") : "Chưa hoàn trả"}</td>
                                                                                <td>{status}</td>
                                                                                <td><ButtonGroupAction
                                                                                    editUrl={"/administration/request/money/edit/" + obj.id}
                                                                                    disabledDelete={true}
                                                                                    disabledEdit={obj.status > 0 || user.id != obj.staff.id}
                                                                                    children={
                                                                                        [
                                                                                            (obj.status == 0 && user.role == 2) ?
                                                                                                <a key="1" data-toggle="tooltip" title="Chi Tiền" type="button" rel="tooltip"
                                                                                                    onClick={() => { this.openPayConfirmModal(obj); }}>
                                                                                                    <i className="material-icons">vertical_align_top</i></a>
                                                                                                : <div />
                                                                                            ,
                                                                                            (obj.status == 1 && user.role == 2) ?
                                                                                                <a key="2" data-toggle="tooltip" title="Hoàn Trả" type="button" rel="tooltip"
                                                                                                    onClick={() => { this.openReceiveConfirmModal(obj); }}>
                                                                                                    <i className="material-icons">vertical_align_bottom</i></a>
                                                                                                : <div />
                                                                                        ]

                                                                                    }
                                                                                /></td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                            <div style={{ display: "flex", flexDirection: "row-reverse" }}><Pagination
                                                                currentPage={paginator.current_page}
                                                                totalPages={paginator.total_pages}
                                                                loadDataPage={(id) => { return requestActions.getAllRequestMoney({ page: id }); }}
                                                            /></div>
                                                        </div>
                                                }
                                            </div>

                                    }

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

RequestMoneyContainer.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    requestActions: PropTypes.object,
    paginator: PropTypes.object,
    user: PropTypes.object,
    requestMoneys: PropTypes.array,
};

function mapStateToProps(state) {
    return {
        isLoading: state.request.isLoading,
        paginator: state.request.paginator,
        requestMoneys: state.request.requestMoneys,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        requestActions: bindActionCreators(requestActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestMoneyContainer);
