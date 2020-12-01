import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from "prop-types";
import * as studentActions from "../studentActions";
import Loading from "../../../components/common/Loading";
import {
    dotNumber,
    isEmptyInput,
    showErrorNotification,
    showNotification,
    showTypeNotification
} from "../../../helpers/helper";
import {
    DATE_FORMAT_SQL,
    DATE_VN_FORMAT,
    DISCOUNTYPE,
    PAYMENT_METHODS,
    PAYMENT_METHODS_OBJECT
} from "../../../constants/constants";
import CreateCouponOverlay from "../overlays/CreateCouponOverlay";
import EmptyData from "../../../components/common/EmptyData";
import {Modal} from "react-bootstrap";
import FormInputText from "../../../components/common/FormInputText";
import FormInputDate from "../../../components/common/FormInputDate";
import ReactSelect from "react-select";
import {editPayment} from "../../collectMoney/collectMoneyApi";
import {isEmpty} from "../../../helpers/entity/mobx";
import moment from "moment";

class HistoryCollectMoneyContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalEdit: false,
            isSaving: false,
            payment: {}
        };
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;

    }


    componentWillMount() {
        this.props.studentActions.loadHistoryCollectMoney(this.studentId);
    }

    openModalEdit = (payment) => {
        console.log(payment);
        if (this.props.user.role < 2 || this.state.isSaving) return;
        this.setState({
            payment,
            showModalEdit: true
        });
    }

    closeModal = () => {
        this.setState({
            payment: {},
            showModalEdit: false
        });
    }

    updateFormData = (event) => {
        const {name, value} = event.target;
        let payment = {...this.state.payment};
        console.log(name, value);
        if (name == "money") {
            if (!isNaN(Number(value.toString().replace(/\./g, "")))) {
                payment[name] = Number(value.toString().replace(/\./g, ""));
            }
        } else {
            payment[name] = value;
        }
        this.setState({payment});
        $('#form-edit-payment').validate({
            rules: {money: 'required'},
            messages: {'money': 'Vui lòng nhập số tiền!'}
        });
    };
    onPaymentMethodChange = (obj) => {
        let res = obj ? obj.value : '';
        let payment = {...this.state.payment};
        payment['payment_method'] = res;
        this.setState({
            payment
        });
    };
    savePayment = (e) => {
        e.preventDefault();
        let {payment} = this.state;
        if ($('#form-edit-payment').valid()) {
            if (isEmptyInput(payment.payment_method)) {
                showTypeNotification("Vui lòng chọn phương thức thanh toán", "warning");
                return;
            }
            this.setState({isSaving: true});
            let actual_input_at = isEmpty(payment.actual_input_at) ? null : moment(payment.actual_input_at, DATE_VN_FORMAT).format(DATE_FORMAT_SQL);
            editPayment(this.studentId, {
                id: payment.id,
                money: payment.money,
                actual_input_at,
                payment_method: payment.payment_method,
                note: payment.note,
            }).then(() => {
                showNotification('Lưu thành công!');
                this.setState({
                    showModalEdit: false,
                    isSaving: false,
                    payment: {}
                });
                this.props.studentActions.loadHistoryCollectMoney(this.studentId);
            }).catch(() => {
                showErrorNotification('Có lỗi xảy ra!');
            });
        }
    }

    render() {
        console.log(this.props)
        let isAdmin = this.props.user.role == 2;
        return (
            <div className="tab-pane active">

                {this.props.isLoadingHistoryCollectMoney ? <Loading/>
                    :
                    <ul className="timeline timeline-simple">
                        <li className="timeline-inverted">
                            <div className="timeline-badge" style={{backgroundColor: '#4855d1'}}>
                                <i className="material-icons">add</i>
                            </div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <div className="flex flex-align-items-center margin-top-5">
                                        <CreateCouponOverlay
                                            className="btn btn-actions"
                                        />
                                    </div>
                                </div>
                                <div className="timeline-body margin-vertical-30"/>

                            </div>
                        </li>
                        {
                            this.props.historyCollectMoney && this.props.historyCollectMoney.length > 0 ? this.props.historyCollectMoney.map((payment, index) => {
                                    return (
                                        <li className="timeline-inverted" key={index}>
                                            <div className="timeline-badge">
                                                <img className="circle" src={payment.class.icon_url} alt=""/>
                                            </div>
                                            <div className="timeline-panel">
                                                <h4>
                                                    <b>{payment.class.name}</b>
                                                </h4>
                                                <div className="timeline-body">
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">access_time</i>
                                                        <b>&nbsp; &nbsp; Ngày tạo: {payment.paid_time} </b>
                                                    </div>
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">access_time</i>
                                                        <b>&nbsp; &nbsp; Ngày thực nhận: {payment.actual_input_at} </b>
                                                    </div>
                                                    {!isEmptyInput(payment.note) && <div className="flex-row-center">
                                                        <i className="material-icons">create</i>&nbsp; &nbsp;
                                                        Ghi chú: {payment.note}
                                                    </div>}
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">account_box</i>
                                                        <b>&nbsp; &nbsp; Hình
                                                            thức: &nbsp;</b> {payment.money < 0 ? 'Hoàn tiền' : 'Nộp tiền'}
                                                    </div>
                                                    {
                                                        payment.collector &&
                                                        <div className="flex-row-center">
                                                            <i className="material-icons">account_box
                                                            </i><b>&nbsp; &nbsp; Người
                                                            thu: &nbsp;</b> {payment.collector.name}
                                                        </div>
                                                    }
                                                    {payment.coupons && payment.coupons.map((coupon, i) => {
                                                        let type = DISCOUNTYPE.filter(t => t.id == coupon.discount_type)[0] || {};
                                                        let text = `${coupon.name}  (-${coupon.discount_value}${type.suffix})`;
                                                        return (
                                                            <div className="flex-row-center flex-align-items-center"
                                                                 key={i}>
                                                                <i className="material-icons">monetization_on
                                                                </i>&nbsp; &nbsp;
                                                                <button className="btn btn-xs"
                                                                        style={{margin: '5px 0', background: coupon.color}}
                                                                >
                                                                    {text}
                                                                </button>
                                                            </div>
                                                        );
                                                    })}

                                                </div>

                                                <div className="timeline-heading margin-top-10">
                                                    <div className="flex-row-center">
                                                        <button
                                                            className={`btn btn-xs ${payment.money < 0 ? 'btn-warning' : 'btn-rose'}`}
                                                            style={{width: '70px'}}
                                                        >
                                                            {dotNumber(Math.abs(payment.money))}
                                                            <div className="ripple-container"/>
                                                        </button>
                                                        <button className="btn btn-xs btn-success"
                                                            // style={{width: '70px'}}
                                                        >
                                                            {PAYMENT_METHODS_OBJECT[payment.payment_method]}
                                                            <div className="ripple-container"/>
                                                        </button>

                                                    </div>
                                                    {
                                                        isAdmin &&
                                                        <button className="btn btn-actions margin-top-10"
                                                                onClick={() => this.openModalEdit({...payment})}
                                                        >
                                                            Sửa
                                                        </button>
                                                    }
                                                </div>


                                            </div>

                                        </li>
                                    );
                                }) :
                                <EmptyData/>
                        }
                    </ul>
                }
                <Modal show={this.state.showModalEdit} onHide={this.closeModal}>
                    <Modal.Header closeButton={!this.state.isSaving} closeplaceholder="Đóng">
                        <Modal.Title><b>Sửa giao dịch</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-edit-payment" className="form-grey" onSubmit={(e) => e.preventDefault()}>
                            <div>
                                <label>Số tiền</label>
                                <FormInputText
                                    name="money"
                                    placeholder="Số tiền"
                                    value={dotNumber(this.state.payment.money)}
                                    required
                                    type="text"
                                    updateFormData={this.updateFormData}
                                />
                            </div>
                            <div><label>Ghi chú</label>
                                <FormInputText
                                    name="note"
                                    placeholder="Note"
                                    value={this.state.payment.note}
                                    updateFormData={this.updateFormData}
                                /></div>
                            <div><label>Ngày thực nhận</label>
                                <FormInputDate
                                    placeholder="Ngày thực nhận"
                                    name="actual_input_at"
                                    id="form-actual_input_at"
                                    format={DATE_VN_FORMAT}
                                    updateFormData={this.updateFormData}
                                    value={this.state.payment.actual_input_at || ''}
                                />
                            </div>
                            <div><label>Phương thức thanh toán</label>
                                <ReactSelect
                                    disabled={this.state.isLoading}
                                    className="form-group"
                                    options={PAYMENT_METHODS}
                                    onChange={this.onPaymentMethodChange}
                                    value={this.state.payment.payment_method}
                                    placeholder="Phương thức thanh toán"
                                    name="payment_method"
                                    clearable={false}
                                />
                            </div>

                            {this.state.isSaving ? <Loading/> :
                                <div className="flex">
                                    <button type="button"
                                            disabled={this.state.isSaving}
                                            className="btn btn-white width-50-percent text-center"
                                            data-dismiss="modal"
                                            onClick={this.closeModal}>
                                        Hủy
                                    </button>
                                    <button type="button"
                                            className="btn btn-success width-50-percent text-center"
                                            disabled={this.state.isSaving}
                                            style={{backgroundColor: '#2acc4c'}}
                                            onClick={(e) => this.savePayment(e)}>
                                        Hoàn tất
                                    </button>
                                </div>}
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

HistoryCollectMoneyContainer.propTypes = {
    historyCollectMoney: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingHistoryCollectMoney: PropTypes.bool.isRequired,
    location: PropTypes.object,
    params: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        historyCollectMoney: state.infoStudent.historyCollectMoney,
        isLoadingHistoryCollectMoney: state.infoStudent.isLoadingHistoryCollectMoney,
        user: state.login.user,

    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(HistoryCollectMoneyContainer);
