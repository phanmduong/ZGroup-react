import React, {Component} from 'react';
import {observer} from 'mobx-react';
import {connect} from 'react-redux';
import store from './dashboardStore';
import Loading from '../../components/common/Loading';
import moment from 'moment';
import {
    DATETIME_FORMAT_SQL, DATETIME_FORMAT, STATUS_REGISTER_ROOM,
} from '../../constants/constants';
import {
    setFormValidation,
    showTypeNotification,
    appendJsonToWorkBook,
    saveWorkBookToExcel,
    newWorkBook,
    renderExcelColumnArray,
} from '../../helpers/helper';
import {observable} from 'mobx';
import {Modal} from 'react-bootstrap';
import ReactSelect from 'react-select';
import PropTypes from 'prop-types';
import Button from '../../components/common/Button';
import FormInputDateTime from '../../components/common/FormInputDateTime';

import ModalBooking from "./ModalBooking";
import {removeObservable} from "../../helpers/entity/mobx";
import CalenderRegister from "./CalenderRegister";

@observer
class DashboardTrongDongContainer extends Component {
    constructor(props) {
        super(props);
        this.onChangeBase = this.onChangeBase.bind(this);
        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onChangeRoomType = this.onChangeRoomType.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
    }

    componentWillMount() {
        store.selectedBaseId = this.props.user.base_id > 0 ? this.props.user.base_id : 8;
        store.loadBases();
        store.loadRooms();
        store.loadRoomTypes();
        store.loadDashboard();
        store.loadCampaigns();
    }

    @observable showModalChangeStatus = false;
    @observable showModalBooking = false;
    @observable registerRoomSelected = {};
    @observable disableCreateRegister = false;
    @observable excelModal = false;
    @observable isExporting = false;
    @observable excelStartTime = null;
    @observable excelEndTime = null;
    @observable booking = {};

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

    setRegisterRoomSelected = (registerRoomSelected) => {
        this.registerRoomSelected = registerRoomSelected
    }

    openModalBooking = (day, room, register) => {

        if (register) {
            this.booking = {
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
            this.booking = {
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
        this.showModalBooking = true;
    }


    createBookRoom = (booking) => {
        setFormValidation('#form-book-room');
        if ($('#form-book-room').valid()) {
            const start_time = moment(booking.start_time, DATETIME_FORMAT).format('X');
            const end_time = moment(booking.end_time, DATETIME_FORMAT).format('X');
            if (start_time >= end_time) {
                showTypeNotification('Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc', 'warning');
                return;
            }
            store.createRegister(booking, this.closeModalBooking);
        }
    };

    closeModalBooking = () => {
        this.showModalBooking = false;
    };


    openExportModal = () => {
        this.excelModal = true;
        this.excelStartTime = null;
        this.excelEndTime = null;
    };

    closeExcelModal = () => {
        this.excelModal = false;
    };


    updateFormDate = (event) => {
        const field = event.target.name;
        this[field] = event.target.value;
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

    export = () => {
        this.isExporting = true;
        let data = store.registerMergeRooms;

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
        });

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
                            <CalenderRegister registers={store.registerMergeRooms}
                                              disableCreateRegister={disableCreateRegister}
                                              openModalBooking={this.openModalBooking}
                                              setRegisterRoomSelected={this.setRegisterRoomSelected}
                                              openExportModal={this.openExportModal}
                            />
                        ) : (
                            store.registerRooms.map((room) => {
                                return (
                                    <CalenderRegister registers={store.registerMergeRooms}
                                                      disableCreateRegister={disableCreateRegister}
                                                      room={room}
                                                      openModalBooking={this.openModalBooking}
                                                      setRegisterRoomSelected={this.setRegisterRoomSelected}
                                                      openExportModal={this.openExportModal}
                                    />
                                )
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
                {this.showModalBooking && <ModalBooking
                    showModalBooking={this.showModalBooking}
                    similar_room_names={similar_room_names}
                    disableCreateRegister={disableCreateRegister}
                    isCreatingRegister={store.isCreatingRegister}
                    closeModalBooking={this.closeModalBooking}
                    createBookRoom={this.createBookRoom}
                    booking={removeObservable(this.booking)}
                ></ModalBooking>}


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
