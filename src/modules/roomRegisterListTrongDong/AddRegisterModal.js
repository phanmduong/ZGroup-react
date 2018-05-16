import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import FormInputDateTime from "../../components/common/FormInputDateTime";
import Select from "react-select";
import FormInputText from '../../components/common/FormInputText';
import {
    setFormValidation,
    isEmptyInput,
    showErrorNotification,
    confirm,
} from "../../helpers/helper";
import {STATUS_REGISTER_ROOM} from "../../constants/constants";
import moment from "moment";
import {store} from './roomStore';
import { observer } from "mobx-react";

@observer
class AddRegisterModal extends React.Component {
    constructor(context, props) {
        super(context, props);
    }

    componentWillMount() {
        setFormValidation('#form-book-room');
    }

    updateFormData = (name, value) => {
        //store.updateFormData(name,value);
        console.log(name,value);
        store.createData[name] = value;
    }

    formTextChange = (e) => {
        let { name, value } = e.target;
        this.updateFormData(name, value);
    }

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

    exit = ()=> {
        confirm(
            "warning", "Cảnh báo", "Bạn có chắc muốn thoát? <br/>Những dữ liệu chưa lưu sẽ bị mất!",
            () => {
                store.showCreateModal = false;
            },
        ); 
    }

    render() {
        let { 
            createData, 
            showCreateModal, 
            isBooking,
            allBases,
            allRooms,
            allCampaigns, 
        } = store;
        return (
            <div>
                <Modal
                    show={showCreateModal}
                    bsStyle="primary"
                    onHide={()=>{store.showCreateModal = false;}}
                >
                    <Modal.Header><h4 className="card-title"><b>Đăng kí phòng</b></h4></Modal.Header>
                    <Modal.Body>
                        <form role="form" id="form-book-room" onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="row">
                                    <div className="form-group col-md-12">
                                            <label className="label-control">Cơ sở</label>
                                            <Select
                                                value={createData.base_id}
                                                options={allBases}
                                                onChange={(e) => this.updateFormData('base_id', e.id)}
                                            />
                                        </div>
                                        {!isEmptyInput(createData.base_id) &&
                                            <div className="form-group col-md-12">
                                            <label className="label-control">Phòng</label>
                                            <Select
                                                value={createData.room_id}
                                                options={allRooms}
                                                onChange={(e) => this.updateFormData('room_id', e.id)}
                                            />
                                        </div>
                                        }
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Tên khách hàng"
                                                name="name"
                                                value={createData.name}
                                                required={true}
                                                type="text"
                                                updateFormData={this.formTextChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Số điện thoại"
                                                name="phone"
                                                value={createData.phone}
                                                required={true}
                                                type="number"
                                                updateFormData={this.formTextChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Email"
                                                name="email"
                                                updateFormData={this.formTextChange}
                                                value={createData.email}
                                                required={true}
                                                type="email"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Địa chỉ"
                                                name="address"
                                                value={createData.address}
                                                type="text"
                                                updateFormData={this.formTextChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Ghi chú"
                                                name="note"
                                                updateFormData={this.formTextChange}
                                                value={createData.note}
                                                type="text"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <FormInputDateTime
                                                label="Bắt đầu"
                                                name="start_time"
                                                id="start_time"
                                                value={createData.start_time}
                                                required={true}
                                                updateFormData={this.formTextChange}
                                                maxDate={createData.end_time}
                                                format={"H:M D-M-Y"}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputDateTime
                                                label="Kết thúc"
                                                name="end_time"
                                                id="end_time"
                                                value={createData.end_time}
                                                required={true}
                                                updateFormData={this.formTextChange}
                                                minDate={createData.start_time}
                                                format={"H:M D-M-Y"}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label className="label-control">Chiến dịch</label>
                                            <Select
                                                value={createData.campaign_id}
                                                options={allCampaigns}
                                                onChange={(e) => this.updateFormData('campaign_id', e.id)}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label className="label-control">Trạng thái</label>
                                            <Select
                                                name="form-field-name"
                                                value={createData.status}
                                                options={STATUS_REGISTER_ROOM}
                                                onChange={value => {this.updateFormData('status', value.value);}}
                                                placeholder="Chọn trang thái"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                {isBooking ?
                                    (
                                        <button className="btn btn-fill btn-rose disabled">
                                            <i className="fa fa-spinner fa-spin disabled" />
                                            {' Đang lưu'}
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="btn btn-fill btn-rose" type="button"
                                            onClick={() => {
                                                this.onSubmit();
                                            }}>
                                            <i className="material-icons">save</i>
                                            {' Lưu'}
                                        </button>
                                    )
                                }

                                <Button
                                    data-dismiss="modal"
                                    onClick={() => {
                                        this.onHide();
                                    }}>
                                    <i className="material-icons">close</i>
                                    Hủy
                            </Button>
                            </div>
                        </form>
                    </Modal.Body>

                </Modal>
            </div>
        );
    }
}

export default AddRegisterModal;

