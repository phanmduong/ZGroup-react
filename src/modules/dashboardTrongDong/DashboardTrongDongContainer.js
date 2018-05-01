import React, { Component } from "react";
import { observer } from "mobx-react";
import { connect } from "react-redux";
import store from "./dashboardStore";
import Loading from "../../components/common/Loading";
import Select from "../../components/common/Select";
import Calendar from "../../components/common/Calendar";
import moment from "moment";
import { DATETIME_FORMAT_SQL, DATETIME_FORMAT, STATUS_REGISTER_ROOM } from "../../constants/constants";
import { convertTimeToSecond } from "../../helpers/helper";
import { observable } from "mobx";
import { Modal } from "react-bootstrap";
import ReactSelect from "react-select";
import PropTypes from 'prop-types';

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
            value.register_room_id,
            value.start.format(DATETIME_FORMAT_SQL),
            value.end.format(DATETIME_FORMAT_SQL)
        );
    }

    openModalBooking(day, room) {
        self.showModalBooking = true;
        self.booking = {
            room: room,
            startTime: day.format(DATETIME_FORMAT),
            endTime: day.format(DATETIME_FORMAT),
            status: "view"
        };
    }

    render() {
        return (
            <div>
                {store.isLoadingRooms || store.isLoadingRoomTypes || store.isLoadingBases ? (
                    <Loading />
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
                                <Loading />
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
                                            let color =
                                                register.status == "view"
                                                    ? "#4caa00"
                                                    : register.status == "cancel"
                                                        ? "#9b9b9b"
                                                        : "#ff4444";
                                            return {
                                                title: title,
                                                register_room_id: register.id,
                                                register_name: register.user.name,
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
                                                            this.showModalChangeStatus = true;
                                                        }}
                                                        onClickDay={day => {
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
                            />
                        </div>
                    </Modal.Body>
                </Modal>
                <Modal
                    show={this.showModalBooking}
                    onHide={() => {
                        this.showModalBooking = false;
                    }}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.booking.room
                                ? `Tạo book phòng ${this.booking.room.name} - ${this.booking.room.type.name}`
                                : ""}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label className="label-control">Thay đổi trạng thái</label>
                            <ReactSelect
                                name="form-field-name"
                                value={this.booking.status}
                                options={STATUS_REGISTER_ROOM}
                                onChange={value => {
                                    this.booking.status = value.value;
                                }}
                                placeholder="Chọn trang thái"
                            />
                        </div>
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
