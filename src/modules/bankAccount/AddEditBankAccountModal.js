import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import *as bankAccountAction from "./bankAccountAction";
import * as helper from '../../helpers/helper';
import CheckBoxMaterial from "../../components/common/CheckBoxMaterial";


class AddEditBankAccountModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.saveBankAccount = this.saveBankAccount.bind(this);
        this.handleBankAccount = this.handleBankAccount.bind(this);
        this.choose = this.choose.bind(this);
    }

    choose(){
        let bankAccount = {
            ...this.props.bankAccountEditModal,
            display: 1 - this.props.bankAccountEditModal.display
        };
        this.props.bankAccountAction.handleBankAccount(bankAccount);
    }
    saveBankAccount() {
        const account = {...this.props.bankAccountEditModal};
        if (
            helper.isEmptyInput(account.bank_name)
            || helper.isEmptyInput(account.bank_account_name)
            || helper.isEmptyInput(account.account_number)
            || helper.isEmptyInput(account.owner_name)
            || helper.isEmptyInput(account.branch)
        ) {
            if (helper.isEmptyInput(account.bank_name)) helper.showErrorNotification("Bạn cần nhập Tên ngân hàng");
            if (helper.isEmptyInput(account.bank_account_name)) helper.showErrorNotification("Bạn cần nhập Tên tài khoản");
            if (helper.isEmptyInput(account.account_number)) helper.showErrorNotification("Bạn cần nhập Số tài khoản");
            if (helper.isEmptyInput(account.owner_name)) helper.showErrorNotification("Bạn cần nhập Tên chủ thẻ");
            if (helper.isEmptyInput(account.branch)) helper.showErrorNotification("Bạn cần nhập Tên chi nhánh");
        } else {
            if (!account.id) this.props.bankAccountAction.saveBankAccount(account);
            else this.props.bankAccountAction.editBankAccount(account);
        }
    }

    handleBankAccount(e) {
        const field = e.target.name;
        let bankAccount = {
            ...this.props.bankAccountEditModal,
            [field]: e.target.value
        };
        this.props.bankAccountAction.handleBankAccount(bankAccount);
    }

    render() {
        let account = this.props.bankAccountEditModal;
        return (
            <Modal show={this.props.addEditBankAccountModal}
                   onHide={() => this.props.bankAccountAction.showAddEditBankAccountModal()}>
                <a onClick={() => this.props.bankAccountAction.showAddEditBankAccountModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Quản lý tài khoản ngân hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="label-control">Tên Ngân Hàng</label>
                                <input type="text"
                                       name="bank_name"
                                       className="form-control"
                                       value={account.bank_name || ''}
                                       onChange={this.handleBankAccount}/>
                                <span className="material-input"/>
                            </div>

                            <div className="form-group">
                                <label className="label-control">Tên Tài Khoản Ngân Hàng</label>
                                <input type="text"
                                       name="bank_account_name"
                                       className="form-control"
                                       value={account.bank_account_name || ''}
                                       onChange={this.handleBankAccount}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Chủ Tài Khoản</label>
                                <input type="text"
                                       name="owner_name"
                                       className="form-control"
                                       value={account.owner_name || ''}
                                       onChange={this.handleBankAccount}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Số Tài Khoản</label>
                                <input type="text"
                                       name="account_number"
                                       className="form-control"
                                       value={account.account_number || ''}
                                       onChange={this.handleBankAccount}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Chi Nhánh</label>
                                <input type="text"
                                       name="branch"
                                       className="form-control"
                                       value={account.branch || ''}
                                       onChange={this.handleBankAccount}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <CheckBoxMaterial
                                    name="display"
                                    checked={(account.display === 1)}
                                    onChange={this.choose}
                                    label="Trạng Thái Hiển Thị"
                                />
                            </div>
                            <br/><br/>
                            {
                                this.props.isUpdatingEditModal ? (
                                    <Loading/>
                                ) : (
                                    <div>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-success btn-round" data-dismiss="modal"
                                                onClick={this.saveBankAccount}><i
                                            className="material-icons">check</i> Xác nhận
                                        </button>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={() => this.props.bankAccountAction.showAddEditBankAccountModal()}>
                                            <i className="material-icons">close</i> Huỷ
                                        </button>
                                    </div>
                                )
                            }
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

AddEditBankAccountModal.propTypes = {
    bankAccountAction: PropTypes.object.isRequired,
    addEditBankAccountModal: PropTypes.bool.isRequired,
    bankAccountEditModal: PropTypes.object.isRequired,
    isUpdatingEditModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        addEditBankAccountModal: state.bankAccount.addEditBankAccountModal,
        bankAccountEditModal: state.bankAccount.bankAccountEditModal,
        isUpdatingEditModal: state.bankAccount.isUpdatingEditModal
    };
}
function mapDispatchToProps(dispatch) {
    return {
        bankAccountAction: bindActionCreators(bankAccountAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(AddEditBankAccountModal);