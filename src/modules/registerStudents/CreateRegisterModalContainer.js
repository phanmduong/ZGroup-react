import React from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import FormInputText from "../../components/common/FormInputText";
import { bindActionCreators } from "redux";
import * as createRegisterActions from "./createRegisterActions";
import { connect } from "react-redux";

class CreateRegisterModalContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.createRegister = this.createRegister.bind(this);
        this.hide = this.hide.bind(this);
    }

    updateFormData(event) {
        const { name, value } = event.target;
        const register = { ...this.props.register };
        register[name] = value;
        this.props.createRegisterActions.updateFormData(register);
    }

    createRegister() {}

    hide() {
        this.props.createRegisterActions.showCreateRegisterModal(false);
    }

    render() {
        const { register } = this.props;
        return (
            <form role="form" id="form-info-student">
                <Modal show={this.props.showCreateRegisterModal} onHide={this.hide}>
                    <Modal.Header closeButton>
                        <h3>Tạo đăng kí mới</h3>
                    </Modal.Header>
                    <Modal.Body>
                        <FormInputText
                            name="name"
                            label="Tên học viên"
                            required
                            value={register.name}
                            updateFormData={this.updateFormData}
                        />
                        <FormInputText
                            name="email"
                            label="Email học viên"
                            required
                            value={register.email}
                            updateFormData={this.updateFormData}
                        />
                        <FormInputText
                            name="phone"
                            label="Số điện thoại học viên"
                            required
                            value={register.phone}
                            updateFormData={this.updateFormData}
                        />
                        

                    </Modal.Body>
                    <Modal.Footer>
                        {this.props.isLoading ? (
                            <button className="btn btn-rose disabled" type="button">
                                <i className="fa fa-spinner fa-spin" /> Đang lưu
                            </button>
                        ) : (
                            <button
                                className="btn btn-fill btn-rose"
                                type="button"
                                style={{ width: "20%" }}
                                onClick={this.createRegister}>
                                Lưu
                            </button>
                        )}
                    </Modal.Footer>
                </Modal>
            </form>
        );
    }
}

CreateRegisterModalContainer.propTypes = {
    createRegisterActions: PropTypes.object.isRequired,
    showCreateRegisterModal: PropTypes.bool.isRequired,
    register: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    const { showCreateRegisterModal, isLoading, register } = state.createRegister;
    return {
        showCreateRegisterModal,
        isLoading,
        register,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createRegisterActions: bindActionCreators(createRegisterActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRegisterModalContainer);
