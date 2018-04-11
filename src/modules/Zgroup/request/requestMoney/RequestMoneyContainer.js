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
import { Link } from "react-router";

class RequestMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showPayConfirmModal: false,
            showReceiveConfirmModal: false,
            idPay: "",
            idReceive: "",
            currentRequest: {},
        };
        this.openPayConfirmModal = this.openPayConfirmModal.bind(this);
        this.closePayConfirmModal = this.closePayConfirmModal.bind(this);
        this.submitPayConfirmModal = this.submitPayConfirmModal.bind(this);
        this.openReceiveConfirmModal = this.openReceiveConfirmModal.bind(this);
        this.closeReceiveConfirmModal = this.closeReceiveConfirmModal.bind(this);
        this.submitReceiveConfirmModal = this.submitReceiveConfirmModal.bind(this);
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

    render() {
        console.log(this.props);
        let { isLoading, requestMoneys, paginator, requestActions, user } = this.props;
        let { showPayConfirmModal, showReceiveConfirmModal, currentRequest } = this.state;
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
                                        <div className="col-md-3">
                                            <Link className="btn btn-rose" to="/administration/request/money/create">
                                                <i className="material-icons">add</i>Xin tạm ứng</Link>
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
                                                                        <th>Thực nhận</th>
                                                                        <th>Số tiền sử dụng</th>
                                                                        <th>Số tiền hoàn trả</th>
                                                                        <th>Lý do</th>
                                                                        <th>Hình thức</th>
                                                                        <th>Người ứng tiền</th>
                                                                        <th>Ngày ứng tiền</th>
                                                                        <th>Ngày hoàn trả</th>
                                                                        <th />
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {requestMoneys.map((obj, index) => {
                                                                        //<td>{date.format("D-M-YYYY")}</td>
                                                                        //<td>{helper.dotNumber(getTotalPrice(order.goods))}</td>
                                                                        let type = "Không có";
                                                                        switch (obj.type) {
                                                                            case "atm": {
                                                                                type = "Chuyển khoản";
                                                                                break;
                                                                            }
                                                                            case "cash": {
                                                                                type = "Tiền mặt";
                                                                                break;
                                                                            }
                                                                        }
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{obj.command_code}</td>
                                                                                <td>{helper.dotNumber(obj.money_payment)}</td>
                                                                                <td>{helper.dotNumber(obj.money_received)}</td>
                                                                                <td>{helper.dotNumber(obj.money_used)}</td>
                                                                                <td>{helper.dotNumber(obj.money_received - obj.money_used)}</td>
                                                                                <td>{obj.reason}</td>
                                                                                <td>{type}</td>
                                                                                <td>{obj.staff.name}</td>
                                                                                <td>{moment(obj.created_at.date).format("D/M/YYYY")}</td>
                                                                                <td>{moment(obj.date_complete).isValid() ? moment(obj.date_complete).format("D/M/YYYY") : "Chưa hoàn trả"}</td>
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
                                                                                            (obj.status == 1  && user.role == 2)?
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
