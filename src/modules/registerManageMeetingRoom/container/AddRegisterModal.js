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
import {DATETIME_FORMAT, STATUS_REGISTER_ROOM} from "../../../constants/constants";
import Loading from "../../../components/common/Loading";
import ReactSelect from "react-select";
import ConfirmModal from "./ConfirmModal";
import { loadUsers } from "../apis/registerManageMeetingRoomApi";
import Checkbox from "../../../components/common/Checkbox";
import Button from "../../../components/common/Button";
import moment from "moment/moment";

// import ConfirmModal from "./ConfirmModal";


// function addSelect(items) {
//     return items && items.map(item => {
//         return {
//             value: item.id,
//             label: item.name,
//         };
//     });
// }

function allRoomsSimilar(room , rooms ,base_id) {
    //console.log(room);
    if (base_id != 0) {
        rooms = rooms.filter(room => room.base_id == base_id);
    }

    if (room) {
        rooms = rooms.filter(roomItem => roomItem.id != room.id);
    }

    return rooms;
}

function selectCampaign(campaigns) {
    return campaigns && campaigns.map(function (campaign) {
        return {
            ...campaign,
            value: campaign.id,
            label: campaign.name
        };
    });
}
class AddRegisterModal extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {rooms: []};
        this.closeAddRegisterModal = this.closeAddRegisterModal.bind(this);
        this.updateFormRegister = this.updateFormRegister.bind(this);
        this.updateFormSelect = this.updateFormSelect.bind(this);
        this.updateProvince = this.updateProvince.bind(this);
        this.updateBase = this.updateBase.bind(this);
        this.updateDateTime = this.updateDateTime.bind(this);
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
        let register = {...this.props.register};
        register["province_id"] = e.value;
        this.props.registerManageMeetingRoomAction.updateRegister(register);
        this.props.registerManageMeetingRoomAction.loadBasesByProvince(e.value);

    }

    updateBase(e) {
        let register = {...this.props.register};
        register["base_id"] = e.value;
        this.props.registerManageMeetingRoomAction.updateRegister(register);
        this.props.registerManageMeetingRoomAction.loadRooms(e.value, this.props.register.start_time, this.props.register.end_time);
    }


    updateFormRegister(event) {
        const field = event.target.name;
        let data = {...this.props.register};
        data[field] = event.target.value;
        this.props.registerManageMeetingRoomAction.updateRegister(data);
    }

    updateFormSelect(name,  value) {
        let data = {...this.props.register};
        data[name] =value;
        this.props.registerManageMeetingRoomAction.updateRegister(data);
    }

    updateDateTime(event) {
        const field = event.target.name;
        let data = {...this.props.register};
        data[field] = event.target.value;
        this.props.registerManageMeetingRoomAction.updateRegister(data);
        this.props.registerManageMeetingRoomAction.loadRooms(data.base_id, data.start_time, data.end_time);
    }

    loadUsers = (input, callback) => {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function() {
                loadUsers(input).then(res => {
                    let users = res.data.data.users.map(user => {
                        return {
                            ...user,
                            ...{
                                value: user.id,
                                label: user.name + ` (${user.phone})`
                            }
                        };
                    });
                    callback(null, { options: users, complete: true });
                });
            }.bind(this),
            500
        );
    };

    selectUser = value => {
        let register = { ...this.props.register };
        register.name = value.name;
        register.email = value.email;
        register.address = value.address;
        register.phone = value.phone;
        register.selectedUser = value;
        this.props.registerManageMeetingRoomAction.updateRegister(register);
    };
    changeSimilarRoom = (event, room) => {
        let register = { ...this.props.register };

        if (event.target.checked) {
            if(this.props.register.similar_room) {
                register['similar_room'] = [...this.props.register.similar_room, room.id];
            }
            else{
                register['similar_room'] = [room.id];
            }
        } else {
            register['similar_room'] = this.props.register && this.props.register.similar_room.filter(
                roomItem => roomItem != room.id
            );
        }
        this.props.registerManageMeetingRoomAction.updateRegister(register);
    };
    createBookRoom = () => {
        helper.setFormValidation("#form-book-room");
        if ($("#form-book-room").valid()) {
            const start_time = moment(
                this.props.register.start_time,
                DATETIME_FORMAT
            ).format("X");
            const end_time = moment(this.props.register.end_time, DATETIME_FORMAT).format(
                "X"
            );
            if (start_time >= end_time) {
                helper.showTypeNotification(
                    "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc",
                    "warning"
                );
                return;
            }
            this.props.registerManageMeetingRoomAction.createRegister(this.props.register, this.closeModalBooking);
        }
    };



    render() {
        let disableCreateRegister = this.props.disableCreateRegister;
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
                    {this.props.isLoadingProvinces ? <Loading/> :
                        <div>
                            <form id="form-book-room">
                                {this.props.register.id ? (
                                    <div/>
                                ) : (
                                    <div className="form-group">
                                        <label className="label-control">Tìm khách hàng</label>
                                        <ReactSelect.Async
                                            loadOptions={this.loadUsers}
                                            loadingPlaceholder="Đang tải..."
                                            placeholder="Chọn nhà cung cấp"
                                            searchPromptText="Không có dữ liệu"
                                            onChange={this.selectUser}
                                            value={this.props.register.selectedUser}
                                        />
                                    </div>
                                )}
                                <FormInputText
                                    label="Tên khách hàng"
                                    name="name"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.name}
                                    required
                                    disabled={disableCreateRegister}
                                />
                                <FormInputText
                                    label="Số điện thoại"
                                    name="phone"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.phone}
                                    required
                                    disabled={disableCreateRegister}
                                />
                                <FormInputText
                                    label="Đại chỉ"
                                    name="address"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.address}
                                    disabled={disableCreateRegister}
                                />
                                <FormInputText
                                    label="Email"
                                    name="email"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.email}
                                    type={"email"}
                                    disabled={disableCreateRegister}
                                />

                                <FormInputText
                                    label="Ghi chú khách hàng"
                                    name="note"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.note}
                                    disabled={disableCreateRegister}
                                />
                                <FormInputDateTime
                                    id={"booking-start-time"}
                                    name="start_time"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.start_time}
                                    label={"Thời gian bắt đầu"}
                                    disabled={disableCreateRegister}
                                />
                                <FormInputDateTime
                                    id={"booking-end-time"}
                                    name="end_time"
                                    updateFormData={this.updateFormRegister}
                                    value={this.props.register.end_time}
                                    label={"Thời gian kết thúc"}
                                    disabled={disableCreateRegister}
                                />
                            </form>
                            < div className="form-group">
                                <label className="label-control">Trạng thái</label>
                                <ReactSelect
                                    name="status"
                                    value={this.props.register.status}
                                    options={STATUS_REGISTER_ROOM}
                                    onChange={value => {
                                        this.updateFormSelect('status',value.value);
                                        // this.booking.status = value.value;
                                    }}
                                    placeholder="Chọn trang thái"
                                    disabled={disableCreateRegister}
                                />
                            </div>
                            <div className="form-group">
                                <label className="label-control">Chiến dich</label>
                                <ReactSelect
                                    name="campaign_id"
                                    value={this.props.register.campaign_id}
                                    options={selectCampaign(this.props.campaigns)}
                                    onChange={value => {
                                        this.updateFormSelect('campaign_id',value.value);
                                    }}
                                    placeholder="Chọn trang thái"
                                    disabled={disableCreateRegister}
                                />
                            </div>


                            <div className="form-group">
                                <label className="label-control">Ghép phòng</label>
                                <div className="row">
                                    {allRoomsSimilar(this.props.register.room,this.props.rooms,this.props.base_id).map((room, index) => {
                                        const checked =
                                            this.props.register.similar_room &&
                                            this.props.register.similar_room.filter(
                                                roomItem => roomItem == room.id
                                            ).length > 0;
                                        return (
                                            <div className="col-md-4" key={index}>
                                                <Checkbox
                                                    label={room.name}
                                                    checked={checked}
                                                    checkBoxLeft
                                                    disabled={disableCreateRegister}
                                                    onChange={event => this.changeSimilarRoom(event, room)}
                                                />
                                            </div>
                                        );

                                    })}
                                </div>
                            </div>

                            {!disableCreateRegister && (
                                <Button
                                    onClick={this.createBookRoom}
                                    label={"Lưu"}
                                    labelLoading={"Đang lưu"}
                                    className={"btn btn-rose"}
                                    isLoading={this.props.isCreatingRegister}
                                />
                            )}

                        </div>
                        // <form id="form-register">
                        //     <FormInputText
                        //         label="Tên"
                        //         required
                        //         name="name"
                        //         updateFormData={this.updateFormRegister}
                        //         value={this.props.register && this.props.register.name}
                        //     />
                        //     <FormInputText
                        //         label="Email"
                        //         required
                        //         name="email"
                        //         updateFormData={this.updateFormRegister}
                        //         value={this.props.register && this.props.register.email}
                        //     />
                        //     <FormInputText
                        //         label="Số điện thoại"
                        //         name="phone"
                        //         required
                        //         updateFormData={this.updateFormRegister}
                        //         value={this.props.register && this.props.register.phone}
                        //     />
                        //     <div className="row">
                        //         <div className="col-md-6">
                        //             <ReactSelect
                        //                 value={this.props.register.province_id}
                        //                 options={addSelect(this.props.provinces)}
                        //                 onChange={this.updateProvince}
                        //                 placeholder="Chọn tỉnh"
                        //             />
                        //         </div>
                        //         <div className="col-md-6">
                        //             {this.props.register.province_id ?
                        //                 <ReactSelect
                        //                 value={this.props.register.base_id}
                        //                 options={addSelect(this.props.basesByProvince)}
                        //                 onChange={this.updateBase}
                        //                 isLoading={this.props.isLoadingBasesByProvince}
                        //                 searchPromptText="Không có dữ liệu "
                        //                 />
                        //                 :null
                        //             }
                        //         </div>
                        //     </div>
                        //
                        //     <div className="row">
                        //         <div className="col-md-6">
                        //             <FormInputDateTime
                        //                 format={DATETIME_FORMAT_SQL}
                        //                 name="start_time"
                        //                 id="start_time"
                        //                 label="Từ ngày"
                        //                 value={this.props.register.start_time}
                        //                 updateFormData={this.updateDateTime}
                        //                 maxDate={this.props.register.end_time}
                        //             />
                        //         </div>
                        //         <div className="col-md-6">
                        //             <FormInputDateTime
                        //                 format={DATETIME_FORMAT_SQL}
                        //                 name="end_time"
                        //                 id="end_time"
                        //                 label="Đến ngày"
                        //                 value={this.props.register.end_time}
                        //                 updateFormData={this.updateDateTime}
                        //                 minDate={this.props.register.start_time}
                        //             />
                        //         </div>
                        //     </div>
                        //     {this.props.isLoadingRooms ? <Loading/> :
                        //         <div className="row">
                        //             {this.state.rooms.map(room => {
                        //                 return (
                        //                     <div className="col-sm-6 col-md-6 col-lg-6" key={room.id}>
                        //                         <div className="card card-chart">
                        //                             <div className="card-header" data-background-color="white"
                        //                                  style={{borderRadius: '10px'}}>
                        //
                        //                                 <a>
                        //
                        //                                     <div id="simpleBarChart" className="ct-chart"
                        //                                          style={{
                        //                                              width: '100%',
                        //                                              background: 'url(' + room.avatar_url + ')',
                        //                                              backgroundSize: 'cover',
                        //                                              backgroundPosition: 'center',
                        //                                              height: '200px',
                        //                                              borderRadius: '10px',
                        //                                              position: "relative"
                        //                                          }}
                        //                                     />
                        //                                 </a>
                        //                             </div>
                        //                             <div className="card-content">
                        //                                 <div className="card-action" style={{height: 73}}>
                        //                                     <h4 className="card-title" style={{
                        //                                         display: "flex",
                        //                                         justifyContent: "space-between",
                        //                                         alignItems: "center",
                        //                                     }}>
                        //                                         <a>{room.name ? room.name : "Chưa có tên"}</a>
                        //                                         <button
                        //                                             type="button" className="btn btn-xs btn-rose"
                        //                                             onClick={() => this.props.registerManageMeetingRoomAction.openConfirmModal(room.id)}
                        //                                         >
                        //                                             Đặt phòng
                        //                                         </button>
                        //                                     </h4>
                        //                                 </div>
                        //                                 <div>
                        //                                     <div>
                        //                                         <strong>{room.room_type && room.room_type.name}</strong><br/>
                        //                                     </div>
                        //
                        //                                     {/* eslint-disable */
                        //                                         room.room_type &&
                        //                                         <div dangerouslySetInnerHTML={{__html: room.room_type.description}}/>
                        //
                        //                                     /* eslint-enable */}
                        //                                 </div>
                        //
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                 );
                        //             })}
                        //
                        //         </div>
                        //     }
                        // </form>

                    }

                    <ConfirmModal/>

                </Modal.Body>
            </Modal>
        );
    }
}

AddRegisterModal.propTypes = {
    register: PropTypes.object.isRequired,
    provinces: PropTypes.array.isRequired,
    campaigns: PropTypes.array.isRequired,
    basesByProvince: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
    // isCreatingRegister: PropTypes.bool.isRequired,
    isLoadingProvinces: PropTypes.bool.isRequired,
    isLoadingBasesByProvince: PropTypes.bool.isRequired,
    isLoadingRooms: PropTypes.bool.isRequired,
    isCreatingRegister: PropTypes.bool.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
    isOpenAddRegisterModal: PropTypes.bool.isRequired,
    disableCreateRegister: PropTypes.bool.isRequired,
    base_id: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isOpenAddRegisterModal: state.registerManageMeetingRoom.isOpenAddRegisterModal,
        isLoadingProvinces: state.registerManageMeetingRoom.isLoadingProvinces,
        isLoadingRooms: state.registerManageMeetingRoom.isLoadingProvinces,
        isLoadingBasesByProvince: state.registerManageMeetingRoom.isLoadingBasesByProvince,
        isCreatingRegister: state.registerManageMeetingRoom.isCreatingRegister,
        register: state.registerManageMeetingRoom.register,
        provinces: state.registerManageMeetingRoom.provinces,
        basesByProvince: state.registerManageMeetingRoom.basesByProvince,
        rooms: state.registerManageMeetingRoom.rooms,
        campaigns: state.registerManageMeetingRoom.campaigns,
        // isCreatingRegister: state.registerManageMeetingRoom.isCreatingRegister,
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


