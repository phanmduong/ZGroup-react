/**
 * Created by Kiyoshitaro on 07/05/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

import * as registerManageAction from "./registerManageAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import FormInputText from '../../components/common/FormInputText';
import {Modal} from "react-bootstrap";
import * as helper from "../../helpers/helper";

class AddRegisterModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {rooms: []};
        this.closeAddRegisterModal = this.closeAddRegisterModal.bind(this);
        this.updateFormRegister = this.updateFormRegister.bind(this);
        this.timeOut = null;
    }


    closeAddRegisterModal() {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                this.props.registerManageAction.closeAddRegisterModal();
            },
        );
    }


    updateFormRegister(event) {
        const field = event.target.name;
        let data = {...this.props.register};
        data[field] = event.target.value;
        this.props.registerManageAction.updateRegister(data);
    }


    render() {
        return (
            <Modal
                show={this.props.isOpenAddRegisterModal}
                // bsSize="sm"
                bsStyle="primary"
                onHide={this.closeAddRegisterModal}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h4 className="card-title">
                            <strong>Thêm đăng kí</strong>
                        </h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form id="form-register">
                        <FormInputText
                            label="Tên"
                            required
                            name="name"
                            updateFormData={this.updateFormRegister}
                            value={this.props.register && this.props.register.name}
                        />
                        <FormInputText
                            label="Email"
                            required
                            name="email"
                            updateFormData={this.updateFormRegister}
                            value={this.props.register && this.props.register.email}
                        />
                        <FormInputText
                            label="Số điện thoại"
                            name="phone"
                            required
                            updateFormData={this.updateFormRegister}
                            value={this.props.register && this.props.register.phone}
                        />

                        <div className="modal-footer">
                            {this.props.isCreatingRegister ?
                                (
                                    <button type="button" className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin "/>Đang thêm
                                    </button>
                                )
                                :
                                (
                                    <button type="button" className="btn btn-rose"
                                            onClick={
                                                (e) => {
                                                    this.createRegister(e);
                                                }}
                                    >Thêm</button>
                                )
                            }
                            <button type="button"
                                    className="btn"
                                    onClick={
                                        () => {
                                            this.closeAddRegisterModal();
                                        }}
                            >Huỷ
                            </button>
                        </div>
                    </form>


                </Modal.Body>
            </Modal>
        );
    }
}

AddRegisterModal.propTypes = {
    register: PropTypes.object.isRequired,
    registerManageAction: PropTypes.object.isRequired,
    isOpenAddRegisterModal: PropTypes.bool.isRequired,
    isCreatingRegister: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        isOpenAddRegisterModal: state.registerManage.isOpenAddRegisterModal,
        register: state.registerManage.register,
        isCreatingRegister: state.registerManage.isCreatingRegister,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageAction: bindActionCreators(
            registerManageAction,
            dispatch,
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRegisterModal);


