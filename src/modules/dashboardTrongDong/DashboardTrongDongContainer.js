import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {connect} from 'react-redux';
import store from './dashboardStore';
import Loading from '../../components/common/Loading';
// import Select from '../../components/common/Select';
import Calendar from './Calendar';
import moment from 'moment';
import {
    DATETIME_FORMAT_SQL, DATETIME_FORMAT, STATUS_REGISTER_ROOM,
    KIND_REGISTER_ROOM
} from '../../constants/constants';
import {
    convertTimeToSecond,
    setFormValidation,
    showTypeNotification,
    appendJsonToWorkBook,
    saveWorkBookToExcel,
    newWorkBook,
    renderExcelColumnArray, showErrorNotification
} from '../../helpers/helper';
import {observable} from 'mobx';
import {Modal} from 'react-bootstrap';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import FormInputText from '../../components/common/FormInputText';
import Button from '../../components/common/Button';
import FormInputDateTime from '../../components/common/FormInputDateTime';
import Checkbox from '../../components/common/Checkbox';
import {loadUsers} from './dashboardApi';
import TooltipButton from '../../components/common/TooltipButton';

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
        store.selectedBaseId = this.props.user.base_id;
        store.loadBases();
        store.loadRooms();
        store.loadRoomTypes();
        store.loadDashboard();
        store.loadCampaigns();
    }

    @observable showModalChangeStatus = false;
    @observable showModalBooking = false;
    @observable booking = {};
    @observable registerRoomSelected = {};
    @observable disableCreateRegister = false;
    @observable selectedUser = {};
    @observable excelModal = false;
    @observable isExporting = false;
    @observable excelStartTime = null;
    @observable excelEndTime = null;

    onChangeRoom(value) {
        store.selectedRoomId = value ? value.value : 0;
        store.loadDashboard();
    }

    onChangeBase(value) {
        store.selectedBaseId = value ? value.value : 0;
        store.selectedRoomTypeId = 0;
        store.selectedRoomId = 0;
        store.loadDashboard();
    }

    onChangeRoomType(value) {
        store.selectedRoomTypeId = value ? value.value : 0;
        store.loadDashboard();
    }

    onChangeStatus(value) {
        this.registerRoomSelected.status = value.value;
        store.changeStatus(this.registerRoomSelected.id, this.registerRoomSelected.status);
    }

    updateTime(value) {
        store.changeTime(
            value.register_id,
            value.start && value.start.format(DATETIME_FORMAT_SQL),
            value.end && value.end.format(DATETIME_FORMAT_SQL)
        );
    }

    openModalBooking(day, room, register) {
        self.showModalBooking = true;
        self.selectedUser = {};
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
                base_id: room && room.base ? room.base.id : '',
                room_id: room ? room.id : '',
                type: register.type,
                start_time: register.start && register.start.format(DATETIME_FORMAT),
                end_time: register.end && register.end.format(DATETIME_FORMAT),
                status: register.status,
                note: register.register_data.note,
                kind: register.register_data.kind,
                number_person: register.register_data.number_person,
                similar_room: register.register_data.similar_room
            };
        } else {
            self.booking = {
                room: room,
                base_id: room && room.base ? room.base.id : '',
                room_id: room ? room.id : '',
                start_time: day.add('9', 'hours').format(DATETIME_FORMAT),
                end_time: day.add('5', 'hours').format(DATETIME_FORMAT),
                status: 'seed',
                kind: '',
                similar_room: room ? [room.id] : [],
                note: '',
            };
        }
    }

    updateFormData = (event) => {
        const value = event.target.value;
        let booking = {...this.booking};
        const field = event.target.name;
        booking[field] = value;
        this.booking = booking;
    };

    createBookRoom = () => {
        setFormValidation('#form-book-room');
        if ($('#form-book-room').valid()) {
            const start_time = moment(this.booking.start_time, DATETIME_FORMAT).format('X');
            const end_time = moment(this.booking.end_time, DATETIME_FORMAT).format('X');
            if (start_time >= end_time) {
                showTypeNotification('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc', 'warning');
                return;
            }
            store.createRegister(this.booking, this.closeModalBooking);
        }
    };

    closeModalBooking = () => {
        this.showModalBooking = false;
        self.booking = {};
    };

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
    };

    loadUsers = (input, callback) => {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                loadUsers(input).then((res) => {
                    let users = res.data.data.users.map((user) => {
                        return {
                            ...user,
                            ...{
                                value: user.id,
                                label: user.name + ` (${user.phone})`
                            }
                        };
                    });
                    callback(null, {options: users, complete: true});
                });
            }.bind(this),
            500
        );
    };

    openExportModal = () => {
        this.excelModal = true;
        this.excelStartTime = null;
        this.excelEndTime = null;
    };

    closeExcelModal = () => {
        this.excelModal = false;
    };

    getTextRoom(similar_room) {
        let text = '';
        store.rooms.map((room) => {
            const arrRooms = similar_room.filter((room_id) => room.id == room_id);
            if (arrRooms.length > 0) {
                text += room.name + ', ';
            }
        });

        text = text.substr(0, text.length - 2);
        return text;
    }

    renderCalendar(registers, disableCreateRegister, room) {
        let registersData = registers.map((register) => {
            let startTime = moment(register.start_time, DATETIME_FORMAT_SQL);
            let endTime = moment(register.end_time, DATETIME_FORMAT_SQL);
            let startSecond = convertTimeToSecond(startTime.format('HH:mm'));
            let endSecond = convertTimeToSecond(endTime.format('HH:mm'));
            let time = convertTimeToSecond('14:00');
            let title = '';
            if (startTime.format('MM-DD') == endTime.format('MM-DD')) {
                if (startSecond <= time && time < endSecond) {
                    title = 'Cả ngày: ';
                } else if (startSecond <= time && endSecond <= time) {
                    title = 'Ca sáng: ';
                } else {
                    title = 'Ca tối: ';
                }
            }
            title += register.user ? register.user.name : '';

            if (register.similar_room) {
                title += ' (Phòng: ';

                title += this.getTextRoom(register.similar_room);

                title += ')';
            }

            if (register.kind) {
                title += `(Hình thức: ${register.kind})`;
            }
            if (register.number_person) {
                title += `(SLK: ${register.number_person})`;
            }

            let color = this.colorBook(register.status);
            return {
                title: title,
                register_room_id: register.id,
                register_name: register.user ? register.user.name : '',
                register_data: register,
                room: room ? room.name : null,
                type: room && room.type ? room.type.name : null,
                register_id: register.register_id,
                start: register.start_time, // "2018-05-24 09:00:00"
                end: register.end_time,
                status: register.status,
                color: color,
                overlay: 1,
                number_person: register.number_person,
                phone: register.user && register.user.phone,
                note: register.note,
            };
        });

        // console.log(registersData,"ssssssssssss");


        return (
            <div className="card" key={room ? room.id : ''}>
                <div className="card-content">
                    {room ? (
                        <div>
                            <h4 className="card-title">
                                <strong>{`Phòng ${room.name} - ${room.type
                                    .name} - ${room.seats_count} chỗ ngồi`}</strong>
                            </h4>
                            <div>{`Cơ sở ${room.base.name} - ${room.base.address}`}</div>
                        </div>
                    ) : (
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                            <div className="flex-row flex">
                                <h4 className="card-title">
                                    <strong>Lịch đặt phòng</strong>
                                </h4>
                            </div>
                            <div className="flex-end">
                                <div>
                                    <TooltipButton text="Xuất thành file excel" placement="top">
                                        <button
                                            className="btn btn-rose"
                                            onClick={this.openExportModal}
                                            style={{
                                                borderRadius: 30,
                                                padding: '0px 11px',
                                                margin: '-1px 10px',
                                                minWidth: 25,
                                                height: 25,
                                                width: '55%'
                                            }}
                                        >
                                            <i
                                                className="material-icons"
                                                style={{height: 5, width: 5, marginLeft: -11, marginTop: -10}}
                                            >
                                                file_download
                                            </i>
                                        </button>
                                    </TooltipButton>
                                </div>
                            </div>
                        </div>
                    )}
                    <Calendar
                        id={'room-calender-' + (room ? room.id : '')}
                        calendarEvents={registersData}
                        onDropTime={(value) => this.updateTime(value)}
                        onClick={(value) => {
                            if (disableCreateRegister) {
                                showErrorNotification("Không được phân quyền.");
                                return;
                            }
                            this.registerRoomSelected = {
                                id: value.register_id,
                                status: value.status,
                                register_name: value.register_name,
                                room: value.room,
                                type: value.type,
                                start_time: value.start && value.start.format(DATETIME_FORMAT),
                                end_time: value.end && value.end.format(DATETIME_FORMAT),
                                note: value.note,
                                kind: value.kind,
                            };
                            self.openModalBooking(null, room, value);
                        }}
                        onClickDay={(day) => {
                            if (disableCreateRegister) {
                                showErrorNotification("Không được phân quyền.");
                                return;
                            }
                            self.openModalBooking(day, room);
                        }}
                    />
                </div>
            </div>
        );
    }

    selectUser = (value) => {
        let booking = {...this.booking};
        booking.name = value.name;
        booking.email = value.email;
        booking.address = value.address;
        booking.phone = value.phone;
        this.booking = booking;
        this.selectedUser = value;
    };

    updateFormDate = (event) => {
        const field = event.target.name;
        this[field] = event.target.value;
    };

    export = () => {
        this.isExporting = true;
        let data = store.registerMergeRooms();

        if (this.excelStartTime) {
            data = data.filter((register) => new Date(register.start_time) >= new Date(this.excelStartTime));
        }
        if (this.excelEndTime) {
            data = data.filter((register) => new Date(register.end_time) <= new Date(this.excelEndTime));
        }
        let wb = newWorkBook();
        let cols = renderExcelColumnArray([5, 35, 20, 20, 30, 25, 25, 25, 15, 20]); //độ rộng cột

        data = data.reverse().map((item, index) => {
            /* eslint-disable */
            const time = moment(item.start_time, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT) + ' - ' +
                moment(item.end_time, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT);
            let res = {
                STT: index + 1,
                'Thời gian': time,
                'Khách hàng': item.user.name || '',
                'Số điện thoại': item.user.phone || '',
                'Địa chỉ': item.user.address || '',
                Email: item.user.email || '',
                "Phòng": this.getTextRoom(item.similar_room),
                'Ghi chú': item.note || '',
                'Hình thức tiệc': item.kind || '',
                'Số lượng khách ': item.number_person || '',
                'Trạng thái': STATUS_REGISTER_ROOM.filter((sta) => sta.value === item.status)[0].label,
                'Chiến dịch': store.campaignsData.filter((cam) => cam.value === item.campaign_id)[0]
                    ? store.campaignsData.filter((cam) => cam.value === item.campaign_id)[0].label
                    : ''
            };
            /* eslint-enable */
            return res;
        });
        appendJsonToWorkBook(data, wb, 'Danh sách đặt phòng', cols);
        //end điểm danh

        //xuất file
        saveWorkBookToExcel(wb, 'Danh sách đặt phòng');

        this.excelModal = false;
        this.isExporting = false;
    };

    render() {
        // const disableCreateRegister = !(this.props.user.base_id == store.selectedBaseId && this.props.user.base_id <= 0);
        const disableCreateRegister =
            (this.props.route && this.props.route.path === '/dashboard/view-register') ||
            !(this.props.user.base_id == store.selectedBaseId || this.props.user.base_id <= 0);

        const similar_rooms = store.allRoomsSimilar(this.booking.room).filter((room) => {
            const checked =
                this.booking.similar_room &&
                this.booking.similar_room.filter((roomItem) => roomItem == room.id).length > 0;
            return checked;
        });

        similar_rooms.push(this.booking.room);

        let similar_room_names = '';

        similar_rooms.forEach((room) => {
            if (room) {
                similar_room_names += room.name + ", ";
            }
        })

        return (
            <div>
                {store.isLoadingRooms || store.isLoadingRoomTypes || store.isLoadingBases ? (
                    <Loading/>
                ) : (
                    <div>
                        <div className="row">
                            <div className="col-sm-4 col-xs-5">

                                <ReactSelect
                                    defaultMessage={'Chọn cơ sở'}
                                    options={store.basesData}
                                    value={store.selectedBaseId}
                                    onChange={this.onChangeBase}
                                    disabled={store.isLoading}
                                    name="filter_base"
                                    className="zindex-1000"

                                />
                            </div>
                            <div className="col-sm-4 col-xs-3">
                                <ReactSelect
                                    defaultMessage={'Chọn loại phòng'}
                                    options={store.roomTypesData}
                                    value={store.selectedRoomTypeId}
                                    onChange={this.onChangeRoomType}
                                    disabled={store.isLoading}
                                    className="zindex-1000"
                                    name="filter_room_type"
                                />
                            </div>
                            <div className="col-sm-4 col-xs-4">
                                <ReactSelect
                                    defaultMessage={'Chọn phòng'}
                                    options={store.roomsData}
                                    value={store.selectedRoomId}
                                    onChange={this.onChangeRoom}
                                    disabled={store.isLoading}
                                    name="filter_room"
                                    className="zindex-1000"
                                />
                            </div>
                        </div>
                        {store.isLoading ? (
                            <Loading/>
                        ) : store.registerRooms && store.selectedRoomId == 0 ? (
                            this.renderCalendar(store.registerMergeRooms(), disableCreateRegister)
                        ) : (
                            store.registerRooms.map((room) => {
                                return this.renderCalendar(store.registerMergeRooms(), disableCreateRegister, room);
                            })
                        )}
                    </div>
                )}
                <Modal
                    show={this.showModalChangeStatus}
                    onHide={() => {
                        this.showModalChangeStatus = false;
                    }}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.registerRoomSelected.register_name} phòng {this.registerRoomSelected.room} loại{' '}
                            {this.registerRoomSelected.type}
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
                {/*<Modal show={this.showModalBooking} onHide={this.closeModalBooking}>*/}
                {/*<Modal.Header closeButton>*/}
                {/*{this.booking.room ? (*/}
                {/*<Modal.Title>*/}
                {/*{this.booking.room && this.booking.id == undefined ? (*/}
                {/*`Tạo đặt phòng ${this.booking.room.name} - ${this.booking.room.type.name}`*/}
                {/*) : (*/}
                {/*''*/}
                {/*)}*/}
                {/*{this.booking.id ? (*/}
                {/*`${this.booking.name} đặt phòng ${this.booking.room.name} loại ${this.booking.type}`*/}
                {/*) : (*/}
                {/*''*/}
                {/*)}*/}
                {/*</Modal.Title>*/}
                {/*) : (*/}
                {/*<Modal.Title>*/}
                {/*{this.booking.id == undefined ? 'Tạo đặt phòng' : 'Sửa đặt phòng'}*/}
                {/*</Modal.Title>*/}
                {/*)}*/}
                {/*</Modal.Header>*/}
                {/*<Modal.Body>*/}
                {/*<form id="form-book-room">*/}
                {/*{this.booking.id ? (*/}
                {/*<div/>*/}
                {/*) : (*/}
                {/*<div className="form-group">*/}
                {/*<label className="label-control">Tìm khách hàng</label>*/}
                {/*<ReactSelect.Async*/}
                {/*loadOptions={this.loadUsers}*/}
                {/*loadingPlaceholder="Đang tải..."*/}
                {/*placeholder="Chọn nhà cung cấp"*/}
                {/*searchPromptText="Không có dữ liệu"*/}
                {/*onChange={this.selectUser}*/}
                {/*value={this.selectedUser}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*)}*/}
                {/*<FormInputText*/}
                {/*label="Tên khách hàng"*/}
                {/*name="name"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.name}*/}
                {/*required*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*<FormInputText*/}
                {/*label="Số điện thoại"*/}
                {/*name="phone"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.phone}*/}
                {/*required*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*<FormInputText*/}
                {/*label="Địa chỉ"*/}
                {/*name="address"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.address}*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*<FormInputText*/}
                {/*label="Email"*/}
                {/*name="email"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.email}*/}
                {/*type={'email'}*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}

                {/*<FormInputText*/}
                {/*label="Ghi chú khách hàng"*/}
                {/*name="note"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.note}*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*<FormInputDateTime*/}
                {/*id={'booking-start-time'}*/}
                {/*name="start_time"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.start_time}*/}
                {/*label={'Thời gian bắt đầu'}*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*<FormInputDateTime*/}
                {/*id={'booking-end-time'}*/}
                {/*name="end_time"*/}
                {/*updateFormData={this.updateFormData}*/}
                {/*value={this.booking.end_time}*/}
                {/*label={'Thời gian kết thúc'}*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*</form>*/}
                {/*<div className="form-group">*/}
                {/*<label className="label-control">Trạng thái</label>*/}
                {/*<ReactSelect*/}
                {/*name="form-field-name"*/}
                {/*value={this.booking.status}*/}
                {/*options={STATUS_REGISTER_ROOM}*/}
                {/*onChange={(value) => {*/}
                {/*this.booking.status = value.value;*/}
                {/*}}*/}
                {/*placeholder="Chọn trang thái"*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                {/*<label className="label-control">Chiến dich</label>*/}
                {/*<ReactSelect*/}
                {/*name="form-field-name"*/}
                {/*value={this.booking.campaign_id}*/}
                {/*options={store.campaignsData}*/}
                {/*onChange={(value) => {*/}
                {/*let booking = {...this.booking};*/}
                {/*booking['campaign_id'] = value ? value.value : '';*/}
                {/*this.booking = booking;*/}
                {/*}}*/}
                {/*placeholder="Chọn trang thái"*/}
                {/*disabled={disableCreateRegister}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*<div className="form-group">*/}
                {/*<label className="label-control">Ghép phòng</label>*/}
                {/*<div className="row">*/}
                {/*{store.allRoomsSimilar(this.booking.room).map((room, index) => {*/}
                {/*const checked =*/}
                {/*this.booking.similar_room &&*/}
                {/*this.booking.similar_room.filter((roomItem) => roomItem == room.id).length > 0;*/}
                {/*return (*/}
                {/*<div className="col-md-4" key={index}>*/}
                {/*<Checkbox*/}
                {/*label={room.name}*/}
                {/*checked={checked}*/}
                {/*checkBoxLeft*/}
                {/*disabled={disableCreateRegister}*/}
                {/*onChange={(event) => this.changeSimilarRoom(event, room)}*/}
                {/*/>*/}
                {/*</div>*/}
                {/*);*/}
                {/*})}*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*{!disableCreateRegister && (*/}
                {/*<Button*/}
                {/*onClick={this.createBookRoom}*/}
                {/*label={'Lưu'}*/}
                {/*labelLoading={'Đang lưu'}*/}
                {/*className={'btn btn-rose'}*/}s
                {/*isLoading={store.isCreatingRegister}*/}
                {/*/>*/}
                {/*)}*/}
                {/*</Modal.Body>*/}
                {/*</Modal>*/}
                <Modal show={this.showModalBooking} onHide={this.closeModalBooking}>
                    <Modal.Header closeButton>
                        {this.booking.room ? (
                            <Modal.Title>
                                {this.booking.room && this.booking.id == undefined ? (
                                    `Tạo đặt phòng ${this.booking.room.name} - ${this.booking.room.type.name}`
                                ) : (
                                    ''
                                )}
                                {this.booking.id ? (
                                    `${this.booking.name} đặt phòng ${similar_room_names} loại ${this.booking.type}`
                                ) : (
                                    ''
                                )}
                            </Modal.Title>
                        ) : (
                            <Modal.Title>
                                {this.booking.id == undefined ? 'Tạo đặt phòng' : 'Sửa đặt phòng'}
                            </Modal.Title>
                        )}
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-book-room">
                            {this.booking.id ? (
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
                                        value={this.selectedUser}
                                    />
                                </div>
                            )}
                            <FormInputText
                                label="Tên khách hàng"
                                name="name"
                                updateFormData={this.updateFormData}
                                value={this.booking.name}
                                required
                                disabled={disableCreateRegister}
                            />
                            <FormInputText
                                label="Số điện thoại"
                                name="phone"
                                updateFormData={this.updateFormData}
                                value={this.booking.phone}
                                required
                                disabled={disableCreateRegister}
                            />
                            <FormInputText
                                label="Địa chỉ"
                                name="address"
                                updateFormData={this.updateFormData}
                                value={this.booking.address}
                                disabled={disableCreateRegister}
                            />
                            <FormInputText
                                label="Email"
                                name="email"
                                updateFormData={this.updateFormData}
                                value={this.booking.email}
                                type={'email'}
                                disabled={disableCreateRegister}
                            />

                            <FormInputText
                                label="Số lượng khách"
                                name="number_person"
                                updateFormData={this.updateFormData}
                                value={this.booking.number_person}
                                disabled={disableCreateRegister}
                            />

                            <div className="form-group">
                                <label className="label-control">Hình thức tiệc</label>
                                <ReactSelect
                                    name="form-field-name"
                                    value={this.booking.kind}
                                    options={KIND_REGISTER_ROOM}
                                    onChange={(value) => {
                                        this.booking.kind = value.value;
                                    }}
                                    placeholder="Chọn hình thức tiệc"
                                    disabled={disableCreateRegister}
                                />
                            </div>
                            <FormInputDateTime
                                id={'booking-start-time'}
                                name="start_time"
                                updateFormData={this.updateFormData}
                                value={this.booking.start_time}
                                label={'Thời gian bắt đầu'}
                                disabled={disableCreateRegister}
                            />
                            <FormInputDateTime
                                id={'booking-end-time'}
                                name="end_time"
                                updateFormData={this.updateFormData}
                                value={this.booking.end_time}
                                label={'Thời gian kết thúc'}
                                disabled={disableCreateRegister}
                            />
                        </form>
                        <div className="form-group">
                            <label className="label-control">Trạng thái</label>
                            <ReactSelect
                                name="form-field-name"
                                value={this.booking.status}
                                options={STATUS_REGISTER_ROOM}
                                onChange={(value) => {
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
                                onChange={(value) => {
                                    let booking = {...this.booking};
                                    booking['campaign_id'] = value ? value.value : '';
                                    this.booking = booking;
                                }}
                                placeholder="Chọn trang thái"
                                disabled={disableCreateRegister}
                            />
                        </div>
                        <div className="form-group">
                            <label className="label-control">Ghi chú </label>
                            <textarea type="text" className="form-control"
                                      rows={5}
                                      value={this.booking && this.booking.note}
                                      name="note"
                                      onChange={this.updateFormData}/>
                            <span className="material-input"/>
                        </div>
                        <div className="form-group">
                            <label className="label-control">Ghép phòng</label>
                            <div className="row">
                                {store.allRoomsSimilar(this.booking.room).map((room, index) => {
                                    const checked =
                                        this.booking.similar_room &&
                                        this.booking.similar_room.filter((roomItem) => roomItem == room.id).length > 0;
                                    return (
                                        <div className="col-md-4" key={index}>
                                            <Checkbox
                                                label={room.name}
                                                checked={checked}
                                                checkBoxLeft
                                                disabled={disableCreateRegister}
                                                onChange={(event) => this.changeSimilarRoom(event, room)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {!disableCreateRegister && (
                            <Button
                                onClick={this.createBookRoom}
                                label={'Lưu'}
                                labelLoading={'Đang lưu'}
                                className={'btn btn-rose'}
                                isLoading={store.isCreatingRegister}
                            />
                        )}
                    </Modal.Body>
                </Modal>

                <Modal show={this.excelModal} onHide={this.closeExcelModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chọn khoảng thời gian để xuất Excel</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-book-room">
                            <FormInputDateTime
                                id={'booking-start-time'}
                                name="excelStartTime"
                                updateFormData={this.updateFormDate}
                                value={this.excelStartTime}
                                label={'Thời gian bắt đầu'}
                                maxDate={this.excelEndTime}
                                format={DATETIME_FORMAT_SQL}
                            />
                            <FormInputDateTime
                                id={'booking-end-time'}
                                name="excelEndTime"
                                updateFormData={this.updateFormDate}
                                value={this.excelEndTime}
                                label={'Thời gian kết thúc'}
                                minDate={this.excelStartTime}
                                format={DATETIME_FORMAT_SQL}
                            />
                        </form>
                        {!disableCreateRegister && (
                            <Button
                                onClick={this.export}
                                label={'Xuất excel'}
                                labelLoading={'Đang xuất'}
                                className={'btn btn-rose'}
                                isLoading={this.isExporting}
                            />
                        )}
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

DashboardTrongDongContainer.propTypes = {
    user: PropTypes.object.isRequired,
    route: PropTypes.object
};

function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

export default connect(mapStateToProps)(DashboardTrongDongContainer);
