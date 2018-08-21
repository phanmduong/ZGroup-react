import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {Modal} from "react-bootstrap";
import Loading from "../../components/common/Loading";
import * as passwordAction from "./passwordAction";
import * as helper from '../../helpers/helper';


class EditPasswordModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.savePassword = this.savePassword.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }
    savePassword() {
        const password = {...this.props.passwordEditModal};
        if (this.refs.password_new.value === '') { helper.showErrorNotification("Bạn cần nhập mật khẩu mới"); }
        else {
            if (this.refs.password_new.value !== this.refs.password_confirm.value){ helper.showErrorNotification("Bạn cần nhập lại chính xác mật khẩu mới"); }
            else this.props.passwordAction.editPassword(password);
        }
    }

    handlePassword(event) {
        const field = event.target.name;
        let passwordAccount = {
            ...this.props.passwordEditModal,
            [field]: event.target.value
        };
        this.props.passwordAction.handlePassword(passwordAccount);
    }

    render() {
        let password = this.props.passwordEditModal;
        return (
            <Modal show={this.props.editPasswordModal}
                   onHide={() => this.props.passwordAction.showEditPasswordModal()}>
                <a onClick={() => this.props.passwordAction.showEditPasswordModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Chức năng {password.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <form method="#" action="#">

                            <div className="form-group">
                                <label className="label-control">Nhập mật khẩu mới</label>
                                <input type="text" ref="password_new"  name="password" className="form-control"
                                       onChange={this.handlePassword}
                                />
                                <span className="material-input"/>
                            </div>

                            <div className="form-group">
                                <label className="label-control">Xác nhận mật khẩu mới</label>
                                <input type="text" ref="password_confirm" className="form-control" />
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
                                                onClick={this.savePassword}><i
                                            className="material-icons">check</i> Xác nhận
                                        </button>
                                        <button rel="tooltip" data-placement="top" title=""
                                                data-original-title="Remove item" type="button"
                                                className="btn btn-danger btn-round" data-dismiss="modal"
                                                onClick={() => this.props.passwordAction.showEditPasswordModal()}>
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

EditPasswordModal.propTypes = {
    passwordAction: PropTypes.object.isRequired,
    editPasswordModal: PropTypes.bool.isRequired,
    passwordEditModal: PropTypes.object.isRequired,
    isUpdatingEditModal: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        editPasswordModal: state.passwordAccount.editPasswordModal,
        passwordEditModal: state.passwordAccount.passwordEditModal,
        isUpdatingEditModal: state.passwordAccount.isUpdatingEditModal
    };
}
function mapDispatchToProps(dispatch) {
    return {
        passwordAction: bindActionCreators(passwordAction, dispatch)
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditPasswordModal);