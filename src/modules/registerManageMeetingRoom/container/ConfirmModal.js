/**
 * Created by Kiyoshitaro on 07/05/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Modal} from "react-bootstrap";
import * as helper from "../../../helpers/helper";
// import * as helper from "../../../helpers/helper";
// import Loading from "../../../components/common/Loading";
// import ReactSelect from "react-select";

class ConfirmModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {rooms: []};
        this.closeConfirmModal = this.closeConfirmModal.bind(this);
        this.createRegister = this.createRegister.bind(this);
    }

    createRegister(e) {
        // if ($("#form-register").valid()) {
            if (this.props.register.name === null || this.props.register.name === undefined || this.props.register.name === "") {
                helper.showTypeNotification("Vui lòng nhập tên", 'warning');
                return;

            }
            if (this.props.register.phone === null || this.props.register.phone === undefined || this.props.register.phone === '') {
                helper.showTypeNotification("Vui lòng nhập số điện thoại", 'warning');
                return;
            }
            if (this.props.register.email === null || this.props.register.email === undefined || this.props.register.email === '') {
                helper.showTypeNotification("Vui lòng nhập email", 'warning');
                return;
            }
            if (this.props.register.start_time === null || this.props.register.start_time === undefined || this.props.register.start_time === '') {
                helper.showTypeNotification("Vui lòng chọn thời gian bắt đầu", 'warning');
                return;
            }
            if (this.props.register.end_time === null || this.props.register.end_time === undefined || this.props.register.end_time === '') {
                helper.showTypeNotification("Vui lòng nhập thời gian kết thúc", 'warning');
                return;
            }
            this.props.registerManageMeetingRoomAction.createRegister(this.props.register, this.closeConfirmModal);
        // }
        e.preventDefault();
    }

    closeConfirmModal() {
        this.props.registerManageMeetingRoomAction.closeConfirmModal();
    }


    render() {
        const register = this.props.register ? this.props.register : {};
        return (
            <Modal
                show={this.props.isOpenConfirmModal}
                bsStyle="primary"
                onHide={this.closeConfirmModal}>
                <Modal.Header closeButton>
                    {/*<Modal.Title>*/}
                    {/*<h4 className="card-title">*/}
                    {/*<strong>Xác nhận</strong>*/}
                    {/*</h4>*/}
                    {/*</Modal.Title>*/}
                </Modal.Header>
                <Modal.Body>
                    <div className="card card-profile">
                        <div className="card-avatar">
                            <a
                                style={{
                                    width: '100%',
                                    background: register.room && 'url(' + register.room.avatar_url + ')',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: '200px',
                                    borderRadius: '10px',
                                    position: "relative"
                                }}
                            >
                                <img className="img" src={register.room && register.room.avatar_url}/>
                            </a>
                        </div>
                        <h6 className="category text-gray">Thông tin</h6>
                        <h4 className="card-title">{register.name}</h4>
                        <p className="description">{register.email + " - " + register.phone}</p>
                    </div>
                    <div>
                        <div className="card-content">
                            <div className="col-md-2"/>
                            <div className="col-md-8">
                                <strong>Thời gian đặt
                                    phòng: </strong> {register.start_time + " đến " + register.end_time}<br/>
                                <strong>Chi phí mỗi giờ : </strong><br/>
                                <strong>Địa chỉ : </strong>{register.room && register.room.base.address}<br/>
                                <strong>Số giờ miễn phí còn lại : </strong>
                            </div>
                        </div>
                        <center>

                            {this.props.isCreatingRegister ?
                                (
                                    <button type="button" className="btn btn-rose btn-round disabled">
                                        <i className="fa fa-spinner fa-spin "/>Đang xác nhận
                                    </button>
                                ) : (
                                    <button className="btn btn-rose btn-round"
                                            onClick={
                                                (e) => {
                                                    this.createRegister(e);
                                                }}
                                    >Xác nhận</button>
                                )
                            }
                        </center>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

ConfirmModal.propTypes = {
    isOpenConfirmModal: PropTypes.bool.isRequired,
    register: PropTypes.object.isRequired,
    isCreatingRegister: PropTypes.bool.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isCreatingRegister: state.registerManageMeetingRoom.isCreatingRegister,
        isOpenConfirmModal: state.registerManageMeetingRoom.isOpenConfirmModal,
        register: state.registerManageMeetingRoom.register,
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

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);


