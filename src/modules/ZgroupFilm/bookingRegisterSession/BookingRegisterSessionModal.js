import React from 'react';
import * as helper from "../../../helpers/helper";
import {Modal} from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import CheckBoxMaterial from "../../../components/common/CheckBoxMaterial";
import {connect} from "react-redux";
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import *as filmAction from "../filmAction";
import Loading from "../../../components/common/Loading";
import Search from '../../../components/common/Search';
import moment from "moment/moment";


class BookingRegisterSessionModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            confirm: false,
        };
        this.timeOut = null;
        this.updateFormData = this.updateFormData.bind(this);
        this.pay = this.pay.bind(this);
        this.receiversSearchChange = this.receiversSearchChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isBookingSeat !== this.props.isBookingSeat && !nextProps.isBookingSeat) {
            this.props.filmAction.loadSeatBySessionId(this.props.handleBookingModal.session_id);
        }
        if (nextProps.isCheckingUser !== this.props.isCheckingUser && !nextProps.isCheckingUser) {
            if (nextProps.user.length === 1) {
                let a = nextProps.user[0];
                this.props.filmAction.handleBookingModal({
                    ...this.props.handleBookingModal,
                    name: a.name,
                    phone: a.phone,
                    email: a.email,
                    disable: true
                });
            }
        }
    }

    updateFormData(event) {
        const field = event.target.name;
        let film = {
            ...this.props.handleBookingModal,
            [field]: event.target.value,
        };
        this.props.filmAction.handleBookingModal(film);

        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        let value = event.target.value;
        let call = () => {
            return this.props.filmAction.checkUser(value);
        };
        this.timeOut = setTimeout(
            call.bind(this),
            200
        );
    }

    receiversSearchChange(value) {
        this.props.filmAction.handleBookingModal({
            ...this.props.handleBookingModal,
            code: value
        });
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(
            function () {
                this.props.filmAction.checkCode(value);
            }.bind(this),
            500
        );
    }

    pay() {
        let bk = (
            helper.isEmptyInput(this.props.handleBookingModal.phone) &&
            helper.isEmptyInput(this.props.handleBookingModal.email)) ?
            ((moment(this.props.codeInfo.start_date, "YYYY-MM-DD").fromNow().search("ago") === -1 ||
                moment(this.props.codeInfo.end_date, "YYYY-MM-DD").add(1, 'days').fromNow().search("in") === -1 ||
                this.props.codeInfo.status === 1) ? {
                ...this.props.handleBookingModal,
                code: '',
                name: "#",
                phone: "#",
                email: '#'
            } : {
                ...this.props.handleBookingModal,
                name: "#",
                phone: "#",
                email: '#'
            })
            :
            ((moment(this.props.codeInfo.start_date, "YYYY-MM-DD").fromNow().search("ago") === -1 ||
                moment(this.props.codeInfo.end_date, "YYYY-MM-DD").add(1, 'days').fromNow().search("in") === -1 ||
                this.props.codeInfo.status === 1) ? {...this.props.handleBookingModal, code: ''} : {...this.props.handleBookingModal});
        if ((helper.isEmptyInput(this.props.handleBookingModal.phone) ||
                helper.isEmptyInput(this.props.handleBookingModal.email)) &&
            !(helper.isEmptyInput(this.props.handleBookingModal.phone) &&
                helper.isEmptyInput(this.props.handleBookingModal.email))) {
            if (helper.isEmptyInput(this.props.handleBookingModal.phone)) helper.showErrorNotification("Bạn cần nhập số điện thoại");
            if (helper.isEmptyInput(this.props.handleBookingModal.email)) helper.showErrorNotification("Bạn cần nhập email");
        }
        else {
            if (this.state.confirm === false) helper.showErrorNotification("Bạn cần xác nhận thanh toán");
            else {
                helper.showNotification("Đang thanh toán");
                this.props.filmAction.bookingSeat(bk);
            }
        }
    }

    render() {

        let sum = this.props.handleBookingModal.sum;
        let modal = this.props.handleBookingModal;
        return (
            <Modal show={this.props.addBookingRegisterSessionModal}
                   onHide={() => {
                       helper.confirm("warning", "Quay lại", "Bạn có chắc muốn quay lại, dữ liệu hiện tại sẽ không được cập nhật", () => {
                           this.props.filmAction.toggleBookingModal();
                       });

                   }}
            >
                <a onClick={() => this.props.filmAction.toggleBookingModal()}
                   id="btn-close-modal"/>
                <Modal.Header closeButton>
                    <Modal.Title className="modal-title">Đặt vé </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-md-7">
                            <FormInputText
                                label="Họ tên"
                                name="name"
                                updateFormData={this.updateFormData}
                                value={modal.name || ''}
                            />
                            <FormInputText
                                label="Số điện thoại"
                                name="phone"
                                updateFormData={this.updateFormData}
                                value={modal.phone || ''}
                                disabled={modal.disable}
                            />
                            <FormInputText
                                label="Email"
                                name="email"
                                updateFormData={this.updateFormData}
                                value={modal.email || ''}
                                disabled={modal.disable}
                            />
                            <br/>
                            {
                                this.props.isCheckingUser ? <Loading/> : ''
                            }
                        </div>
                        <div className="col-md-5">
                            <br/>
                            <h5> Tổng tiền: {(sum || 0) / 1000 || ''}.000 VNĐ</h5>
                            <Search
                                placeholder="Nhập mã giảm giá"
                                name="code"
                                onChange={this.receiversSearchChange}
                                value={this.props.handleBookingModal.code}
                            />
                            {
                                this.props.isCheckingCode ? <Loading/> :
                                    <div>
                                        <h5>Giảm giá: {

                                            (moment(this.props.codeInfo.start_date, "YYYY-MM-DD").fromNow().search("ago") === -1 ||
                                                moment(this.props.codeInfo.end_date, "YYYY-MM-DD").add(1, 'days').fromNow().search("in") === -1 ||
                                                this.props.codeInfo.status === 1) ? "0 VNĐ" :
                                                (this.props.codeInfo.value ? this.props.codeInfo.value / 1000 + ".000 VNĐ" : "0 VNĐ")
                                        }
                                        </h5>
                                        <b>{!helper.isEmptyInput(this.props.codeInfo.start_date) ?
                                            (
                                                (moment(this.props.codeInfo.start_date, "YYYY-MM-DD").fromNow().search("ago") === -1 ||
                                                    moment(this.props.codeInfo.end_date, "YYYY-MM-DD").add(1, 'days').fromNow().search("in") === -1 ||
                                                    this.props.codeInfo.status === 1) ? "Mã giảm giá đã sử dụng, hoặc hết hạn hay không khả dụng" : ""
                                            )
                                            : ""
                                        }</b>

                                        <h5>Thanh toán:
                                            {(moment(this.props.codeInfo.start_date, "YYYY-MM-DD").fromNow().search("ago") === -1 ||
                                                moment(this.props.codeInfo.end_date, "YYYY-MM-DD").add(1, 'days').fromNow().search("in") === -1 ||
                                                this.props.codeInfo.status === 1) ? (sum || 0) / 1000 : (sum || 0) / 1000 - ((this.props.codeInfo.value || 0) / 1000)}.000
                                            VNĐ
                                        </h5>
                                    </div>
                            }

                        </div>
                    </div>
                    <CheckBoxMaterial
                        name="display"
                        checked={this.state.confirm}
                        onChange={() => {
                            this.setState({
                                ...this.state,
                                confirm: !this.state.confirm
                            });
                        }}
                        label="Xác nhận số tiền đã thu là:"
                    />
                    {
                        this.props.isCheckingCode ? <Loading/> :
                            <p style={{textAlign: 'center', fontSize: '24px', fontWeight: '400'}}>
                                {(moment(this.props.codeInfo.start_date, "YYYY-MM-DD").fromNow().search("ago") === -1 ||
                                    moment(this.props.codeInfo.end_date, "YYYY-MM-DD").add(1, 'days').fromNow().search("in") === -1 ||
                                    this.props.codeInfo.status === 1) ? (sum || 0) / 1000 : (sum || 0) / 1000 - ((this.props.codeInfo.value || 0) / 1000)}.000
                                VNĐ
                            </p>
                    }
                    <br/>
                    {
                        this.props.isBookingSeat ? <Loading/> :
                            <div style={{textAlign: "right"}}>
                                <div>
                                    <button
                                        type="button"
                                        className="btn btn-rose"
                                        onClick={this.pay}
                                    >
                                        Thanh toán
                                    </button>
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => {
                                            this.props.filmAction.toggleBookingModal();
                                        }}
                                    >
                                        Huỷ
                                    </button>
                                </div>
                            </div>
                    }

                </Modal.Body>
            </Modal>
        );
    }
}

BookingRegisterSessionModal.propTypes = {
    addBookingRegisterSessionModal: PropTypes.bool.isRequired,
    isBookingSeat: PropTypes.bool.isRequired,
    isCheckingCode: PropTypes.bool.isRequired,
    isCheckingUser: PropTypes.bool.isRequired,
    filmAction: PropTypes.object.isRequired,
    handleBookingModal: PropTypes.object.isRequired,
    codeInfo: PropTypes.object.isRequired,
    user: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        addBookingRegisterSessionModal: state.film.addBookingRegisterSessionModal,
        handleBookingModal: state.film.handleBookingModal,
        isBookingSeat: state.film.isBookingSeat,
        isCheckingCode: state.film.isCheckingCode,
        codeInfo: state.film.codeInfo,
        isCheckingUser: state.film.isCheckingUser,
        user: state.film.user,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        filmAction: bindActionCreators(filmAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingRegisterSessionModal);