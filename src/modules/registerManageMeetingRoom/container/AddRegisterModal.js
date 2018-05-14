/**
 * Created by Kiyoshitaro on 07/05/2018.
 */
import React from 'react';
import PropTypes from 'prop-types';

import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FormInputText from '../../../components/common/FormInputText';
import { Modal } from "react-bootstrap";
import * as helper from "../../../helpers/helper";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import { DATETIME_FORMAT_SQL } from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import ReactSelect from "react-select";
import * as registerManageMeetingRoomApi from '../apis/registerManageMeetingRoomApi';


function addSelectProvince(items) {
    return items && items.map(item => {
        return {
            value: item.id,
            label: item.name,
        };
    });
}

class AddRegisterModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { rooms: [] };
        this.closeAddRegisterModal = this.closeAddRegisterModal.bind(this);
        this.loadBasesByProvince = this.loadBasesByProvince.bind(this);
        this.createRegister = this.createRegister.bind(this);
        this.updateFormRegister = this.updateFormRegister.bind(this);
        this.updateProvince = this.updateProvince.bind(this);
        this.updateBase = this.updateBase.bind(this);
        this.timeOut = null;
    }

    componentWillMount() {
        this.props.registerManageMeetingRoomAction.loadAllProvinces();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.rooms !== this.props.rooms) {
            this.setState({
                rooms: nextProps.rooms,
            });
        }
    }
    closeAddRegisterModal() {
        helper.confirm("warning", "Cảnh báo",
            "Bạn có chắc muốn đóng ? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                this.props.registerManageMeetingRoomAction.closeAddRegisterModal();
            },
        );
    }

    updateProvince(e) {
        let register = { ...this.props.register };
        register["province_id"] = e.value;
        this.props.registerManageMeetingRoomAction.updateRegister(register);
    }

    updateBase(e) {
        let register = { ...this.props.register };
        register["base_id"] = e.value;
        this.props.registerManageMeetingRoomAction.updateRegister(register);
        this.props.registerManageMeetingRoomAction.loadRooms(e.value, this.props.register.start_time, this.props.register.end_time);

    }

    loadBasesByProvince(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            registerManageMeetingRoomApi.loadBasesByProvinceApi(this.props.register.province_id, input)
                .then((res) => {
                    let bases;
                    if (res.data.status) {
                        bases = res.data.data.bases.map((base) => {
                            return {
                                value: base.id,
                                label: base.name,
                            };
                        });
                    }
                    else {
                        bases = [];
                    }
                    callback(null, { options: bases, complete: true });
                });
        }.bind(this), 500);
    }


    updateFormRegister(event) {
        const field = event.target.name;
        let data = { ...this.props.register };
        data[field] = event.target.value;
        this.props.registerManageMeetingRoomAction.updateRegister(data);
        this.props.registerManageMeetingRoomAction.loadRooms(data.base_id, data.start_time, data.end_time);
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
                    {this.props.isLoadingProvinces ? <Loading /> :
                        <form id="form-register">
                            <FormInputText
                                label="Tên"
                                required
                                name="name"
                                updateFormData={this.updateFormRegister}
                                value={this.props.register && this.props.register.name}
                            />
                            <ReactSelect
                                value={this.props.register.province_id}
                                options={addSelectProvince(this.props.provinces)}
                                onChange={this.updateProvince}
                                placeholder="Chọn tỉnh"
                            />
                            {this.props.register.province_id ?
                                <ReactSelect.Async
                                    loadOptions={this.loadBasesByProvince}
                                    loadingPlaceholder="Đang tải..."
                                    placeholder="Chọn cơ sở"
                                    searchPromptText="Không có dữ liệu "
                                    onChange={this.updateBase}
                                    value={this.props.register.base_id}
                                /> : null
                            }

                            <div className="row">
                                <div className="col-md-6">
                                    <FormInputDateTime
                                        format={DATETIME_FORMAT_SQL}
                                        name="start_time"
                                        id="start_time"
                                        label="Từ ngày"
                                        value={this.props.register.start_time}
                                        updateFormData={this.updateFormRegister}
                                        maxDate={this.props.register.end_time}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <FormInputDateTime
                                        format={DATETIME_FORMAT_SQL}
                                        name="end_time"
                                        id="end_time"
                                        label="Đến ngày"
                                        value={this.props.register.end_time}
                                        updateFormData={this.updateFormRegister}
                                        minDate={this.props.register.start_time}
                                    />
                                </div>
                            </div>
                            {this.props.isLoadingRooms ? <Loading /> :
                                <div>
                                    {this.state.rooms.map(room => {
                                        return (
                                            <div className="col-sm-6 col-md-6 col-lg-4" key={room.id}>
                                                <div className="card card-chart">
                                                    <div className="card-header" data-background-color="white"
                                                        style={{ borderRadius: '10px' }}>

                                                        <a onClick={() => {
                                                            this.openEditPostModal(room.id);
                                                        }}>
                                                            <div id="simpleBarChart" className="ct-chart"
                                                                style={{
                                                                    width: '100%',
                                                                    background: 'url(' + room.avatar_url + ')',
                                                                    backgroundSize: 'cover',
                                                                    backgroundPosition: 'center',
                                                                    height: '200px',
                                                                    borderRadius: '10px',
                                                                    position: "relative"
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                    <div className="card-content">
                                                        <div className="card-action" style={{ height: 73 }}>
                                                            <h4 className="card-title" style={{ display: "flex", justifyContent: "space-between" }}>
                                                                <a onClick={() => {
                                                                    this.openEditPostModal(room.id);
                                                                }}>{room.name ? room.name : "Chưa có tên"}</a>
                                                                <button type="button" className="btn btn-xs btn-rose">
                                                                    Đặt phòng
                                                                </button>
                                                            </h4>

                                                        </div>
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            height: 40
                                                        }}>
                                                            <div style={{
                                                                display: "flex",
                                                                alignItems: "center"
                                                            }}>
                                                                <div>
                                                                    <strong>{room.room_type && room.room_type.name}</strong><br />
                                                                    {/*<p className="category"*/}
                                                                    {/*style={{fontSize: 12}}>*/}
                                                                    {/* eslint-disable */}
                                                                    {room.room_type &&
                                                                        <div dangerouslySetInnerHTML={{ __html: room.room_type.description }} />
                                                                    }
                                                                    {/* eslint-enable */}
                                                                    {/*</p>*/}

                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>
                            }
                            <div className="modal-footer">
                                {this.props.isCreatingRegister ?
                                    (
                                        <button type="button" className="btn btn-rose disabled">
                                            <i className="fa fa-spinner fa-spin " />Đang thêm
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
    provinces: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
    isCreatingRegister: PropTypes.bool.isRequired,
    isLoadingProvinces: PropTypes.bool.isRequired,
    isLoadingRooms: PropTypes.bool.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
    isOpenAddRegisterModal: PropTypes.bool.isRequired,

};

function mapStateToProps(state) {
    return {
        isOpenAddRegisterModal: state.registerManageMeetingRoom.isOpenAddRegisterModal,
        isLoadingProvinces: state.registerManageMeetingRoom.isLoadingProvinces,
        isLoadingRooms: state.registerManageMeetingRoom.isLoadingProvinces,
        register: state.registerManageMeetingRoom.register,
        provinces: state.registerManageMeetingRoom.provinces,
        rooms: state.registerManageMeetingRoom.rooms,
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


