import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {loadBankTransfers, updateBankTransferStatus} from "./financeActions";
import {numberWithCommas} from "../../helpers/helper";
import Loading from "../../components/common/Loading";
import Select from 'react-select';
import {STATUS_OPTIONS} from "./financeConstant";



// Import actions here!!

class BankTransfersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.loadBankTransfers = this.loadBankTransfers.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    componentWillMount() {
        this.loadBankTransfers();
    }

    loadBankTransfers(page = 1) {
        this.props.actions.loadBankTransfers(page);
    }

    onChangeStatus(bankTransfer) {
        return (option) => {
            const newBankTransfer = {
                ...bankTransfer,
                status: option.value
            };
            this.props.actions.updateBankTransferStatus(newBankTransfer);
        };
    }

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
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.props.bankTransfers &&
                                            this.props.bankTransfers.map((bankTransfer) => (
                                                <tr key={bankTransfer.id}>
                                                    <td>{bankTransfer.transfer_day}</td>
                                                    <td>{bankTransfer.purpose}</td>
                                                    <td>{numberWithCommas(bankTransfer.money)}</td>
                                                    <td>{bankTransfer.bank_account.bank_account_name}</td>
                                                    <td>{bankTransfer.note}</td>
                                                    <td>
                                                        <a className="text-success">
                                                            <i className="material-icons">done</i>
                                                        </a>
                                                        <a className="text-danger">
                                                            <span className="material-icons">clear</span>
                                                        </a>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        );
    }
}

BankTransfersContainer.propTypes = {
    bankTransfers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
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
        actions: bindActionCreators({
            loadBankTransfers,
            updateBankTransferStatus
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankTransfersContainer);