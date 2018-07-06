import React from 'react';
import { Modal } from 'react-bootstrap';
import FormInputDateTime from "../../components/common/FormInputDateTime";
// import Select from "react-select";
import ReactSelect from "react-select";
import Button from "../../components/common/Button";
import FormInputText from '../../components/common/FormInputText';
import {
    setFormValidation,
    isEmptyInput,
    showErrorNotification,
    confirm,
} from "../../helpers/helper";
import {DATETIME_FORMAT_SQL, KIND_REGISTER_ROOM, STATUS_REGISTER_ROOM} from "../../constants/constants";
//import moment from "moment";
import {store} from './roomStore';
import { observer } from "mobx-react";
import {loadUsers} from "./roomApi";
import Checkbox from "../../components/common/Checkbox";

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


@observer
class AddRegisterModal extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    componentWillMount() {
        setFormValidation('#form-book-room');
    }

    updateFormData = (name, value) => {
        store.createData[name] = value;
    }

    formTextChange = (e) => {
        let { name, value } = e.target;
        this.updateFormData(name, value);
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

    checkFormValid = () => {
        if ($('#form-book-room').valid()) {
            if (isEmptyInput(store.createData.start_time)) {
                showErrorNotification('Bạn chưa chọn ngày bắt đầu');
                return false;
            }
            if (isEmptyInput(store.createData.end_time)) {
                showErrorNotification('Bạn chưa chọn ngày kết thúc');
                return false;
            }
            if (isEmptyInput(store.createData.room_id)) {
                showErrorNotification('Bạn chưa chọn phòng');
                return false;
            }
            if (isEmptyInput(store.createData.base_id)) {
                showErrorNotification('Bạn chưa chọn cơ sở');
                return false;
            }
            if (isEmptyInput(store.createData.campaign_id)) {
                showErrorNotification('Bạn chưa chọn chiến dịch');
                return false;
            }
        }
        return true;
    }

    onSubmit = () => {
        if (this.checkFormValid()) {
            store.submitBooking();
        }
    }

    selectUser = value => {
        let createData = { ...store.createData };
        createData.name = value.name;
        createData.email = value.email;
        createData.address = value.address;
        createData.phone = value.phone;
        createData.selectedUser = value;
        store.createData = createData;
    };

    exit = ()=> {
        confirm(
            "warning", "Cảnh báo", "Bạn có chắc muốn thoát? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                store.showCreateModal = false;
                store.createData = {};
            },
        ); 
    }

    changeSimilarRoom = (event, room) => {
        let register = { ...store.createData };

        if (event.target.checked) {
            if(register.similar_room) {
                register['similar_room'] = [...register.similar_room, room.id];
            }
            else{
                register['similar_room'] = [room.id];
            }
        } else {
            register['similar_room'] = register && register.similar_room.filter(
                roomItem => roomItem != room.id
            );
        }
        store.createData = register;
    };

    createBookRoom = () => {
        setFormValidation("#form-book-room");
        if ($("#form-book-room").valid()) {
            // const start_time = moment(
            //     store.createData.start_time,
            //     DATETIME_FORMAT
            // ).format("X");
            // const end_time = moment(store.createData.end_time, DATETIME_FORMAT).format(
            //     "X"
            // );
            // if (start_time >= end_time) {
            //     showTypeNotification(
            //         "Thời gian bắt đầu phải nhỏ hơn thời gian kết thúc",
            //         "warning"
            //     );
            //     return;
            // }
            store.submitBooking(store.createData);
        }
    };


    render() {

        let { 
            createData, 
            showCreateModal,
            campaignData,
            rooms,
            filter,
            disableCreateRegister,
            isBooking,
        } = store;
        // console.log(createData,
        //     showCreateModal,
        //     campaignData,
        //     rooms,
        //     filter,
        //     disableCreateRegister,
        //     isBooking,);
        return (
            <div>
                <Modal
                    show={showCreateModal}
                    bsStyle="primary"
                    onHide={this.exit}
                >
                    <Modal.Header><h4 className="card-title"><b>Đăng kí phòng</b></h4></Modal.Header>
                    <Modal.Body>


                        <div>
                            <form id="form-book-room">
                                {createData.id ? (
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
                                            value={createData.selectedUser}
                                            // disabled = {disableCreateRegister}
                                        />
                                    </div>
                                )}
                                <FormInputText
                                    label="Tên khách hàng"
                                    name="name"
                                    updateFormData={this.formTextChange}
                                    value={createData.name}
                                    required
                                    disabled={disableCreateRegister}
                                />
                                <FormInputText
                                    label="Số điện thoại"
                                    name="phone"
                                    updateFormData={this.formTextChange}
                                    value={createData.phone}
                                    required
                                    disabled={disableCreateRegister}
                                />
                                <FormInputText
                                    label="Địa chỉ"
                                    name="address"
                                    updateFormData={this.formTextChange}
                                    value={createData.address}
                                    disabled={disableCreateRegister}
                                />
                                <FormInputText
                                    label="Email"
                                    name="email"
                                    updateFormData={this.formTextChange}
                                    value={createData.email}
                                    type={"email"}
                                    disabled={disableCreateRegister}
                                />

                                <FormInputText
                                    label="Số lượng khách"
                                    name="number_person"
                                    updateFormData={this.formTextChange}
                                    value={createData.number_person}
                                    disabled={disableCreateRegister}
                                />

                                <div className="form-group">
                                    <label className="label-control">Hình thức tiệc</label>
                                    <ReactSelect
                                        name="form-field-name"
                                        value={createData.kind}
                                        options={KIND_REGISTER_ROOM}
                                        onChange={(value) => {
                                            this.updateFormData("kind",value.value);
                                        }}
                                        placeholder="Chọn hình thức tiệc"
                                        disabled={disableCreateRegister}
                                    />
                                </div>

                                <FormInputText
                                    label="Ghi chú khách hàng"
                                    name="note"
                                    updateFormData={this.formTextChange}
                                    value={createData.note}
                                    disabled={disableCreateRegister}
                                />
                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    id={"booking-start-time"}
                                    name="start_time"
                                    updateFormData={this.formTextChange}
                                    value={createData.start_time}
                                    label={"Thời gian bắt đầu"}
                                    disabled={disableCreateRegister}
                                    maxDate = {createData.end_time}
                                />
                                <FormInputDateTime
                                    format={DATETIME_FORMAT_SQL}
                                    minDate= {createData.start_time}
                                    id={"booking-end-time"}
                                    name="end_time"
                                    updateFormData={this.formTextChange}
                                    value={createData.end_time}
                                    label={"Thời gian kết thúc"}
                                    disabled={disableCreateRegister}
                                />
                            </form>
                            < div className="form-group">
                                <label className="label-control">Trạng thái</label>
                                <ReactSelect
                                    name="status"
                                    value={createData.status}
                                    options={STATUS_REGISTER_ROOM}
                                    onChange={value => {
                                        this.updateFormData('status',value.value);
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
                                    value={createData.campaign_id}
                                    options={campaignData}
                                    onChange={value => {
                                        this.updateFormData('campaign_id',value.value);
                                    }}
                                    placeholder="Chọn chiến dịch"
                                    disabled={disableCreateRegister}
                                />
                            </div>


                            <div className="form-group">
                                <label className="label-control">Ghép phòng</label>
                                <div className="row">
                                    {allRoomsSimilar(createData.room,rooms,filter.base_id).map((room, index) => {
                                        const checked =
                                            createData.similar_room &&
                                            createData.similar_room.filter(
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
                                    isLoading={isBooking}
                                />
                            )}



                        </div>




                        {/*<form role="form" id="form-book-room" onSubmit={e => e.preventDefault()}>*/}
                            {/*<div className="row">*/}
                                {/*<div className="col-md-12">*/}

                                    {/*<div className="row">*/}
                                    {/*<div className="form-group col-md-12">*/}
                                            {/*<label className="label-control">Cơ sở</label>*/}
                                            {/*<Select*/}
                                                {/*value={createData.base_id}*/}
                                                {/*options={allBases}*/}
                                                {/*onChange={(e) => this.updateFormData('base_id', e.id)}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*{!isEmptyInput(createData.base_id) &&*/}
                                            {/*<div className="form-group col-md-12">*/}
                                            {/*<label className="label-control">Phòng</label>*/}
                                            {/*<Select*/}
                                                {/*value={createData.room_id}*/}
                                                {/*options={allRooms}*/}
                                                {/*onChange={(e) => this.updateFormData('room_id', e.id)}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*}*/}
                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputText*/}
                                                {/*label="Tên khách hàng"*/}
                                                {/*name="name"*/}
                                                {/*value={createData.name}*/}
                                                {/*required={true}*/}
                                                {/*type="text"*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputText*/}
                                                {/*label="Số điện thoại"*/}
                                                {/*name="phone"*/}
                                                {/*value={createData.phone}*/}
                                                {/*required={true}*/}
                                                {/*type="number"*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputText*/}
                                                {/*label="Email"*/}
                                                {/*name="email"*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                                {/*value={createData.email}*/}
                                                {/*required={true}*/}
                                                {/*type="email"*/}
                                            {/*/>*/}
                                        {/*</div>*/}

                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputText*/}
                                                {/*label="Địa chỉ"*/}
                                                {/*name="address"*/}
                                                {/*value={createData.address}*/}
                                                {/*type="text"*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputText*/}
                                                {/*label="Ghi chú"*/}
                                                {/*name="note"*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                                {/*value={createData.note}*/}
                                                {/*type="text"*/}
                                            {/*/>*/}
                                        {/*</div>*/}

                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputDateTime*/}
                                                {/*label="Bắt đầu"*/}
                                                {/*name="start_time"*/}
                                                {/*id="start_time"*/}
                                                {/*value={createData.start_time}*/}
                                                {/*required={true}*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                                {/*maxDate={createData.end_time}*/}
                                                {/*format={"H:M D-M-Y"}*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<FormInputDateTime*/}
                                                {/*label="Kết thúc"*/}
                                                {/*name="end_time"*/}
                                                {/*id="end_time"*/}
                                                {/*value={createData.end_time}*/}
                                                {/*required={true}*/}
                                                {/*updateFormData={this.formTextChange}*/}
                                                {/*minDate={createData.start_time}*/}
                                                {/*format={"H:M D-M-Y"}*/}
                                            {/*/>*/}
                                        {/*</div>*/}

                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<label className="label-control">Chiến dịch</label>*/}
                                            {/*<Select*/}
                                                {/*value={createData.campaign_id}*/}
                                                {/*options={allCampaigns}*/}
                                                {/*onChange={(e) => this.updateFormData('campaign_id', e.id)}*/}
                                            {/*/>*/}
                                        {/*</div>*/}

                                        {/*<div className="form-group col-md-12">*/}
                                            {/*<label className="label-control">Trạng thái</label>*/}
                                            {/*<Select*/}
                                                {/*name="form-field-name"*/}
                                                {/*value={createData.status}*/}
                                                {/*options={STATUS_REGISTER_ROOM}*/}
                                                {/*onChange={value => {this.updateFormData('status', value.value);}}*/}
                                                {/*placeholder="Chọn trang thái"*/}
                                            {/*/>*/}
                                        {/*</div>*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                            {/*</div>*/}
                            {/*<div style={{ display: "flex", justifyContent: "flex-end" }}>*/}
                                {/*{isBooking ?*/}
                                    {/*(*/}
                                        {/*<button className="btn btn-fill btn-rose disabled">*/}
                                            {/*<i className="fa fa-spinner fa-spin disabled" />*/}
                                            {/*{' Đang lưu'}*/}
                                        {/*</button>*/}
                                    {/*)*/}
                                    {/*:*/}
                                    {/*(*/}
                                        {/*<button className="btn btn-fill btn-rose" type="button"*/}
                                            {/*onClick={() => {*/}
                                                {/*this.onSubmit();*/}
                                            {/*}}>*/}
                                            {/*<i className="material-icons">save</i>*/}
                                            {/*{' Lưu'}*/}
                                        {/*</button>*/}
                                    {/*)*/}
                                {/*}*/}

                                {/*<Button*/}
                                    {/*data-dismiss="modal"*/}
                                    {/*onClick={() => {*/}
                                        {/*this.onHide();*/}
                                    {/*}}>*/}
                                    {/*<i className="material-icons">close</i>*/}
                                    {/*Hủy*/}
                            {/*</Button>*/}
                            {/*</div>*/}
                        {/*</form>*/}
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default AddRegisterModal;

