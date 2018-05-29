import React, {Component} from "react";
import {observer} from "mobx-react";
import {connect} from "react-redux";
import store from "./dashboardStore";
import Loading from "../../components/common/Loading";
import Select from "../../components/common/Select";
import Calendar from "../../components/common/Calendar";
import moment from "moment";
import {DATETIME_FORMAT_SQL, DATETIME_FORMAT, STATUS_REGISTER_ROOM} from "../../constants/constants";
import {convertTimeToSecond, setFormValidation, showTypeNotification} from "../../helpers/helper";
import {observable} from "mobx";
import {Modal} from "react-bootstrap";
import ReactSelect from "react-select";
import PropTypes from 'prop-types';
import FormInputText from "../../components/common/FormInputText";
import Button from "../../components/common/Button";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import Checkbox from "../../components/common/Checkbox";

let self;

@observer
class DashboardTrongDongContainer extends Component {
    constructor(props) {
        super(props);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.openModalBooking = this.openModalBooking.bind(this);
        self = this;
    }

    componentWillMount() {
        store.loadBases();
        store.loadRooms();
        store.loadRoomTypes();
        store.loadDashboard();
        store.loadCampaigns();
        store.selectedBaseId = this.props.user.base_id;
    }

    @observable showModalChangeStatus = false;
    @observable showModalBooking = false;
    @observable booking = {};
    @observable registerRoomSelected = {};

    onChangeRoom(value) {
        store.selectedRoomId = value;
        store.loadDashboard();
    }

    onChangeBase(value) {
        store.selectedBaseId = value;
        store.loadDashboard();
    }

    onChangeRoomType(value) {
        store.selectedRoomTypeId = value;
        store.loadDashboard();
    }

    onChangeStatus(value) {
        this.registerRoomSelected.status = value.value;
        store.changeStatus(this.registerRoomSelected.id, this.registerRoomSelected.status);
    }

    updateTime(value) {
        store.changeTime(
            value.register_id,
            value.start.format(DATETIME_FORMAT_SQL),
            value.end.format(DATETIME_FORMAT_SQL)
        );
    }

    openModalBooking(day, room, register) {
        self.showModalBooking = true;
        if (register) {
            self.booking = {
                email: register.register_data.user.email,
                name: register.register_data.user.name,
                phone: register.register_data.user.phone,
                address: register.register_data.user.address,
                id: register.register_room_id,
                register_id: register.register_id,
                campaign_id: register.register_data.campaign_id,
                room: room,
                base_id: room.base.id,
                room_id: room.id,
                type: register.type,
                start_time: register.start.format(DATETIME_FORMAT),
                end_time: register.end.format(DATETIME_FORMAT),
                status: register.status,
                note: register.register_data.note,
                similar_room: register.register_data.similar_room
            };
        } else {
            self.booking = {
                room: room,
                base_id: room.base.id,
                room_id: room.id,
                start_time: day.add('9', 'hours').format(DATETIME_FORMAT),
                end_time: day.add('5', 'hours').format(DATETIME_FORMAT),
                status: "seed",
                similar_room: [room.id]
            };
        }
    }

    updateFormData = (event) => {
        const value = event.target.value;
        let booking = {...this.booking};
        const field = event.target.name;
        booking[field] = value;
        this.booking = booking;
    }

    createBookRoom = () => {
        setFormValidation("#form-book-room");
        if ($('#form-book-room').valid()) {
            const start_time = moment(this.booking.start_time, DATETIME_FORMAT).format("X");
            const end_time = moment(this.booking.end_time, DATETIME_FORMAT).format("X");
            if (start_time >= end_time) {
                showTypeNotification("Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc", "warning");
                return;
            }
            store.createRegister(this.booking, this.closeModalBooking);
        }
    }

    closeModalBooking = () => {
        this.showModalBooking = false;
    }

    colorBook(status) {
        switch (status) {
            case 'seed':
                return '#9b9b9b';
            case 'view':
                return '#ffaa00';
            case 'cancel':
                return '#ff4444';
            case 'done':
                return '#4caa00';
            default:
                return '#9b9b9b';
        }
    }

    changeSimilarRoom = (event, room) => {
        if (event.target.checked) {
            this.booking.similar_room = [...this.booking.similar_room, room.id];
        } else {
            this.booking.similar_room = this.booking.similar_room.filter((roomItem) => roomItem != room.id);
        }
    }

    render() {
        // const disableCreateRegister = !(this.props.user.base_id == store.selectedBaseId && this.props.user.base_id <= 0);
        const disableCreateRegister = false;
        return (
            <div>
                {store.isLoadingRooms || store.isLoadingRoomTypes || store.isLoadingBases ? (
                    <Loading/>
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-sm-4 col-xs-6">
                                <Select
                                    defaultMessage={"Chọn cơ sở"}
                                    options={store.basesData}
                                    value={store.selectedBaseId}
                                    onChange={this.onChangeBase}
                                />
                            </div>
                            <div className="col-sm-3 col-xs-3">
                                <Select
                                    defaultMessage={"Chọn loại phòng"}
                                    options={store.roomTypesData}
                                    value={store.selectedRoomTypeId}
                                    onChange={this.onChangeRoomType}
                                />
                            </div>
                            <div className="col-sm-3 col-xs-3">
                                <Select
                                    defaultMessage={"Chọn phòng"}
                                    options={store.roomsData}
                                    value={store.selectedRoomId}
                                    onChange={this.onChangeRoom}
                                />
                            </div>
                        </div>
                        {store.isLoading ? (
                            <Loading/>
                        ) : (

                            store.registerRooms &&
                            store.registerRooms.map((room, index) => {
                                const registers = room.register_rooms.map(register => {
                                    let startTime = moment(register.start_time, DATETIME_FORMAT_SQL);
                                    let endTime = moment(register.end_time, DATETIME_FORMAT_SQL);
                                    let startSecond = convertTimeToSecond(startTime.format("HH:mm"));
                                    let endSecond = convertTimeToSecond(endTime.format("HH:mm"));
                                    let time = convertTimeToSecond("14:00");
                                    let title = "";
                                    if (startTime.format("MM-DD") == endTime.format("MM-DD")) {
                                        if (startSecond <= time && time < endSecond) {
                                            title = "Cả ngày: ";
                                        } else if (startSecond <= time && endSecond <= time) {
                                            title = "Ca sáng: ";
                                        } else {
                                            title = "Ca tối: ";
                                        }
                                    }
                                    title += register.user.name;
                                    let color = this.colorBook(register.status);
                                    return {
                                        title: title,
                                        register_room_id: register.id,
                                        register_name: register.user.name,
                                        register_data: register,
                                        room: room.name,
                                        type: room.type.name,
                                        register_id: register.register_id,
                                        start: register.start_time,
                                        end: register.end_time,
                                        status: register.status,
                                        color: color,
                                        overlay: 1
                                    };
                                });

                                return (
                                    <div className="card" key={index}>
                                        <div className="card-content">
                                            <h4 className="card-title">
                                                <strong>{`Phòng ${room.name} - ${room.type.name} - ${
                                                    room.seats_count
                                                    } chỗ ngồi`}</strong>
                                            </h4>
                                            <div>{`Cơ sở ${room.base.name} - ${room.base.address}`}</div>
                                            <Calendar
                                                id={"room-calender-" + room.id}
                                                calendarEvents={registers}
                                                onDropTime={value => this.updateTime(value)}
                                                onClick={value => {
                                                    this.registerRoomSelected = {
                                                        id: value.register_id,
                                                        status: value.status,
                                                        register_name: value.register_name,
                                                        room: value.room,
                                                        type: value.type,
                                                        start_time: value.start.format(DATETIME_FORMAT),
                                                        end_time: value.end.format(DATETIME_FORMAT)
                                                    };
                                                    self.openModalBooking(null, room, value);
                                                }}
                                                onClickDay={day => {
                                                    if (disableCreateRegister) return;
                                                    self.openModalBooking(day, room);
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })

                        )}
                    </div>
                )}
                <Modal
                    show={this.showModalChangeStatus}
                    onHide={() => {
                        this.showModalChangeStatus = false;
                    }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.registerRoomSelected.register_name} phòng {this.registerRoomSelected.room}{" "}
                            loại {this.registerRoomSelected.type}
                        </Modal.Title>
                        <div>
                            Từ {this.registerRoomSelected.start_time} đến {this.registerRoomSelected.end_time}
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label className="label-control">Thay đổi trạng thái</label>
                            <ReactSelect
                                name="form-field-name"
                                value={this.registerRoomSelected.status}
                                options={STATUS_REGISTER_ROOM}
                                onChange={this.onChangeStatus}
                                placeholder="Chọn trang thái"
                                disabled={disableCreateRegister}
                            />
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.showModalBooking}
                    onHide={this.closeModalBooking}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.booking.room && this.booking.id == undefined
                                ? `Tạo đặt phòng ${this.booking.room.name} - ${this.booking.room.type.name}`
                                : ""}
                            {this.booking.id ? `${this.booking.name} đặt phòng ${this.booking.room.name} loại ${this.booking.type}` : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-book-room">
                            <FormInputText

                                label="Tên khách hàng"
                                name="name"
                                updateFormData={
                                    this.updateFormData
                                }
                                value={this.booking.name}
                                required
                                disabled={disableCreateRegister}
                            />
                            <FormInputText

                                label="Số điện thoại"
                                name="phone"
                                updateFormData={
                                    this.updateFormData
                                }
                                value={this.booking.phone}
                                required
                                disabled={disableCreateRegister}
                            />
                            <FormInputText

                                label="Email"
                                name="email"
                                updateFormData={
                                    this.updateFormData
                                }
                                value={this.booking.email}
                                required
                                type={'email'}
                                disabled={disableCreateRegister}
                            />
                            <FormInputText

                                label="Đại chỉ"
                                name="address"
                                updateFormData={
                                    this.updateFormData
                                }
                                value={this.booking.address}
                                disabled={disableCreateRegister}
                            />
                            <FormInputText

                                label="Ghi chú khách hàng"
                                name="note"
                                updateFormData={
                                    this.updateFormData
                                }
                                value={this.booking.note}
                                disabled={disableCreateRegister}
                            />
                            <FormInputDateTime
                                id={"booking-start-time"}
                                name="start_time"
                                updateFormData={this.updateFormData}
                                value={this.booking.start_time}
                                label={"Thời gian bắt đầu"}
                                disabled={disableCreateRegister}
                            />
                            <FormInputDateTime
                                id={"booking-end-time"}
                                name="end_time"
                                updateFormData={this.updateFormData}
                                value={this.booking.end_time}
                                label={"Thời gian kết thúc"}
                                disabled={disableCreateRegister}
                            />
                        </form>
                        <div className="form-group">
                            <label className="label-control">Trạng thái</label>
                            <ReactSelect
                                name="form-field-name"
                                value={this.booking.status}
                                options={STATUS_REGISTER_ROOM}
                                onChange={value => {
                                    this.booking.status = value.value;
                                }}
                                placeholder="Chọn trang thái"
                                disabled={disableCreateRegister}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-control">Chiến dich</label>
                            <ReactSelect
                                name="form-field-name"
                                value={this.booking.campaign_id}
                                options={store.campaignsData}
                                onChange={value => {
                                    let booking = {...this.booking};
                                    booking['campaign_id'] = value ? value.value : '';
                                    this.booking = booking;
                                }}
                                placeholder="Chọn trang thái"
                                disabled={disableCreateRegister}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-control">Ghép phòng</label>
                            <div className="row">

                                {this.booking.room && store.allRoomsSimilar(this.booking.room).map((room, index) => {
                                    const checked = this.booking.similar_room
                                        && (this.booking.similar_room.filter((roomItem) => roomItem == room.id).length > 0);
                                    return (
                                        <div className="col-md-4" key={index}>
                                            <Checkbox label={room.name} checked={checked} checkBoxLeft
                                                      disabled={disableCreateRegister}
                                                      onChange={(event) => this.changeSimilarRoom(event, room)}/>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                        {
                            !disableCreateRegister && <Button
                                onClick={this.createBookRoom}
                                label={"Lưu"}
                                labelLoading={"Đang lưu"}
                                className={"btn btn-rose"}
                                isLoading={store.isCreatingRegister}
                            />
                        }

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

DashboardTrongDongContainer.propTypes = {
    user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(DashboardTrongDongContainer);
