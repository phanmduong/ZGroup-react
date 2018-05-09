/**
 * Created by Kiyoshitaro on 07/05/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import FormInputText from '../../../components/common/FormInputText';
import {Modal} from "react-bootstrap";
import * as helper from "../../../helpers/helper";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import {DATETIME_FORMAT_SQL} from "../../../constants/constants";


class AddRegisterModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.closeAddRegisterModal = this.closeAddRegisterModal.bind(this);
        this.createRegister = this.createRegister.bind(this);
        this.updateFormRegister = this.updateFormRegister.bind(this);
    }

    closeAddRegisterModal() {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                this.props.registerManageMeetingRoomAction.closeAddRegisterModal();
            },
        );
    }

    updateFormRegister(event) {
        const field = event.target.name;
        let data = {...this.props.register};
        data[field] = event.target.value;
        this.props.registerManageMeetingRoomAction.updateRegister(data);
    }

    createRegister(e) {
        if ($("#form-register").valid()) {
            this.props.registerManageMeetingRoomAction.createRegister(this.props.register, this.closeAddRegisterModal);
        }
        e.preventDefault();
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
                        <div className="row">
                            <div className="col-md-6">
                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    name="official_start_time"
                                    id="official_start_time"
                                    label="Từ ngày"
                                    value={this.props.register.official_start_time}
                                    updateFormData={this.updateFormRegister}
                                    maxDate={this.props.register.official_end_time}
                                />
                            </div>
                            <div className="col-md-6">
                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    name="official_end_time"
                                    id="official_end_time"
                                    label="Đến ngày"
                                    value={this.props.register.official_end_time}
                                    updateFormData={this.updateFormRegister}
                                    minDate={this.props.register.official_start_time}
                                />
                            </div>
                        </div>
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
    isCreatingRegister: PropTypes.bool.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
    isOpenAddRegisterModal: PropTypes.bool.isRequired,

};

function mapStateToProps(state) {
    return {
        isOpenAddRegisterModal: state.registerManageMeetingRoom.isOpenAddRegisterModal,
        register: state.registerManageMeetingRoom.register,
        isCreatingRegister: state.registerManageMeetingRoom.isCreatingRegister,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageMeetingRoomAction: bindActionCreators(
            registerManageMeetingRoomAction,
            dispatch,
        )
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRegisterModal);


