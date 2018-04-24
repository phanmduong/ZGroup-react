import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../../helpers/helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerManageMeetingRoomAction from '../actions/registerManageMeetingRoomAction';
import {Button, Modal} from "react-bootstrap";
import moment from "moment";
import CollapsePanel from "../../../components/common/CollapsePanel";


export function countMoney(register) {
    const time =
        (moment(register.official_end_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
            - moment(register.official_start_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
        ) / 3600000 - register.extra_time;
    const hour = Math.floor(time);
    const minute = (Math.floor((time - Math.floor(time)) * 60));
    const total = hour * 60 + minute;
    return total * register.price / 60;
}

export function countTime(register) {
    const time =
        (moment(register.official_end_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
            - moment(register.official_start_time || 0, "YYYY-MM-DD HH:mm:ss").valueOf()
        ) / 3600000 - register.extra_time;
    const hour = Math.floor(time);
    const minute = (Math.floor((time - Math.floor(time)) * 60));
    return hour * 60 + minute;
}

function convertTime(minute) {
    const hour = Math.floor(minute / 60);
    minute = minute - hour * 60;
    return minute === 0 ? hour + " giờ" : hour + " giờ " + minute + " phút";
}

class PaymentModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {note: "", money: 0, sumMoney: "", hour: 0, minute: 0, sumTime: 0};
        this.savePayment        = this.savePayment.       bind(this);
        this.changeMoney        = this.changeMoney.       bind(this);
        this.changeTimeHour     = this.changeTimeHour.    bind(this);
        this.changeTimeMinute   = this.changeTimeMinute.  bind(this);
        this.changeMoney        = this.changeMoney.       bind(this);
        this.closePaymentModal  = this.closePaymentModal. bind(this);
    }


    savePayment(hour, minute, money, note, register_id, user_id) {

        if ((this.state.money && this.state.hour && this.state.minute === null) || (this.state.money && this.state.hour && this.state.minute === undefined) || (this.state.money && this.state.hour && this.state.minute) === '') {
            helper.showTypeNotification("Vui lòng điền số tiền hoặc thời gian ", 'warning');
        }
        else {
            this.props.registerManageMeetingRoomAction.savePayment(hour, minute, money, note, register_id, user_id, this.closePaymentModal);
        }
    }

    changeMoney(event) {
        let sumMoney =  this.props.register.money;
            sumMoney += parseInt(event.target.value || 0);
        this.setState({money: parseInt(event.target.value), sumMoney});
    }

    changeTimeHour(event) {

        let sumTime = this.props.register.time_spent;
            sumTime += parseInt(event.target.value || 0) * 60;

        if(parseInt(countTime(this.props.register)) < sumTime){
            helper.showTypeNotification("Vượt quá số giờ đăng kí", 'warning');
            return;
        }


        if(this.props.register.extra_time < sumTime){
            helper.showTypeNotification("Vượt quá số giờ khuyến mãi", 'warning');
            return;
        }

        this.setState({
            hour: parseInt(event.target.value),
            sumTime,
            sumMoney : this.state.sumMoney- sumTime * this.props.register.price/60 ,
        });
    }

    changeTimeMinute(event) {

        let sumTime =  this.props.register.time_spent;
        sumTime += parseInt(event.target.value || 0);
        if(parseInt(countTime(this.props.register)) < sumTime){
            helper.showTypeNotification("Vượt quá số giờ đăng kí", 'warning');
            return;
        }
        if(this.props.register.extra_time < sumTime){
            helper.showTypeNotification("Vượt quá số giờ khuyến mãi", 'warning');
            return;
        }

        this.setState({
            minute: parseInt(event.target.value),
            sumTime,
            sumMoney : this.state.sumMoney- sumTime * this.props.register.price/60 ,
        });
    }

    closePaymentModal() {
        this.props.registerManageMeetingRoomAction.closePaymentModal();
        this.setState({});
    }


    render() {
        let register = this.props.register;
        return (
            <Modal
                show={this.props.isOpenPaymentModal}
                bsStyle="primary"
                onHide={this.closePaymentModal}
            >
                <Modal.Header/>
                <Modal.Body>
                    <div>
                        <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">





                            {register.user &&
                            <CollapsePanel
                                isMultiSelect={false}
                                id="collapseOne"
                                style={{height: '0px', marginTop: 15}}
                                title="Thông tin khách hàng"
                            >
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
                                            &nbsp; &nbsp; {register.user.email}
                                        </div>
                                        <div className="flex-row-center">
                                            <i className="material-icons">room</i>
                                            &nbsp; &nbsp; {register.user.address && register.user.address}
                                        </div>
                                    </div>
                                </div>
                            </CollapsePanel>
                            }





                            <CollapsePanel
                                isMultiSelect={false}
                                id="collapseTwo"
                                style={{height: '0px', marginTop: 15}}
                                title="Lịch sử trả tiền"
                            >
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
                                                        {
                                                            payment.money_value &&
                                                            <p className="flex-row-center">
                                                            <i className="material-icons">attach_money</i>
                                                            {helper.dotNumber(payment.money_value) + " đ"}
                                                            </p>
                                                        }
                                                        {payment.description &&
                                                        <p className="flex-row-center">
                                                            <i className="material-icons">note</i>
                                                            &nbsp; &nbsp;{payment.description}
                                                        </p>
                                                        }
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
                            </CollapsePanel>







                            <CollapsePanel
                                isMultiSelect={true}
                                id="collapseThree"
                                style={{height: '0px', marginTop: 15}}
                                title="Trả theo tiền"
                            >
                                <div style={{paddingTop: 30}}>
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
                                                {helper.dotNumber(parseInt(countMoney(register))) + " đ"}
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
                                                {
                                                    helper.dotNumber(
                                                        this.state.sumMoney === "" ? this.props.register.money : this.state.sumMoney
                                                    ) + " đ"
                                                }
                                                {/*Do khong dua duoc store vao state truoc khi render */}

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
                                                {
                                                    helper.dotNumber(
                                                        parseInt(countMoney(register)) -
                                                        (this.state.sumMoney === "" ? this.props.register.money : this.state.sumMoney)
                                                    )
                                                    + " đ"}
                                                {/*Do khong dua duoc store vao state truoc khi render */}

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-group label-floating is-empty">
                                    <label className="control-label">Số tiền</label>
                                    <input type="number" className="form-control"
                                           value={this.state.money}
                                           onChange={(event) => this.changeMoney(event)}
                                           min={0}
                                           max={parseInt(countMoney(register)) - register.money}
                                    />
                                </div>
                            </CollapsePanel>






                            <CollapsePanel
                                isMultiSelect={true}
                                id="collapseFour"
                                style={{height: '0px', marginTop: 15}}
                                title="Trả theo thời gian miễn phí"
                            >
                                <div style={{paddingTop: 30}}>
                                    <div style={{paddingTop: 30}}>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}>
                                            <h4><b>Số giờ đăng kí</b></h4>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                fontSize: 20,
                                            }}>
                                                {
                                                    convertTime(parseInt(
                                                    countTime(register)
                                                ))
                                                }
                                            </div>
                                        </div>
                                        <div style={{
                                            display: "flex",
                                            justifyContent: "space-between"
                                        }}>
                                            <h4><b>Số giờ khuyến mãi</b></h4>
                                            <div style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                flexDirection: "column",
                                                fontSize: 20,
                                            }}>
                                                {/*{*/}
                                                    {/*this.state.sumTime === 0 ?*/}
                                                    {/*convertTime(parseInt(*/}
                                                        {/*this.props.register.time_spent*/}
                                                    {/*))*/}
                                                    {/*:*/}
                                                    {/*convertTime(parseInt(*/}
                                                        {/*this.state.sumTime*/}
                                                    {/*))*/}
                                                {/*}*/}

                                                {this.props.register.extra_time + " giờ"}
                                                {/*Do khong dua duoc store vao state truoc khi render */}
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
                                                {convertTime(parseInt(countTime(register)) - parseInt(this.state.sumTime))}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="form-group label-floating is-empty">
                                    <label className="control-label">Số giờ</label>
                                    <input type="number" className="form-control"
                                           value={this.state.hour}
                                           name="hour"
                                           onChange={(event) => this.changeTimeHour(event)}
                                           min={0}
                                           // max={parseInt(countTime(register))> this.props.register.extra_time ? Math.floor(this.props.register.extra_time/60):
                                           //     Math.floor(parseInt(countTime(register))/60)}
                                    />
                                </div>
                                <div className="form-group label-floating is-empty">

                                    <label className="control-label">Số phút</label>
                                    <input type="number" className="form-control"
                                           value={this.state.minute}
                                           name="minute"
                                           onChange={(event) => this.changeTimeMinute(event)}
                                           min={0}
                                    />
                                </div>
                            </CollapsePanel>




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
                                            this.savePayment(this.state.hour, this.state.minute, this.state.money, this.state.note, register.id, register.user.id);
                                        }}>
                                    <i className="material-icons">save</i>
                                    Lưu
                                </Button>
                                <Button data-dismiss="modal"
                                        onClick={() => {
                                            this.closePaymentModal();
                                        }}>
                                    <i className="material-icons">close</i>
                                    Hủy
                                </Button>
                            </div>



                        }
                    </div>
                </Modal.Body>
            </Modal>

        );
    }
}


PaymentModal.propTypes = {
    register:                         PropTypes.object.isRequired,
    isSavingPayment:                  PropTypes.bool.isRequired,
    isOpenPaymentModal:               PropTypes.bool.isRequired,
    registerManageMeetingRoomAction:  PropTypes.object.isRequired,
    registers:                        PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        isSavingPayment:    state.registerManageMeetingRoom.isSavingPayment,
        register:           state.registerManageMeetingRoom.register,
        registers:          state.registerManageMeetingRoom.registers,
        isOpenPaymentModal: state.registerManageMeetingRoom.isOpenPaymentModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageMeetingRoomAction: bindActionCreators(registerManageMeetingRoomAction, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModal);

