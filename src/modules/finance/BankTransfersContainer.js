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
import Search from "../../components/common/Search";
import Pagination from "../../components/common/Pagination";
import Select from 'react-select';

// import Select from 'react-select';
// import {STATUS_OPTIONS} from "./financeConstant";


// Import actions here!!

class BankTransfersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            query: '',
            status: '',
            bank_account_id: null
        };
        this.timeOut = null;
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.showCancelReasonModal = this.showCancelReasonModal.bind(this);
        this.loadOrders = this.loadOrders.bind(this);
        this.transfersSearchChange = this.transfersSearchChange.bind(this);
        this.displayStatusChange = this.displayStatusChange.bind(this);
        //this.showBankTransferEditModal = this.showBankTransferEditModal.bind(this);
    }

    componentWillMount() {
        this.props.financeActions.loadBankTransfers();
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

    loadOrders(page = 1) {
        this.setState({page: page});
        this.props.financeActions.loadBankTransfers(
            page,
            this.state.query,
            this.state.status,
            this.state.bank_account_id
        );
    }

    transfersSearchChange(value) {
        this.setState({
            query: value,
            page: 1
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            this.props.financeActions.loadBankTransfers(
                1,
                value,
                this.state.status,
                this.state.bank_account_id
            );
        }.bind(this), 500);
    }

    displayStatusChange(value) {
        if (value) {
            this.setState({
                status: value.value,
                page: 1
            });
            this.props.financeActions.loadBankTransfers(
                1,
                this.state.query,
                value.value,
                this.state.bank_account_id
            );
        } else {
            this.setState({
                status: null,
                page: 1
            });
            this.props.financeActions.loadBankTransfers(
                1,
                this.state.query,
                null,
                this.state.bank_account_id
            );
        }
    }

    //showBankTransferEditModal(transfer) {
    //  this.props.financeActions.showBankTransferEditModal();
    //   this.props.financeActions.handleBankTransferEditModal(transfer);
    //}

    render() {
        let first = this.props.totalCount ? (this.props.currentPage - 1) * this.props.limit + 1 : 0;
        let end = this.props.currentPage < this.props.totalPages ? this.props.currentPage * this.props.limit : this.props.totalCount;

        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-header card-header-icon" data-background-color="rose">
                        <i className="material-icons">assignment</i>
                    </div>
                    <div className="card-content">
                        <h4 className="card-title">Báo chuyển tiền</h4>
                        <div className="row">
                            <div className="col-lg-10 col-md-10 col-sm-10 col-xs-10">
                                <Search
                                    onChange={this.transfersSearchChange}
                                    value={this.state.query}
                                    placeholder="Nhập tên người dùng hoặc tên ngân hàng để tìm"
                                />
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                                <button type="button" data-toggle="collapse" data-target="#demo"
                                        className="btn btn-rose">
                                    <i className="material-icons">filter_list</i> Lọc
                                </button>
                            </div>
                        </div>
                        <div id="demo" className="collapse">
                            <div className="row">
                                <div className="form-group col-lg-6 col-md-6 col-sm-6 col-xs-6">
                                    <label className="label-control">Tìm theo trạng thái hiển
                                        thị</label>
                                    <Select
                                        value={this.state.status}
                                        options={[
                                            {
                                                value: "accept",
                                                label: "Đã xác nhận"
                                            },
                                            {
                                                value: "cancel",
                                                label: "Đã hủy bỏ"
                                            }
                                        ]}
                                        onChange={this.displayStatusChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <br/>
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
                    <div className="row float-right">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{textAlign: 'right'}}>
                            <b style={{marginRight: '15px'}}>
                                Hiển thị kêt quả từ {first}
                                - {end}/{this.props.totalCount}</b><br/>
                            <Pagination
                                totalPages={this.props.totalPages}
                                currentPage={this.props.currentPage}
                                loadDataPage={this.loadOrders}
                            />
                        </div>
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
    isLoading: PropTypes.bool.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    totalCount: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        bankTransfers: state.finance.bankTransfers,
        isLoading: state.finance.isLoading,
        totalPages: state.finance.totalPages,
        totalCount: state.finance.totalCount,
        currentPage: state.finance.currentPage,
        limit: state.finance.limit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        financeActions: bindActionCreators(financeActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankTransfersContainer);