import React from 'react';
import PropTypes from 'prop-types';
import * as helper from '../../../helpers/helper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as registerManageMeetingRoomAction from '../actions/registerManageMeetingRoomAction';
import {Modal} from "react-bootstrap";

class CallModal extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {note: ""};
        this.changeCallStatus = this.changeCallStatus.bind(this);
        this.closeCallModal = this.closeCallModal.bind(this);
    }


    changeCallStatus(status, note, register_id, user_id) {
        this.props.registerManageMeetingRoomAction.changeCallStatus(status, note, register_id, user_id, this.closeCallModal);
    }
    closeCallModal(){
        this.props.registerManageMeetingRoomAction.closeCallModal();
    }

    render() {
        let register = this.props.register;
        return (

            <Modal
                show={this.props.isOpenCallModal}
                bsStyle="primary"
                onHide={this.closeCallModal}
            >
                <Modal.Header />
                <Modal.Body>
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
                                                <b>&nbsp; &nbsp;{register.user.name} </b>
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
                                                &nbsp; &nbsp;{register.user.address && register.user.address}
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
                                            {"Lịch sử gọi điện"}
                                            <i className="material-icons">keyboard_arrow_down</i>
                                        </h4>
                                    </a>
                                </div>
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
                                                        </div>
                                                        <div className="timeline-body">
                                                            {history.note &&
                                                            <p className="flex-row-center">
                                                                <i className="material-icons">note</i>
                                                                &nbsp; &nbsp;{" " + history.note}
                                                            </p>}
                                                        </div>
                                                        <h6>
                                                            <i className="ti-time"/>
                                                            {helper.parseTime(history.created_at)}
                                                        </h6>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>

                            </div>


                            <div className="form-group label-floating is-empty">
                                <label className="control-label">Ghi chú</label>
                                <textarea className="form-control"
                                          value={this.state.note}
                                          onChange={(event) => this.setState({note: event.target.value})}/>
                            </div>


                        </div>

                        {this.props.isChangingStatus  ?

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
                            :
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

                        }
                    </div>

                </Modal.Body>
            </Modal>
        );
    }
}


CallModal.propTypes = {
    register: PropTypes.object.isRequired,
    isChangingStatus: PropTypes.bool.isRequired,
    isOpenCallModal: PropTypes.bool.isRequired,
    registerManageMeetingRoomAction: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isChangingStatus: state.registerManageMeetingRoom.isChangingStatus,
        register: state.registerManageMeetingRoom.register,
        isOpenCallModal: state.registerManageMeetingRoom.isOpenCallModal,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        registerManageMeetingRoomAction: bindActionCreators(registerManageMeetingRoomAction, dispatch)

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CallModal);

