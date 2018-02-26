import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import *as financeActions from "./financeActions";
import {numberWithCommas} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import CancelReasonModal from "./CancelReasonModal";
//import BankTransferEditModal from "./BankTransferEditModal";
import {TRANSFER_PURPOSE, TRANSFER_PURPOSE_COLOR} from "../../constants/constants";

// import Select from 'react-select';
// import {STATUS_OPTIONS} from "./financeConstant";


// Import actions here!!

class BankTransfersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadBankTransfers = this.loadBankTransfers.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.showCancelReasonModal = this.showCancelReasonModal.bind(this);
        //this.showBankTransferEditModal = this.showBankTransferEditModal.bind(this);
    }

    componentWillMount() {
        this.loadBankTransfers();
    }

    loadBankTransfers(page = 1) {
        this.props.financeActions.loadBankTransfers(page);
    }

    onChangeStatus(bankTransfer) {
        return (option) => {
            const newBankTransfer = {
                ...bankTransfer,
                status: option.value
            };
            this.props.financeActions.updateBankTransferStatus(newBankTransfer);
        };
    }

    showCancelReasonModal(transfer) {
        let newTransfer = {
            id: transfer.id,
            note: ''
        };
        this.props.financeActions.showCancelReasonModal();
        this.props.financeActions.handleCancelReasonModal(newTransfer);
    }

    //showBankTransferEditModal(transfer) {
      //  this.props.financeActions.showBankTransferEditModal();
     //   this.props.financeActions.handleBankTransferEditModal(transfer);
    //}

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Báo chuyển tiền</h4>
                        {
                            this.props.isLoading ? <Loading/> : (
                                <div className="card-content table-responsive table-full-width">
                                    <table className="table">
                                        <thead className="text-rose">
                                        <tr>
                                            <th>Ngày chuyển</th>
                                            <th>Mục đích</th>
                                            <th>Số tiền(VNĐ)</th>
                                            <th>Ngân hàng</th>
                                            <th>Nội dung</th>
                                            <th>Trạng thái</th>
                                            {/*<th/>*/}
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.bankTransfers && this.props.bankTransfers.map((bankTransfer) => {
                                                let purpose = TRANSFER_PURPOSE.filter(pur => pur.value === bankTransfer.purpose)[0] ?
                                                    TRANSFER_PURPOSE.filter(pur => pur.value === bankTransfer.purpose)[0].label : "Chưa có mục đích";
                                                return (
                                                    <tr key={bankTransfer.id}>
                                                        <td>{bankTransfer.transfer_day}</td>
                                                        <td>
                                                            <div
                                                                style={{
                                                                    cursor: "default",
                                                                    backgroundColor: TRANSFER_PURPOSE_COLOR[bankTransfer.purpose]
                                                                }}
                                                                className="btn btn-sm btn-main"
                                                            >
                                                                {purpose}
                                                            </div>
                                                        </td>
                                                        <td>{numberWithCommas(bankTransfer.money)}</td>
                                                        <td>{bankTransfer.bank_account.bank_account_name}</td>
                                                        <td>{bankTransfer.note}</td>
                                                        <td>
                                                            {
                                                                bankTransfer.status === "pending" ? (
                                                                    <span>
                                                                    <a className="text-success"
                                                                       onClick={() => this.props.financeActions.updateTransferStatus(
                                                                           bankTransfer.id, "accept", null, bankTransfer.customer.id, bankTransfer.money
                                                                       )}>
                                                                        <i className="material-icons">done</i>
                                                                    </a>
                                                                    <a className="text-danger"
                                                                       onClick={() => this.showCancelReasonModal(bankTransfer)}>
                                                                        <span className="material-icons">clear</span>
                                                                    </a>
                                                                </span>
                                                                ) : (
                                                                    <div>
                                                                        {
                                                                            bankTransfer.status === "accept" ? (
                                                                                <div
                                                                                    style={{cursor: "default"}}
                                                                                    className="btn btn-sm btn-success btn-main"
                                                                                >
                                                                                    Đã xác nhận
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    style={{cursor: "default"}}
                                                                                    className="btn btn-sm btn-danger btn-main"
                                                                                >
                                                                                    Đã hủy bỏ
                                                                                </div>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </td>
                                                        {/*<td>*/}
                                                            {/*<a data-toggle="tooltip" title="Ghi chú" type="button"*/}
                                                               {/*className="text-rose"*/}
                                                               {/*rel="tooltip"*/}
                                                               {/*onClick={() => this.showBankTransferEditModal(bankTransfer)}>*/}
                                                                {/*<i className="material-icons">edit</i>*/}
                                                            {/*</a>*/}
                                                        {/*</td>*/}
                                                    </tr>
                                                );
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }
                    </div>
                </div>
                <CancelReasonModal/>
                {/*<BankTransferEditModal/>*/}
            </div>
        );
    }
}

BankTransfersContainer.propTypes = {
    bankTransfers: PropTypes.array.isRequired,
    financeActions: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        bankTransfers: state.finance.bankTransfers,
        isLoading: state.finance.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        financeActions: bindActionCreators(financeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankTransfersContainer);