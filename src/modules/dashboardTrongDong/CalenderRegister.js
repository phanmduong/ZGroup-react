import React from "react";
import {
    DATETIME_FORMAT,
    DATETIME_FORMAT_SQL,
} from "../../constants/constants";
import moment from "moment";
import {convertTimeToSecond, showErrorNotification} from "../../helpers/helper";
import TooltipButton from "../../components/common/TooltipButton";
import Calendar from "./Calendar";
import store from "./dashboardStore";

class CalenderRegister extends React.Component {
    constructor(props, context) {
        super(props, context);
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

    render() {
        let {registers, disableCreateRegister, room} = this.props;
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
                                            onClick={this.props.openExportModal}
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
                            this.props.setRegisterRoomSelected({
                                id: value.register_id,
                                status: value.status,
                                register_name: value.register_name,
                                room: value.room,
                                type: value.type,
                                start_time: value.start && value.start.format(DATETIME_FORMAT),
                                end_time: value.end && value.end.format(DATETIME_FORMAT),
                                note: value.note,
                                kind: value.kind,
                            });
                            this.props.openModalBooking(null, room, value);
                        }}
                        onClickDay={(day) => {
                            if (disableCreateRegister) {
                                showErrorNotification("Không được phân quyền.");
                                return;
                            }
                            this.props.openModalBooking(day, room);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default CalenderRegister;
