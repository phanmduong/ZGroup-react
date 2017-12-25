import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shiftRegisterActions from '../workShiftRegisterActions';
import UserShiftRegister from './UserShiftRegister';
import * as helper from '../../../helpers/helper';
import {NO_AVATAR} from '../../../constants/env';
import PropTypes from 'prop-types';
import TooltipButton from "../../../components/common/TooltipButton";

class Shift extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.onRegister = this.onRegister.bind(this);
        this.onRemoveRegister = this.onRemoveRegister.bind(this);
    }

    onRegister() {
        this.props.shiftRegisterActions.register(this.props.shift.id);
    }

    onRemoveRegister() {
        this.props.shiftRegisterActions.removeRegister(this.props.shift.id);
    }

    renderUsers(users) {
        return (
            <div>
                {users && users.map((user) => {
                    let avatar = helper.avatarEmpty(user.avatar_url) ?
                        NO_AVATAR : user.avatar_url;
                    return (
                        <TooltipButton placement="top" text={user.name}>
                            <div className="avatar-work-shift"
                                 style={{
                                     background: "url('" + avatar + "') center center / cover"
                                 }}
                            />
                        </TooltipButton>

                    )
                })}
            </div>
        )
    }

    render() {
        let {users, name, start_time, end_time} = this.props.shift;
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
