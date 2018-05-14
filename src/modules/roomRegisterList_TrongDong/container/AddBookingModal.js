import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerManageMeetingRoomAction from "../actions/registerManageMeetingRoomAction";
import FormInputDateTime from "../../../components/common/FormInputDateTime";
import Select from "react-select";
import FormInputText from '../../../components/common/FormInputText';
import * as helper from "../../../helpers/helper";
import {STATUS_REGISTER_ROOM} from "../../../constants/constants";
import ReactSelect from "react-select";
import moment from "moment";
class AddBookingModal extends React.Component {
    constructor(context, props) {
        super(context, props);
        this.state = {
            data: {
                name: '',
                phone: '',
                email: '',
                address: '',
                campaign_id: '',
                base_id: '',
                room_id: '',
                start_time: '',
                end_time: '',
                price: '',
                status: '',
            }
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.formTextChange = this.formTextChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkFormValid = this.checkFormValid.bind(this);
        this.onHide = this.onHide.bind(this);
    }

    componentWillMount() {
        helper.setFormValidation('#form-book-room');
    }

    updateFormData(name, value) {
        let data = { ...this.state.data };
        data[name] = value;
        this.setState({ data });
    }

    formTextChange(e) {
        let { name, value } = e.target;
        this.updateFormData(name, value);
    }

    checkFormValid() {
        if ($('#form-book-room').valid()) {
            if (helper.isEmptyInput(this.state.data.start_time)) {
                helper.showErrorNotification('Bạn chưa chọn ngày bắt đầu');
                return false;
            }
            if (helper.isEmptyInput(this.state.data.end_time)) {
                helper.showErrorNotification('Bạn chưa chọn ngày kết thúc');
                return false;
            }
            if (helper.isEmptyInput(this.state.data.room_id)) {
                helper.showErrorNotification('Bạn chưa chọn phòng');
                return false;
            }
            if (helper.isEmptyInput(this.state.data.base_id)) {
                helper.showErrorNotification('Bạn chưa chọn cơ sở');
                return false;
            }
            if (helper.isEmptyInput(this.state.data.campaign_id)) {
                helper.showErrorNotification('Bạn chưa chọn chiến dịch');
                return false;
            }
        }
        return true;
    }

    onSubmit() {
        if (this.checkFormValid()) {
            this.props.registerManageMeetingRoomAction.submitBooking(this.state.data, () => {
                this.onHide();
                this.props.reload();
            });
        }
    }

    onHide() {
        this.setState({ data: defaultData });
        this.props.onHide();
    }

    render() {
        let { data } = this.state;
        return (
            <div>
                <Modal
                    show={this.props.show}
                    bsStyle="primary"
                    onHide={this.onHide}
                >
                    <Modal.Header><h4 className="card-title"><b>Đăng kí phòng</b></h4></Modal.Header>
                    <Modal.Body>
                        <form role="form" id="form-book-room" onSubmit={e => e.preventDefault()}>
                            <div className="row">
                                <div className="col-md-12">

                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <label className="label-control">Phòng</label>
                                            <Select
                                                value={data.room_id}
                                                options={this.props.rooms}
                                                onChange={(e) => this.updateFormData('room_id', e.id)}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Tên khách hàng"
                                                name="name"
                                                value={data.name}
                                                required={true}
                                                type="text"
                                                updateFormData={this.formTextChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Số điện thoại"
                                                name="phone"
                                                value={data.phone}
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
                                                value={data.email}
                                                required={true}
                                                type="email"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Địa chỉ"
                                                name="address"
                                                value={data.address}
                                                type="text"
                                                updateFormData={this.formTextChange}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputText
                                                label="Ghi chú"
                                                name="note"
                                                updateFormData={this.formTextChange}
                                                value={data.note}
                                                type="text"
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <FormInputDateTime
                                                label="Bắt đầu"
                                                name="start_time"
                                                id="start_time"
                                                value={data.start_time}
                                                required={true}
                                                updateFormData={this.formTextChange}
                                                maxDate={data.end_time}
                                            />
                                        </div>
                                        <div className="form-group col-md-12">
                                            <FormInputDateTime
                                                label="Kết thúc"
                                                name="end_time"
                                                id="end_time"
                                                value={data.end_time}
                                                required={true}
                                                updateFormData={this.formTextChange}
                                                minDate={data.start_time}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label className="label-control">Chiến dịch</label>
                                            <Select
                                                value={data.campaign_id}
                                                options={this.props.campaigns}
                                                onChange={(e) => this.updateFormData('campaign_id', e.id)}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label className="label-control">Cơ sở</label>
                                            <Select
                                                value={data.base_id}
                                                options={this.props.bases.map((obj) => {
                                                    return { ...obj, value: obj.id, label: obj.name };
                                                })}
                                                onChange={(e) => this.updateFormData('base_id', e.id)}
                                            />
                                        </div>

                                        <div className="form-group col-md-12">
                                            <label className="label-control">Trạng thái</label>
                                            <ReactSelect
                                                name="form-field-name"
                                                value={data.status}
                                                options={STATUS_REGISTER_ROOM}
                                                onChange={value => {
                                                    //this.booking.status = value.value;
                                                    this.updateFormData('status', value.value);
                                                }}
                                                placeholder="Chọn trang thái"
                                            />
                                        </div>





                                    </div>
                                </div>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                {this.props.isBooking ?
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

AddBookingModal.propTypes = {
    campaigns: PropTypes.array,
    onHide: PropTypes.func,
    reload: PropTypes.func,
    show: PropTypes.bool,
    isLoadingCampaignFilter: PropTypes.bool,
    isBooking: PropTypes.bool,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
    bases: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,

};

function mapStateToProps(state) {
    return {
        isBooking: state.registerListManage.isBooking,
        isLoadingCampaignFilter: state.registerManageMeetingRoom.isLoadingCampaignFilter,
        campaigns: state.registerListManage.campaigns,
        rooms: state.registerListManage.rooms,
        bases: state.registerManageMeetingRoom.bases,

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

export default connect(mapStateToProps, mapDispatchToProps)(AddBookingModal);
const defaultData = {
    name: '',
    phone: '',
    email: '',
    address: '',
    campaign_id: '',
    base_id: '',
    room_id: '',
    start_time: moment(moment.now()).format("H:M D-M-Y"),
    end_time: moment(moment.now()).add(1,'days').format("H:M D-M-Y"),
    price: '',
};