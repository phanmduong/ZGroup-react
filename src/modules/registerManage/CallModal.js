import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerManageAction from './registerManageAction';
// import Avatar from '../../components/common/Avatar';


class CallModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {note: "", money: null, sumMoney: this.props.sumMoney};
        this.changeCallStatus = this.changeCallStatus.bind(this);
        this.savePayment = this.savePayment.bind(this);
        this.changeMoney = this.changeMoney.bind(this);
    }


    changeCallStatus(status, note, register_id, user_id) {
        this.props.registerManageAction.changeCallStatus(status, note, register_id, user_id, this.props.closeCallModal);
    }

    savePayment(money, register_id, user_id) {

        if (this.state.money === null || this.state.money === undefined || this.state.money === '') {
            helper.showTypeNotification("Vui lòng điền số tiền", 'warning');
        }
        else {
            this.props.registerManageAction.savePayment(money, register_id, user_id, this.props.closeCallModal);
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
                                        <b>&nbsp; &nbsp;{register.subscription.user_pack_name} </b></div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">note</i>
                                        &nbsp; &nbsp; {"Nothing here"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="panel panel-default">
                        <div className="panel-heading" role="tab" id="headingThree">
                            <a className="collapsed" role="button" data-toggle="collapse"
                               data-parent="#accordion" href="#collapseThree" aria-expanded="false"
                               aria-controls="collapseThree">
                                <h4 className="panel-title">
                                    Thông tin gói đăng kí
                                    <i className="material-icons">keyboard_arrow_down</i>
                                </h4>
                            </a>
                        </div>

                        <div id="collapseThree" className="panel-collapse collapse" role="tabpanel"
                             aria-labelledby="headingThree" aria-expanded="false" style={{height: '0px'}}>
                            <ul className="timeline timeline-simple">

                                <li className="timeline-inverted" key={register.id}>
                                    <div className={"timeline-badge " + "success"}>
                                        <i className="material-icons">card_giftcard</i>
                                    </div>
                                    <div className="timeline-panel">
                                        <div className="timeline-body">
                                            <div className="flex-row-center">
                                                <i className="material-icons">attach_money</i>
                                                <b>{helper.dotNumber(register.subscription.price)}đ</b>
                                            </div>
                                            <div className="flex-row-center">
                                                <i className="material-icons">access_time</i>
                                                &nbsp; &nbsp; {"  " + register.subscription.hours + " giờ"}
                                            </div>
                                            <div className="flex-row-center" style={{display: "inline-block"}}>
                                                <i className="material-icons">date_range</i>&nbsp; &nbsp; {register.subscription.description}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
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

                                                                    {/*{payment.staff.avatar_url ?*/}
                                                                            {/*<Avatar size={40}*/}
                                                                                    {/*url={helper.prefixAvatarUrl(payment.staff.avatar_url)*/}
                                                                                        {/*? "http://" + payment.staff.avatar_url :*/}
                                                                                        {/*payment.staff.avatar_url}*/}
                                                                                    {/*style={{borderRadius: 6}}/> : null}*/}
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
                                                        {parseInt(this.props.register.subscription.price) + " đ"}
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
                                                        {this.state.sumMoney + " đ"}
                                                    </div>
                                                </div>
                                                {this.props.register.subscription.price - this.state.sumMoney > 0 ?
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
                                                            {parseInt(this.props.register.subscription.price) - this.state.sumMoney + " đ"}
                                                        </div>
                                                    </div> :
                                                    <div style={{
                                                        display: "flex",
                                                        justifyContent: "space-between"
                                                    }}>
                                                        <h4><b>Đã thừa</b></h4>
                                                        <div style={{
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            flexDirection: "column",
                                                            fontSize: 20
                                                        }}>
                                                            {this.state.sumMoney - parseInt(this.props.register.subscription.price) + " đ"}
                                                        </div>
                                                    </div>
                                                }

                                            </div>
                                        </div>
                                    )}
                        </div>

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
                                <div>
                                    <button type="button" className="btn btn-success btn-round"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.savePayment(this.state.money, register.id, register.user.id);
                                            }}>
                                        <i className="material-icons">save</i>
                                        Lưu
                                    </button>
                                    <button type="button" className="btn btn-danger btn-round"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.props.closeCallModal();
                                            }}>
                                        <i className="material-icons">close</i>
                                        Hủy
                                    </button>
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
    registerManageAction: PropTypes.object.isRequired,
    closeCallModal: PropTypes.func.isRequired,
    sumMoney: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
    return {
        isChangingStatus: state.registerManage.isChangingStatus,
        isSavingPayment: state.registerManage.isSavingPayment,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageAction: bindActionCreators(registerManageAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallModal);

