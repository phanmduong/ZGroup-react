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


import ReactSelect from "react-select";
import Loading from "../../components/common/Loading";


function addSelect(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
        };
    });
}

function addSelectSubscription(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.subcription_kind.name,
        };
    });
}


class AddRegisterModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {rooms: []};
        this.closeAddRegisterModal = this.closeAddRegisterModal.bind(this);
        this.updateFormRegister = this.updateFormRegister.bind(this);
        this.updateBase = this.updateBase.bind(this);
        this.updateSubscription = this.updateSubscription.bind(this);
        this.updateUserpack = this.updateUserpack.bind(this);
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

    createRegister(){
        this.props.registerManageAction.createRegister(this.props.register);
    }


    updateFormRegister(event) {
        const field = event.target.name;
        let data = {...this.props.register};
        data[field] = event.target.value;
        this.props.registerManageAction.updateRegister(data);
    }

    updateBase(e) {
        let register = {...this.props.register};
        register["base_id"] = e.value;
        this.props.registerManageAction.updateRegister(register);
    }
    updateUserpack(e) {
        let register = {...this.props.register};
        register["userpack_id"] = e.value;
        this.props.registerManageAction.updateRegister(register);
        this.props.registerManageAction.loadSubscription(e.value);
        // this.props.registerManageMeetingRoomAction.loadRooms(e.value, this.props.register.start_time, this.props.register.end_time);
    }

    updateSubscription(e) {
        let register = {...this.props.register};
        register["subscription_id"] = e.value;
        this.props.registerManageAction.updateRegister(register);
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
                    {this.props.isLoadingUserpacks ? <Loading/> :
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

                            <ReactSelect
                                value={this.props.register.base_id}
                                options={addSelect(this.props.bases)}
                                onChange={this.updateBase}
                                placeholder="Chọn cơ sở"
                            />

                            <br/>
                            <div className="row">
                                <div className="col-md-6">
                                    <ReactSelect
                                        value={this.props.register.userpack_id}
                                        options={addSelect(this.props.userpacks)}
                                        onChange={this.updateUserpack}
                                        placeholder="Chọn gói đăng kí"
                                    />
                                </div>
                                <div className="col-md-6">
                                    {this.props.register.userpack_id ?
                                        <ReactSelect
                                        value={this.props.register.subscription_id}
                                        options={addSelectSubscription(this.props.subscriptions)}
                                        onChange={this.updateSubscription}
                                        placeholder="Chọn gói khách hàng"
                                        isLoading={this.props.isLoadingSubscriptions}
                                        />
                                        :null
                                    }
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
                    }


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
    isLoadingUserpacks: PropTypes.bool.isRequired,
    isLoadingSubscriptions: PropTypes.bool.isRequired,
    bases: PropTypes.array.isRequired,
    userpacks: PropTypes.array.isRequired,
    subscriptions: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isOpenAddRegisterModal: state.registerManage.isOpenAddRegisterModal,
        register: state.registerManage.register,
        isCreatingRegister: state.registerManage.isCreatingRegister,
        isLoadingUserpacks: state.registerManage.isLoadingUserpacks,
        isLoadingSubscriptions: state.registerManage.isLoadingSubscriptions,
        bases: state.registerManage.bases,
        userpacks: state.registerManage.userpacks,
        subscriptions: state.registerManage.subscriptions,
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


