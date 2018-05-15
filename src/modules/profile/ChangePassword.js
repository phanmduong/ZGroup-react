/**
 * Created by phanmduong on 11/23/17.
 */
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FormInputText from "../../components/common/FormInputText";
import * as profileActions from './profileActions';
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';

class ChangePassword extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            changePassword: {
                old_password: '',
                new_password: '',
                retype_new_password: '',
            }
        };
        this.updateFormData = this.updateFormData.bind(this);
        this.changePassword = this.changePassword.bind(this);
    }

    componentDidMount() {
        helper.setFormValidation('#form-change-password-staff');
    }

    updateFormData(event) {
        const field = event.target.name;
        let changePassword = {...this.state.changePassword};
        changePassword[field] = event.target.value;
        this.setState({
            changePassword: changePassword
        });
    }

    changePassword() {
        if ($('#form-change-password-staff').valid()) {
            if (this.state.changePassword.retype_new_password != this.state.changePassword.new_password) {
                helper.showTypeNotification("Mật khẩu nhập lại không khớp", "warning");
                return;
            }
            this.props.profileActions.changePassword(this.state.changePassword.old_password,
                this.state.changePassword.new_password,
                this.props.closeModal
            );
        }
    }

    render() {
        return (
            <form id="form-change-password-staff" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <FormInputText
                    label="Mật khẩu cũ"
                    name="old_password"
                    updateFormData={this.updateFormData}
                    value={this.state.changePassword.old_password}
                    required={true}
                    type="password"
                />
                <FormInputText
                    label="Mật khẩu mới"
                    name="new_password"
                    updateFormData={this.updateFormData}
                    value={this.state.changePassword.new_password}
                    required={true}
                    id="new-password"
                    type="password"
                />
                <FormInputText
                    label="Nhập lại mật khẩu"
                    name="retype_new_password"
                    updateFormData={this.updateFormData}
                    value={this.state.changePassword.retype_new_password}
                    required={true}
                    type="password"
                />
                {this.props.isChangingPassword ?
                    (
                        <button
                            className="btn btn-fill btn-rose disabled"
                        >
                            <i className="fa fa-spinner fa-spin"/> Đang thay đổi
                        </button>
                    )
                    :
                    (
                        <button
                            className="btn btn-fill btn-rose"
                            onClick={this.changePassword}
                        >
                            Thay đổi
                        </button>
                    )
                }

            </form>
        );
    }
}

ChangePassword.propTypes = {
    profile: PropTypes.object.isRequired,
    isChangingPassword: PropTypes.bool.isRequired,
    profileActions: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
    return {
        profile: state.profile.profile,
        isChangingPassword: state.profile.isChangingPassword
    };
}

function mapDispatchToProps(dispatch) {
    return {
        profileActions: bindActionCreators(profileActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
