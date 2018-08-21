import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import * as financeActions from './financeActions';
import {TRANSFER_PURPOSE} from "../../constants/constants";
import Select from 'react-select';

class BankTransferEditModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleTransfer = this.handleTransfer.bind(this);
        this.changeSelectPurpose = this.changeSelectPurpose.bind(this);
    }

    handleTransfer(e) {
        const field = e.target.name;
        let transfer = {
            ...this.props.transferEdit,
            [field]: e.target.value
        };
        this.props.financeActions.handleBankTransferEditModal(transfer);
    }

    changeSelectPurpose(value) {
        let transfer = {
            ...this.props.transferEdit,
            purpose: value.value
        };
        this.props.financeActions.handleBankTransferEditModal(transfer);
    }

    render() {
        let transfer = this.props.transferEdit;
        return (
            <Modal show={this.props.bankTransferEditModal}
                   onHide={() => this.props.financeActions.showBankTransferEditModal()}>
                <a onClick={() => this.props.financeActions.showBankTransferEditModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Thông tin chuyển khoản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="label-control">Mục đích chuyển khoản</label>
                                <Select
                                    name="manufactures"
                                    value={transfer.purpose}
                                    options={TRANSFER_PURPOSE}
                                    onChange={this.changeSelectPurpose}
                                    clearable={false}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label-control">Số tiền</label>
                                <input type="number"
                                       name="money"
                                       className="form-control"
                                       value={transfer.money}
                                       onChange={this.handleTransfer}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Nội dung</label>
                                <input type="text"
                                       name="note"
                                       className="form-control"
                                       value={transfer.note}
                                       onChange={this.handleTransfer}/>
                                <span className="material-input"/>
                            </div>
                            <br/><br/>
                            <div>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-success btn-round" data-dismiss="modal"
                                        onClick={() => this.props.financeActions.editTransfer(transfer)}><i
                                    className="material-icons">check</i> Xác nhận
                                </button>
                                <button rel="tooltip" data-placement="top" title=""
                                        data-original-title="Remove item" type="button"
                                        className="btn btn-danger btn-round" data-dismiss="modal"
                                        onClick={() => this.props.financeActions.showBankTransferEditModal()}>
                                    <i className="material-icons">close</i> Huỷ
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

BankTransferEditModal.propTypes = {
    financeActions: PropTypes.object.isRequired,
    transferEdit: PropTypes.object.isRequired,
    bankTransferEditModal: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        bankTransferEditModal: state.finance.bankTransferEditModal,
        transferEdit: state.finance.transferEdit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        financeActions: bindActionCreators(financeActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BankTransferEditModal);