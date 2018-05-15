import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import *as currencyAction from "./currencyAction";
import * as helper from '../../helpers/helper';

class AddEditCurrencyModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.saveCurrency = this.saveCurrency.bind(this);
        this.handleCurrency = this.handleCurrency.bind(this);
    }

    saveCurrency() {
        const currency = {...this.props.currencyEditModal};
        if (
            helper.isEmptyInput(currency.name)
            || helper.isEmptyInput(currency.notation)
            || helper.isEmptyInput(currency.ratio)
        ) {
            if (helper.isEmptyInput(currency.name)) helper.showErrorNotification("Bạn cần nhập Tên loại tiền tệ");
            if (helper.isEmptyInput(currency.notation)) helper.showErrorNotification("Bạn cần nhập Ký hiệu tiền tệ");
            if (helper.isEmptyInput(currency.ratio)) helper.showErrorNotification("Bạn cần nhập Tỷ giá tiền tệ");
        } else {
            if (!currency.id) this.props.currencyAction.saveCurrency(currency);
            else this.props.currencyAction.editCurrency(currency);
        }
    }

    handleCurrency(e) {
        const field = e.target.name;
        let currency = {
            ...this.props.currencyEditModal,
            [field]: e.target.value
        };
        this.props.currencyAction.handleCurrency(currency);
    }

    render() {
        let currency = this.props.currencyEditModal;
        return (
            <Modal show={this.props.addEditCurrencyModal}
                   onHide={() => this.props.currencyAction.showAddEditCurrencyModal()}>
                <a onClick={() => this.props.currencyAction.showAddEditCurrencyModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Quản lý tiền tệ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">
                            <div className="form-group">
                                <label className="label-control">Loại tiền tệ</label>
                                <input type="text"
                                       name="name"
                                       className="form-control"
                                       value={currency.name}
                                       onChange={this.handleCurrency}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Ký hiệu</label>
                                <input type="text"
                                       name="notation"
                                       className="form-control"
                                       value={currency.notation}
                                       onChange={this.handleCurrency}/>
                                <span className="material-input"/>
                            </div>
                            <div className="form-group">
                                <label className="label-control">Tỷ giá</label>
                                <input type="number"
                                       name="ratio"
                                       className="form-control"
                                       value={currency.ratio}
                                       onChange={this.handleCurrency}/>
                                <span className="material-input"/>
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
                                                onClick={this.saveCurrency}><i
                                            className="material-icons">check</i> Xác nhận
                                        </button>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={() => this.props.currencyAction.showAddEditCurrencyModal()}>
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

AddEditCurrencyModal.propTypes = {
    currencyAction: PropTypes.object.isRequired,
    addEditCurrencyModal: PropTypes.bool.isRequired,
    currencyEditModal: PropTypes.object.isRequired,
    isUpdatingEditModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        addEditCurrencyModal: state.currency.addEditCurrencyModal,
        currencyEditModal: state.currency.currencyEditModal,
        isUpdatingEditModal: state.currency.isUpdatingEditModal
    };
}

function mapDispatchToProps(dispatch) {
    return {
        currencyAction: bindActionCreators(currencyAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddEditCurrencyModal);