import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as moneyTransferActions from "./moneyTransferActions";
import Loading from "../../components/common/Loading";
import {CHANNEL, NO_AVATAR} from "../../constants/env";
import {avatarEmpty, dotNumber} from "../../helpers/helper";
import Pagination from "../../components/common/Pagination";
import TooltipButton from "../../components/common/TooltipButton";
import socket from "../../services/socketio";

class ReceiveTransactions extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1
        };
        this.confirmTransaction = this.confirmTransaction.bind(this);

    }

    componentWillMount() {
        this.loadData();
        const channel = CHANNEL + ":notification";
        socket.on(channel, (data) => {
            if (data.notification && data.notification.transaction) {
                this.loadData();
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoadingTransactions !== this.props.isLoadingTransactions && !nextProps.isLoadingTransactions) {
            this.setState({page: nextProps.currentPage});
        }
    }


    loadData(page, type) {
        this.setState({page: page});
        this.props.moneyTransferActions.getTransactions(page, type);
    }

    confirmTransaction(transactionId, status) {
        this.props.moneyTransferActions.confirmTransaction(transactionId, status);
    }

    render() {
        return (
            <div className="card">
                <div className="card-header card-header-icon" data-background-color="rose">
                    <i className="material-icons">assignment</i>
                </div>
                <div className="card-content">
                    <h4 className="card-title">Giao dich gần đây của bạn</h4>
                    {this.props.isLoadingTransactions ?
                        <Loading/>
                        :
                        <div>
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="text-rose">
                                    <tr>
                                        <th/>
                                        <th>Nhân viên</th>
                                        <th/>
                                        <th>Chuyển đến</th>
                                        <th>Ngày chuyển</th>
                                        <th>Ngày nhận</th>
                                        <th>Số tiền còn lại</th>
                                        <th className="text-center">Số tiền</th>
                                        <th/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.transactions.map((transaction) => {
                                            const avatarSender = transaction.sender && !avatarEmpty(transaction.sender.avatar_url) ?
                                                transaction.sender.avatar_url : NO_AVATAR;

                                            const avatarReceiver = transaction.receiver && !avatarEmpty(transaction.receiver.avatar_url) ?
                                                transaction.receiver.avatar_url : NO_AVATAR;

                                            const type = !(transaction.sender && transaction.sender.id == this.props.user.id);

                                            const textStatus = transaction.status == 1 ? "Thành công" :
                                                transaction.status == -1 ? "Hủy" : "Đang giao dịch";

                                            const classStatus = transaction.status == 1 ? " btn-success " :
                                                transaction.status == -1 ? " btn-danger " : " btn-info ";
                                            return (
                                                <tr key={transaction.id}>
                                                    <td>
                                                        <div className="avatar-list-staff"
                                                             style={{
                                                                 background: 'url(' + avatarSender + ') center center / cover',
                                                                 display: 'inline-block'
                                                             }}
                                                        />
                                                    </td>
                                                    <td>{transaction.sender ? transaction.sender.name : "Không có"}</td>
                                                    <td>
                                                        <div className="avatar-list-staff"
                                                             style={{
                                                                 background: 'url(' + avatarReceiver + ') center center / cover',
                                                                 display: 'inline-block'
                                                             }}
                                                        />
                                                    </td>
                                                    <td>{transaction.receiver ? transaction.receiver.name : "Không có"}</td>
                                                    <td>{transaction.created_at}</td>
                                                    <td>{transaction.status == 0 ? "" : transaction.updated_at}</td>
                                                    <td style={{textAlign: 'right'}}>{dotNumber(type ? transaction.receiver_money : transaction.sender_money)}đ</td>
                                                    <td>{
                                                        type
                                                            ?
                                                            <div>
                                                                <TooltipButton
                                                                    placement={"top"}
                                                                    text={textStatus}
                                                                >
                                                                    <button
                                                                        className={classStatus + "btn width-100 bold lowercase"}>
                                                                        + {dotNumber(transaction.money)}đ
                                                                    </button>
                                                                </TooltipButton>

                                                                {transaction.status == 0 &&
                                                                (transaction.isLoading ?
                                                                        <div>
                                                                            <button
                                                                                className="btn btn-rose btn-xs btn-simple width-100 bold">
                                                                                <i className="fa fa-spinner fa-spin"/> Đang
                                                                                xác nhận
                                                                            </button>
                                                                        </div>
                                                                        :
                                                                        <div className="row">
                                                                            <div className="col-xs-6 padding-right-0">
                                                                                <button
                                                                                    className="btn btn-success btn-xs btn-simple width-100 bold"
                                                                                    onClick={() => this.confirmTransaction(transaction.id, 1)}
                                                                                >
                                                                                    Đồng ý
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-xs-6 padding-left-0">
                                                                                <button
                                                                                    className="btn btn-danger btn-xs btn-simple width-100 bold"
                                                                                    onClick={() => this.confirmTransaction(transaction.id, -1)}
                                                                                >
                                                                                    Hủy
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                )

                                                                }
                                                            </div>
                                                            :
                                                            <TooltipButton
                                                                placement={"top"}
                                                                text={textStatus}
                                                            >
                                                                <button
                                                                    className={classStatus + "btn width-100 bold lowercase"}>
                                                                    - {dotNumber(transaction.money)}đ
                                                                </button>
                                                            </TooltipButton>
                                                    }
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    <Pagination
                        totalPages={this.props.totalPages}
                        currentPage={this.state.page}
                        loadDataPage={(page) => this.loadData(page)}
                    />
                </div>
            </div>
        );
    }
}

ReceiveTransactions.propTypes = {
    isLoadingTransactions: PropTypes.bool,
    transactions: PropTypes.array,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    user: PropTypes.object,
    moneyTransferActions: PropTypes.object,
};

function mapStateToProps(state) {
    return {
        isLoadingTransactions: state.moneyTransfer.isLoadingTransactions,
        transactions: state.moneyTransfer.transactions,
        totalPages: state.moneyTransfer.totalPages,
        currentPage: state.moneyTransfer.currentPage,
        user: state.login.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        moneyTransferActions: bindActionCreators(moneyTransferActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveTransactions);