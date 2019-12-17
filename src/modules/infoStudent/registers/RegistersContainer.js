/**
 * Created by phanmduong on 9/1/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as studentActions from '../studentActions';
import Loading from '../../../components/common/Loading';
import * as helper from '../../../helpers/helper';
import PropTypes from 'prop-types';
import CallRegisterOverlay from "../overlays/CallRegisterOverlay";
import ExtraRegisterOverlay from "../overlays/ExtraRegisterOverlay";
import ChangePassword from "../ChangePassword";
import {Modal} from 'react-bootstrap';
import MoneyRegisterOverlay from "../overlays/MoneyRegisterOverlay";
import StatusesOverlay from "../overlays/StatusesOverlay";

class RegistersContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {};
        this.studentId = this.props.params ? this.props.params.studentId : this.props.studentId;
    }

    componentWillMount() {
        this.props.studentActions.loadRegisters(this.studentId);
    }

    closeModalChangePassword = () => {
        this.setState({showModalChangePassword: false});
    };

    openModalChangePassword = () => {
        this.setState({showModalChangePassword: true});
    };
    reload = ()=>{
        this.props.studentActions.loadRegisters(this.studentId);
    }
    render() {
        return (
            <div className="tab-pane active">

                {this.props.isLoadingRegisters ? <Loading/>
                    :
                    <ul className="timeline timeline-simple time-line-register">
                        {
                            this.props.registers.map((register, index) => {
                                return (
                                    <li className="timeline-inverted" key={index}>
                                        <div className="timeline-badge">
                                            <img className="circle" src={register.class.avatar_url} alt=""/>
                                        </div>
                                        <div className="timeline-panel">
                                            <div className="flex">
                                                <h4>
                                                    <b>{register.class.name}</b>
                                                </h4>
                                                <div className="timeline-heading margin-left-15">
                                                    <div className="flex-row-center">
                                                        {
                                                            register.saler &&
                                                            <button className="btn btn-xs"
                                                                    style={{backgroundColor: '#' + register.saler.color}}
                                                            >
                                                                {helper.getShortName(register.saler.name)}
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        }
                                                        {
                                                            register.campaign &&
                                                            <button className="btn btn-xs"
                                                                    style={{backgroundColor: '#' + register.campaign.color}}
                                                            >
                                                                {helper.getShortName(register.campaign.name)}
                                                                <div className="ripple-container"/>
                                                            </button>
                                                        }
                                                        <StatusesOverlay
                                                            data={register.register_status || {}}
                                                            refId={register.id}
                                                            statusRef="registers"
                                                            className="status-overlay btn-xs"
                                                        />
                                                        {/*{*/}
                                                        {/*    register.paid_status ?*/}
                                                        {/*        (*/}
                                                        {/*            <button className="btn btn-xs btn-rose"*/}
                                                        {/*                    style={{width: '70px'}}*/}
                                                        {/*            >*/}
                                                        {/*                {register.money}*/}
                                                        {/*                <div className="ripple-container"/>*/}
                                                        {/*            </button>*/}
                                                        {/*        )*/}
                                                        {/*        :*/}
                                                        {/*        (*/}
                                                        {/*            <button className="btn btn-xs btn-rose"*/}
                                                        {/*            >*/}
                                                        {/*                Chưa đóng*/}
                                                        {/*                <div className="ripple-container"/>*/}
                                                        {/*            </button>*/}
                                                        {/*        )*/}
                                                        {/*}*/}

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="timeline-body">
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    &nbsp; &nbsp;Đăng kí {register.created_at_cal}
                                                </div>
                                                <div className="flex-row-center">
                                                    <i className="material-icons">access_time</i>
                                                    <b>&nbsp; &nbsp; {register.class.study_time} </b>
                                                </div>
                                                <div className="flex-row-center">
                                                    <i className="material-icons">home</i>&nbsp; &nbsp;
                                                    {register.class.room && register.class.room + ' - '}
                                                    {register.class.base}
                                                </div>
                                                <div className="flex-row-center">
                                                    <i className="material-icons">date_range</i>&nbsp; &nbsp; {register.class.description}
                                                </div>

                                                {
                                                    register.class.teach &&
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">account_box
                                                        </i>&nbsp; &nbsp; Giảng viên: {register.class.teach.name}
                                                    </div>
                                                }
                                                {
                                                    register.class.assist &&
                                                    <div className="flex-row-center">
                                                        <i className="material-icons">account_box
                                                        </i>&nbsp; &nbsp; Trợ giảng: {register.class.assist.name}
                                                    </div>
                                                }
                                                <div className="flex flex-wrap margin-vertical-30">
                                                    <CallRegisterOverlay
                                                        studentId={this.studentId}
                                                        register={register}
                                                    />

                                                    <MoneyRegisterOverlay
                                                        studentId={this.studentId}
                                                        register={register}
                                                        reload={this.reload}
                                                    />
                                                    <ExtraRegisterOverlay
                                                        register={register}
                                                        // openModalChangePassword={this.openModalChangePassword}
                                                        studentId={this.studentId}
                                                        reload={this.reload}
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                }
                <Modal show={this.state.showModalChangePassword}>
                    <Modal.Header closeButton={!this.props.isChangingPassword}
                                  onHide={this.props.isChangingPassword ? '' : this.closeModalChangePassword}
                                  closeLabel="Đóng">
                        <Modal.Title>Thay đổi mật khẩu</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ChangePassword
                            studentId={this.studentId}
                            closeModal={this.closeModalChangePassword}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

RegistersContainer.propTypes = {
    registers: PropTypes.array.isRequired,
    studentActions: PropTypes.object.isRequired,
    isLoadingRegisters: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
    return {
        registers: state.infoStudent.registers,
        isChangingPassword: state.infoStudent.isChangingPassword,
        isLoadingRegisters: state.infoStudent.isLoadingRegisters
    };
}

function mapDispatchToProps(dispatch) {
    return {
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegistersContainer);
