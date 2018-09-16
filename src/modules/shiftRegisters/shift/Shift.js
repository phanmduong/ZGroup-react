import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as shiftRegisterActions from '../shiftRegisterActions';
import UserShiftRegister from './UserShiftRegister';
import * as helper from '../../../helpers/helper';
import {NO_AVATAR} from '../../../constants/env';
import PropTypes from 'prop-types';

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

    render() {
        let {user, name, start_time, end_time} = this.props.shift;
        let shift = this.props.shift;
        let avatar = user ? (helper.avatarEmpty(user.avatar_url) ? NO_AVATAR : user.avatar_url) : null;
        if (shift.isLoadingRegister) {
            return (

                <button className={"btn btn-success btn-main none-padding-horizontal disabled"}>
                    <div className="flex-row-center flex-justify-content-center" style={{height: '25px'}}>
                        <i className="fa fa-spinner fa-spin" style={{marginRight: '10px'}}/>
                        <div>Đang đăng kí lịch trực...</div>
                    </div>
                </button>
            );
        } else if (shift.isLoadingRemoveRegister) {
            return (

                <button className={"btn btn-danger btn-main none-padding-horizontal disabled"}>
                    <div className="flex-row-center flex-justify-content-center" style={{height: '25px'}}>
                        <i className="fa fa-spinner fa-spin" style={{marginRight: '10px'}}/>
                        <div>Đang hủy lịch trực...</div>
                    </div>
                </button>

            );
        } else if (user) {
            if (this.props.user.id === user.id) {
                return (

                    <UserShiftRegister
                        onClick={this.onRemoveRegister}
                        title={shift.isLoadingRemoveRegisterError ? 'Hủy đăng kí thất bại. Thử lại.' : user.name}
                        avatarUrl={shift.isLoadingRemoveRegisterError ? null : avatar}
                        classNameButton="btn-danger"
                    />

                );
            } else
                return (

                    <UserShiftRegister
                        title={user.name}
                        avatarUrl={avatar}
                        classNameButton="btn-default"
                    />

                );
        } else {
            return (
                <UserShiftRegister
                    onClick={this.onRegister}
                    title={shift.isLoadingRegisterError ? "Đăng kí thất bại. Thử lại." : name + ": " + start_time + " - " + end_time}
                    classNameButton="btn-success"
                />

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
