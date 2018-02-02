import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../helpers/helper';


class CallModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {note: ""};
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
                                    <div className="flex-row-center"><i
                                        className="material-icons">phone</i><b>&nbsp; &nbsp;{helper.formatPhone(register.user.phone)} </b>
                                    </div>
                                    <div className="flex-row-center"><i
                                        className="material-icons">email</i>&nbsp; &nbsp; {"thanghungkhi@gmail.com"}
                                    </div>
                                    {/*{this.state.register.university &&*/}
                                    {/*<div className="flex-row-center"><i*/}
                                    {/*className="material-icons">account_balance</i>&nbsp; &nbsp; {this.state.register.university}*/}
                                    {/*</div>*/}
                                    {/*}*/}
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
                                        {/*<b>&nbsp; &nbsp;{this.state.register.class.name.trim()} </b></div>*/}
                                        <b>&nbsp; &nbsp;{register.subscription.user_pack_name} </b></div>
                                    <div className="flex-row-center">
                                        <i className="material-icons">note</i>
                                        &nbsp; &nbsp; {"Nothing here"}
                                    </div>
                                    {/*<div className="flex-row-center">*/}
                                    {/*<i className="material-icons">home</i>&nbsp; &nbsp;*/}
                                    {/*{this.state.register.class.room + ' - ' + this.state.register.class.base}*/}
                                    {/*</div>*/}
                                    {/*<div className="flex-row-center">*/}
                                    {/*<i className="material-icons">date_range</i>&nbsp; &nbsp; {this.state.register.class.description}*/}
                                    {/*</div>*/}
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
                                    {/*<div className="timeline-badge">*/}
                                    {/*<img className="circle size-40-px"*/}
                                    {/*src={register.subscription.user_pack.avatar_url} alt=""/>*/}
                                    {/*</div>*/}
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
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Ghi chú</label>
                        <input type="text" className="form-control"
                               value={this.state.note}
                               onChange={(event) => this.setState({note: event.target.value})}/>
                        <span className="material-input"/>
                        <span className="material-input"/>
                    </div>

                </div>

                {this.props.isChangingStatus ?
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
                        this.props.isLoadingHistoryCall ?
                            (
                                <div>
                                    <button type="button" className="btn btn-success btn-round disabled"
                                            data-dismiss="modal"
                                    ><i className="material-icons">phone</i>
                                        Gọi thành công
                                    </button>
                                    <button type="button" className="btn btn-danger btn-round disabled"
                                            data-dismiss="modal"
                                    >
                                        <i className="material-icons">phone</i>
                                        Không gọi được
                                    </button>
                                </div>
                            )
                            :
                            (
                                <div>
                                    <button type="button" className="btn btn-success btn-round"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.changeCallStatusStudent(1, this.state.register.student_id);
                                            }}>
                                        <i className="material-icons">phone</i>
                                        Gọi thành công
                                    </button>
                                    <button type="button" className="btn btn-danger btn-round"
                                            data-dismiss="modal"
                                            onClick={() => {
                                                this.changeCallStatusStudent(0, this.state.register.student_id);
                                            }}>
                                        <i className="material-icons">phone</i>
                                        Không gọi được
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
    isLoadingHistoryCall: PropTypes.bool.isRequired,
};
export default CallModal;

