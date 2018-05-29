import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import BankAccountComponent from './BankAccountComponent';
import PropTypes from 'prop-types';
import Loading from "../../components/common/Loading";
import *as bankAccountAction from "./bankAccountAction";
import AddEditBankAccountModal from "./AddEditBankAccountModal";
import TooltipButton from "../../components/common/TooltipButton";
//import Search from "../../components/common/Search";

class BankAccountContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.showAddEditBankAccountModal = this.showAddEditBankAccountModal.bind(this);
    }

    componentWillMount() {
        this.props.bankAccountAction.loadAllBankAccounts();
    }

    showAddEditBankAccountModal(bankAccount) {
        this.props.bankAccountAction.showAddEditBankAccountModal();
        this.props.bankAccountAction.handleBankAccount(bankAccount);
    }

    render() {
        return (
            <div className="wrapper">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <div className="flex-row flex">
                                <h4 className="card-title">
                                    <strong>Danh sách tài khoản ngân hàng</strong>
                                </h4>
                                <div>
                                    <TooltipButton
                                        placement="top"
                                        text="Thêm tài khoản ngân hàng">
                                        <button
                                            className="btn btn-primary btn-round btn-xs button-add none-margin"
                                            type="button"
                                            onClick={() => this.showAddEditBankAccountModal({
                                                display: 1
                                            })}
                                            >
                                            <strong>+</strong>
                                        </button>
                                    </TooltipButton>
                                </div>
                            </div>

                            {/*<Search*/}
                                {/*onChange={() => {*/}
                                {/*}}*/}
                                {/*value=""*/}
                                {/*placeholder="Nhập tên ngân hàng hoặc tên tài khoản, chủ tài khoản để tìm kiếm"*/}
                            {/*/>*/}
                            <br/>
                        </div>
                        {
                            this.props.isLoading ? <Loading/> :


                                (
                                    <BankAccountComponent
                                        accounts={this.props.accounts}
                                        showAddEditBankAccountModal={this.showAddEditBankAccountModal}
                                    />
                                )
                        }

                    </div>
                </div>
                <AddEditBankAccountModal/>
            </div>
        );
    }
}

BankAccountContainer.propTypes = {
    bankAccountAction: PropTypes.object.isRequired,
    accounts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        accounts: state.bankAccount.accounts,
        isLoading: state.bankAccount.isLoading
    };
}

function mapDispatchToProps(dispatch) {
    return {
        bankAccountAction: bindActionCreators(bankAccountAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankAccountContainer);
