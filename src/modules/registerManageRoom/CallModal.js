import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerManageRoomAction from './registerManageRoomAction';
import {Button} from "react-bootstrap";


// import Avatar from '../../components/common/Avatar';


class CallModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {note: "", money: "", sumMoney: this.props.sumMoney};
        this.changeCallStatus = this.changeCallStatus.bind(this);
        this.savePayment = this.savePayment.bind(this);
        this.changeMoney = this.changeMoney.bind(this);
    }


    changeCallStatus(status, note, register_id, user_id) {
        this.props.registerManageRoomAction.changeCallStatus(status, note, register_id, user_id, this.props.closeCallModal);
    }

    savePayment(money, register_id, user_id) {

        if (this.state.money === null || this.state.money === undefined || this.state.money === '') {
            helper.showTypeNotification("Vui lòng điền số tiền", 'warning');
        }
        else {
            this.props.registerManageRoomAction.savePayment(money, register_id, user_id, this.props.closeCallModal);
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
                                        &nbsp; &nbsp; {register.user.email}
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
                        <div className="panel-heading" role="tab" id="headingFour">
                            <a className="collapsed" role="button" data-toggle="collapse"
                               data-parent="#accordion" href="#collapseFour" aria-expanded="false"
                               aria-controls="collapseFour">
                                <h4 className="panel-title">
                                    {this.props.isCallModal ? "Lịch sử gọi điện" : "Lịch sử trả tiền"}
                                    <i className="material-icons">keyboard_arrow_down</i>
                                </h4>
                            </a>
                        </div>

                        {
                            this.props.isCallModal ?
                                (
                                    <div id="collapseFour" className="panel-collapse collapse" role="tabpanel"
                                         aria-labelledby="headingFour" aria-expanded="false"
                                         style={{height: '0px'}}>
                                        <ul className="timeline timeline-simple">{
                                            register.teleCalls && register.teleCalls.map((history, index) => {
                                                let btn = '';
                                                if (history.call_status === 1) {
                                                    btn = ' success';
                                                }
                                                else if (history.call_status === 0) {
                                                    btn = ' danger';
                                                }
                                                return (
                                                    <li className="timeline-inverted" key={index}>
                                                        <div className={"timeline-badge " + btn}>
                                                            <i className="material-icons">phone</i>
                                                        </div>
                                                        <div className="timeline-panel">
                                                            <div className="timeline-heading">
                                                                <span className="label label-default"
                                                                      style={{backgroundColor: '#' + history.caller.color}}>
                                                                            {history.caller.name}
                                                                </span>
                                                                <span
                                                                    className="label label-default">{helper.parseTime(history.created_at)}
                                                                </span>
                                                            </div>
                                                            <div className="timeline-body">
                                                                {history.note}
                                                            </div>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )
                                :
                                (
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
                                                                    <span
                                                                        className="label label-default">{helper.parseTime(payment.created_at.date)}
                                                                </span>
                                                                </div>
                                                                <div className="timeline-body">
                                                                    {payment.money_value + " đ"}
                                                                </div>
                                                            </div>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                    </div>


                    {
                        this.props.isCallModal ?
                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Ghi chú</label>
                                <textarea className="form-control"
                                          value={this.state.note}
                                          onChange={(event) => this.setState({note: event.target.value})}/>
                            </div>
                            :
                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Số tiền</label>
                                <input type="number" className="form-control"
                                       value={this.state.money}
                                       onChange={(event) => this.changeMoney(event)}/>
                            </div>
                    }


                </div>

                {this.props.isChangingStatus || this.props.isSavingPayment ?
                    (
                        this.props.isCallModal ?
                            (
                                <div>
                                    <button type="button" className="btn btn-success btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                    <button type="button" className="btn btn-danger btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                </div>
                            ) :
                            (
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <button className="btn btn-rose disabled">
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                    <button className="btn disabled">
                                        <i className="fa fa-spinner fa-spin"/> Đang cập nhật
                                    </button>
                                </div>
                            )
                    )
                    :
                    (
                        this.props.isCallModal ?
                            (
                                <div>
                                    <button type="button" className="btn btn-success btn-round"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.changeCallStatus(1, this.state.note, register.id, register.user.id);
                                            }}>
                                        <i className="material-icons">phone</i>
                                        Gọi thành công
                                    </button>
                                    <button type="button" className="btn btn-danger btn-round"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.changeCallStatus(0, this.state.note, register.id, register.user.id);
                                            }}>
                                        <i className="material-icons">phone</i>
                                        Không gọi được
                                    </button>
                                </div>
                            ) : (
                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                    <Button className="btn btn-rose"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.savePayment(this.state.money, register.id, register.user.id);
                                            }}>
                                        <i className="material-icons">save</i>
                                        Lưu
                                    </Button>
                                    <Button data-dismiss="modal"
                                            onClick={() => {
                                                this.props.closeCallModal();
                                            }}>
                                        <i className="material-icons">close</i>
                                        Hủy
                                    </Button>
                                </div>
                            )
                    )
                }
            </div>
        );
    }
}


CallModal.propTypes = {
    register: PropTypes.object.isRequired,
    isChangingStatus: PropTypes.bool.isRequired,
    isSavingPayment: PropTypes.bool.isRequired,
    isCallModal: PropTypes.bool.isRequired,
    registerManageRoomAction: PropTypes.object.isRequired,
    closeCallModal: PropTypes.func.isRequired,
    sumMoney: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isChangingStatus: state.registerManageRoom.isChangingStatus,
        isSavingPayment: state.registerManageRoom.isSavingPayment,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageRoomAction: bindActionCreators(registerManageRoomAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallModal);

