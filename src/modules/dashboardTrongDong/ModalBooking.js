import React from "react";
import FormInputText from "../../components/common/FormInputText";
import {KIND_REGISTER_ROOM, STATUS_REGISTER_ROOM} from "../../constants/constants";
import FormInputDateTime from "../../components/common/FormInputDateTime";
import store from "./dashboardStore";
import Checkbox from "../../components/common/Checkbox";
import Button from "../../components/common/Button";
import {Modal} from "react-bootstrap";
import {observer} from "mobx-react";
import {observable} from "mobx";
import ReactSelect from 'react-select';
import {loadUsers} from "./dashboardApi";

@observer
class ModalBooking extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.booking = {
            ...this.props.booking
        }
    }

    @observable selectedUser = {};
    @observable booking = {};

    updateFormData = (event) => {
        const value = event.target.value;
        let booking = {...this.booking};
        const field = event.target.name;
        booking[field] = value;
        this.booking = booking;
    };

    closeModalBooking = () => {
        self.booking = {};
        this.props.closeModalBooking();
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

    selectUser = (value) => {
        let booking = {...this.booking};
        booking.name = value.name;
        booking.email = value.email;
        booking.address = value.address;
        booking.phone = value.phone;
        this.booking = booking;
        this.selectedUser = value;
    };

    changeSimilarRoom = (event, room) => {
        if (event.target.checked) {
            this.booking.similar_room = [...this.booking.similar_room, room.id];
        } else {
            this.booking.similar_room = this.booking.similar_room.filter((roomItem) => roomItem != room.id);
        }
    };

    render() {
        return (
            <Modal show={this.props.showModalBooking} onHide={this.closeModalBooking}>
                <Modal.Header closeButton>
                    {this.booking.room ? (
                        <Modal.Title>
                            {this.booking.room && this.booking.id == undefined ? (
                                `Tạo đặt phòng ${this.booking.room.name} - ${this.booking.room.type.name}`
                            ) : (
                                ''
                            )}
                            {this.booking.id ? (
                                `${this.booking.name} đặt phòng ${this.props.similar_room_names} loại ${this.booking.type}`
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
                            disabled={this.props.disableCreateRegister}
                        />
                        <FormInputText
                            label="Số điện thoại"
                            name="phone"
                            updateFormData={this.updateFormData}
                            value={this.booking.phone}
                            required
                            disabled={this.props.disableCreateRegister}
                        />
                        <FormInputText
                            label="Địa chỉ"
                            name="address"
                            updateFormData={this.updateFormData}
                            value={this.booking.address}
                            disabled={this.props.disableCreateRegister}
                        />
                        <FormInputText
                            label="Email"
                            name="email"
                            updateFormData={this.updateFormData}
                            value={this.booking.email}
                            type={'email'}
                            disabled={this.props.disableCreateRegister}
                        />

                        <FormInputText
                            label="Số lượng khách"
                            name="number_person"
                            required
                            type={"number"}
                            updateFormData={this.updateFormData}
                            value={this.booking.number_person}
                            disabled={this.props.disableCreateRegister}
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
                                disabled={this.props.disableCreateRegister}
                            />
                        </div>
                        <FormInputDateTime
                            id={'booking-start-time'}
                            name="start_time"
                            updateFormData={this.updateFormData}
                            value={this.booking.start_time}
                            label={'Thời gian bắt đầu'}
                            disabled={this.props.disableCreateRegister}
                        />
                        <FormInputDateTime
                            id={'booking-end-time'}
                            name="end_time"
                            updateFormData={this.updateFormData}
                            value={this.booking.end_time}
                            label={'Thời gian kết thúc'}
                            disabled={this.props.disableCreateRegister}
                        />

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
                                disabled={this.props.disableCreateRegister}
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
                                disabled={this.props.disableCreateRegister}
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
                                                disabled={this.props.disableCreateRegister}
                                                onChange={(event) => this.changeSimilarRoom(event, room)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </form>
                    {!this.props.disableCreateRegister && (
                        <Button
                            onClick={() => this.props.createBookRoom(this.booking)}
                            label={'Lưu'}
                            labelLoading={'Đang lưu'}
                            className={'btn btn-rose'}
                            isLoading={this.props.isCreatingRegister}
                        />
                    )}
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalBooking;
