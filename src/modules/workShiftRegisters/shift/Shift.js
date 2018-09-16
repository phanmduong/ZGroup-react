import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shiftRegisterActions from '../workShiftRegisterActions';
import UserShiftRegister from './UserShiftRegister';
import * as helper from '../../../helpers/helper';
import {NO_AVATAR} from '../../../constants/env';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";
import {Modal} from "react-bootstrap";
import {MAX_USER_SHOW_WORK_SHIFT} from "../../../constants/constants";

class Shift extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            showModalUser: false
        };
        this.onRegister = this.onRegister.bind(this);
        this.onRemoveRegister = this.onRemoveRegister.bind(this);
        this.closeModalUser = this.closeModalUser.bind(this);
        this.openModalUser = this.openModalUser.bind(this);


    }

    closeModalUser() {
        this.setState({showModalUser: false});
    }

    openModalUser() {
        this.setState({showModalUser: true});
    }

    onRegister() {
        if (this.props.shift.disable) return;
        this.props.shiftRegisterActions.register(this.props.shift.id);
    }

    onRemoveRegister() {
        if (this.props.shift.disable) return;
        this.props.shiftRegisterActions.removeRegister(this.props.shift.id);
    }

    renderUsers(users) {
        let maxUser = Math.min(MAX_USER_SHOW_WORK_SHIFT, users.length);
        return (
            <div className="cursor-pointer flex-row flex-justify-content-center" onClick={() => this.openModalUser()}>
                {
                    users.length - MAX_USER_SHOW_WORK_SHIFT > 0 &&
                    <div className="avatar-work-shift text-center" style={{lineHeight: '15px', fontWeight: '400'}}>
                        +{users.length - MAX_USER_SHOW_WORK_SHIFT}</div>
                }
                {users && users.slice(0, maxUser).map((user, index) => {
                    let avatar = helper.avatarEmpty(user.avatar_url) ?
                        NO_AVATAR : user.avatar_url;
                    return (
                        <TooltipButton placement="top" text={user.name} key={index}>
                            <div className="avatar-work-shift"
                                 style={{
                                     background: "url('" + avatar + "') center center / cover"
                                 }}
                            />
                        </TooltipButton>
                    );
                })}
                <Modal show={this.state.showModalUser} onHide={this.closeModalUser}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nhân viên đăng kí làm việc
                            ca {this.props.shift.name + ": " + this.props.shift.start_time + " - " + this.props.shift.end_time}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-rose">
                                <tr>
                                    <th/>
                                    <th>Họ và tên</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users && users.map((user, index) => {
                                    let avatar = helper.avatarEmpty(user.avatar_url) ?
                                        NO_AVATAR : user.avatar_url;
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <div className="avatar-list-staff"
                                                     style={{
                                                         background: 'url(' + avatar + ') center center / cover',
                                                         display: 'inline-block'
                                                     }}
                                                />
                                            </td>
                                            <td>{user ? user.name : ''}</td>
                                        </tr>

                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }

    render() {
        let {users, name, start_time, end_time, disable} = this.props.shift;
        const classDisable = disable ? " disabled" : "";
        let shift = this.props.shift;
        let user = users.filter((user) => user.id === this.props.user.id)[0];
        let avatar = user ? (helper.avatarEmpty(user.avatar_url) ? NO_AVATAR : user.avatar_url) : null;
        if (shift.isLoadingRegister) {
            return (
                <div>
                    <button className={"btn btn-success btn-main none-padding-horizontal disabled"}>
                        <div className="flex-row-center flex-justify-content-center" style={{height: '25px'}}>
                            <i className="fa fa-spinner fa-spin" style={{marginRight: '10px'}}/>
                            <div>Đang đăng kí lịch làm việc...</div>
                        </div>
                    </button>
                    {this.renderUsers(users)}
                </div>

            );
        } else if (shift.isLoadingRemoveRegister) {
            return (
                <div>
                    <button className={"btn btn-danger btn-main none-padding-horizontal disabled"}>
                        <div className="flex-row-center flex-justify-content-center" style={{height: '25px'}}>
                            <i className="fa fa-spinner fa-spin" style={{marginRight: '10px'}}/>
                            <div>Đang hủy lịch làm việc...</div>
                        </div>
                    </button>
                    {this.renderUsers(users)}
                </div>

            );
        } else if (user) {
            if (this.props.user.id === user.id) {
                return (
                    <div>
                        <UserShiftRegister
                            onClick={this.onRemoveRegister}
                            disable={classDisable}
                            title={shift.isLoadingRemoveRegisterError ? 'Hủy đăng kí thất bại. Thử lại.' : user.name}
                            avatarUrl={shift.isLoadingRemoveRegisterError ? null : avatar}
                            classNameButton="btn-danger"
                        />

                        {this.renderUsers(users)}
                    </div>
                );
            } else
                return (
                    <div>
                        <UserShiftRegister
                            disable={classDisable}
                            title={user.name}
                            avatarUrl={avatar}
                            classNameButton="btn-default"
                        />
                        {this.renderUsers(users)}
                    </div>
                );
        } else {
            return (
                <div>
                    <UserShiftRegister
                        disable={classDisable}
                        onClick={this.onRegister}
                        title={shift.isLoadingRegisterError ? "Đăng kí thất bại. Thử lại." : name + ": " + start_time + " - " + end_time}
                        classNameButton="btn-success"
                    />
                    {this.renderUsers(users)}
                </div>

            );
        }
    }
}


Shift.propTypes = {
    shiftRegisterActions: PropTypes.object.isRequired,
    shift: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,

};


function mapStateToProps(state) {
    return {
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        shiftRegisterActions: bindActionCreators(shiftRegisterActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shift);
