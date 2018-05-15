import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerManageAction from './registerManageAction';
import {Button} from "react-bootstrap";


// import Avatar from '../../components/common/Avatar';

export function formatHour(hour) {
    let day = hour / 24;
    let newHour = hour - 24 * day;
    if (day === 0) return hour + " giờ";
    else {
        if (newHour !== 0) {
            return day + " ngày " + newHour + " giờ";
        }
        else {
            return day + " ngày ";
        }
    }
}

class PaymentModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {note: "", money: "", sumMoney: this.props.sumMoney};
        this.savePayment = this.savePayment.bind(this);
        this.changeMoney = this.changeMoney.bind(this);
    }


    savePayment(money, note, register_id, user_id) {

        if (this.state.money === null || this.state.money === undefined || this.state.money === '') {
            helper.showTypeNotification("Vui lòng điền số tiền", 'warning');
        }
        else if (this.state.money > this.props.register.subscription && this.props.register.subscription.price - this.state.sumMoney) {
            helper.showTypeNotification("Số tiền trả đã vượt quá giá tiền", 'warning');
        }
        else {
            this.props.registerManageRoomAction.savePayment(money, note, register_id, user_id, this.props.closePaymentModal);
        }
    }

    changeMoney(event) {
        let sumMoney = this.props.sumMoney;
        sumMoney += parseInt(event.target.value || 0);
        this.setState({money: parseInt(event.target.value), sumMoney});
    }


    render() {
        let register = this.props.register;
        return (
            <div>
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingOne">

                            <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne"
                               aria-expanded="false" aria-controls="collapseOne" className="collapsed">
                                <h4 className="panel-title">
                                    Thông tin khách hàng
                                    <i className="material-icons">keyboard_arrow_down</i>
                                </h4>
                            </a>
                        </div>
                        {register.user &&
                        <div id="collapseOne" className="panel-collapse collapse" role="tabpanel"
                             aria-labelledby="headingOne" aria-expanded="false" style={{height: '0px', marginTop: 15}}>
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <div className="flex-row-center"><i
                                        className="material-icons">account_circle</i>
                                        <b>&nbsp; &nbsp; {register.user.name} </b>
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">phone</i>
                                        <b>&nbsp; &nbsp;{helper.formatPhone(register.user.phone)} </b>
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">email</i>
                                        &nbsp; &nbsp;{register.user.email}
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">room</i>
                                        &nbsp; &nbsp; {register.user.address && register.user.address}
                                    </div>
                                </div>
                            </div>
                        </div>
                        }
                    </div>


                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingTwo">
                            <a className="collapsed" role="button" data-toggle="collapse"
                               data-parent="#accordion" href="#collapseTwo" aria-expanded="false"
                               aria-controls="collapseTwo">
                                <h4 className="panel-title">
                                    Thông tin gói khách hàng
                                    <i className="material-icons">keyboard_arrow_down</i>
                                </h4>
                            </a>
                        </div>
                        <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel"
                             aria-labelledby="headingTwo" aria-expanded="false" style={{height: '0px', marginTop: 15}}>
                            <div className="timeline-panel">
                                <div className="timeline-body">
                                    <div className="flex-row-center">
                                        <i className="material-icons">class</i>
                                        <b>&nbsp; &nbsp;{register.subscription &&register.subscription.user_pack_name} </b></div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">note</i>
                                        &nbsp; &nbsp; {register.subscription && register.subscription.user_pack && register.subscription.user_pack.detail}
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">attach_money</i>
                                        <b style={{marginLeft: 13}}>{helper.dotNumber(register.subscription&&register.subscription.price)}
                                            đ</b>
                                    </div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">access_time</i>
                                        &nbsp; &nbsp; {"  " + formatHour(register.subscription && register.subscription.hours)}
                                    </div>
                                    <div className="flex-row-center" style={{display: "inline-block"}}>
                                        <i className="material-icons">date_range</i>&nbsp; &nbsp; {register.subscription && register.subscription.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingFour">
                            <a className="collapsed" role="button" data-toggle="collapse"
                               data-parent="#accordion" href="#collapseFour" aria-expanded="false"
                               aria-controls="collapseFour">
                                <h4 className="panel-title">
                                    {"Lịch sử trả tiền"}
                                    <i className="material-icons">keyboard_arrow_down</i>
                                </h4>
                            </a>
                        </div>
                        <div>
                            <div id="collapseFour" className="panel-collapse collapse" role="tabpanel"
                                 aria-labelledby="headingFour" aria-expanded="false"
                                 style={{height: '0px'}}>
                                <ul className="timeline timeline-simple">
                                    {register.historyPayments && register.historyPayments.map((payment, index) => {
                                        return (
                                            <li className="timeline-inverted" key={index}>
                                                <div className={"timeline-badge success"}>
                                                    <i className="material-icons">swap_horiz</i>
                                                </div>
                                                <div className="timeline-panel">
                                                    <div className="timeline-heading">
                                                        <span className="label label-default"
                                                              style={{backgroundColor: '#' + payment.staff.color}}>
                                                        {payment.staff.name}
                                                        </span>
                                                    </div>
                                                    <div className="timeline-body">
                                                        {payment.money_value &&
                                                        <p className="flex-row-center">
                                                            <i className="material-icons">attach_money</i>
                                                            {helper.dotNumber(payment.money_value) + " đ"}
                                                        </p>}
                                                        {payment.description &&
                                                        <p className="flex-row-center">
                                                            <i className="material-icons">note</i>
                                                            &nbsp; &nbsp;{" "+ payment.description}
                                                        </p>}
                                                    </div>
                                                    <h6>
                                                        <i className="ti-time"/>
                                                        {helper.parseTime(payment.created_at.date)}
                                                    </h6>
                                                </div>

                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>


                            <div style={{paddingTop: 30}}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <h4><b>Số tiền cần nộp</b></h4>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        fontSize: 20
                                    }}>
                                        {helper.dotNumber(parseInt(this.props.register.subscription && this.props.register.subscription.price)) + " đ"}
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <h4><b>Tổng số tiền đã trả</b></h4>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        fontSize: 20
                                    }}>
                                        {helper.dotNumber(this.state.sumMoney) + " đ"}
                                    </div>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                    <h4><b>Còn lại</b></h4>
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        fontSize: 20
                                    }}>
                                        {helper.dotNumber(parseInt(this.props.register.subscription && this.props.register.subscription.price) - this.state.sumMoney) + " đ"}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Số tiền</label>
                        <input type="number" className="form-control"
                               value={this.state.money}
                               max={this.props.register.subscription && this.props.register.subscription.price - this.state.sumMoney}
                               onChange={(event) => this.changeMoney(event)}/>
                    </div>
                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Ghi chú</label>
                        <textarea className="form-control"
                                  value={this.state.note}
                                  onChange={(event) => this.setState({note: event.target.value})}/>
                    </div>
                </div>

                {this.props.isSavingPayment ?

                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <button className="btn btn-rose disabled">
                            <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                        </button>
                        <button className="btn disabled">
                            <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                        </button>
                    </div>
                    :
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button className="btn btn-rose"
                                data-dismiss="modal"
                                onClick={() => {
                                    this.savePayment(this.state.money, this.state.note, register.id, register.user.id);
                                }}>
                            <i className="material-icons">save</i>
                            Lưu
                        </Button>
                        <Button data-dismiss="modal"
                                onClick={() => {
                                    this.props.closePaymentModal();
                                }}>
                            <i className="material-icons">close</i>
                            Hủy
                        </Button>
                    </div>
                }
            </div>
        );
    }
}


PaymentModal.propTypes = {
    register: PropTypes.object.isRequired,
    isSavingPayment: PropTypes.bool.isRequired,
    registerManageRoomAction: PropTypes.object.isRequired,
    closePaymentModal: PropTypes.func.isRequired,
    sumMoney: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isSavingPayment: state.registerManage.isSavingPayment,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageRoomAction: bindActionCreators(registerManageAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

