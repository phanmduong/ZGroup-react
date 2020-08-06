import React from 'react';
import FormInputText from "../../components/common/FormInputText";
import * as helper from '../../helpers/helper';
import PropTypes from 'prop-types';
import * as profileApi from "../profile/profileApi";

class ChangePassword extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isChangingPassword: false,
            changePassword: {
                old_password: '',
                new_password: '',
                retype_new_password: '',
            }
        };
    }

    componentDidMount = () => {
        helper.setFormValidation('#form-change-password-staff');
    };

    updateFormData = (event) => {
        const field = event.target.name;
        let changePassword = {...this.state.changePassword};
        changePassword[field] = event.target.value;
        this.setState({
            changePassword: changePassword
        });
    }

    changePassword = () => {
        if ($('#form-change-password-staff').valid()) {
            if (this.state.changePassword.retype_new_password != this.state.changePassword.new_password) {
                helper.showTypeNotification("Mật khẩu nhập lại không khớp", "warning");
                return;
            }
            this.setState({isChangingPassword:true});
            profileApi.changePassword(this.state.changePassword.old_password,
                this.state.changePassword.new_password).then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.data.message);
                    this.props.closeModal();
                } else {
                    helper.showErrorNotification(res.data.message);

                }
            });
        }
    };

    render() {
        let {isChangingPassword} = this.state;
        return (
            <form id="form-change-password-staff" className="form-grey" onSubmit={(e) => {
                e.preventDefault();
            }}>
                <label>Mật khẩu cũ</label>
                <FormInputText
                    label=""
                    name="old_password"
                    updateFormData={this.updateFormData}
                    disabled={isChangingPassword}
                    value={this.state.changePassword.old_password}
                    required={true}
                    type="password"
                />
                <label>Mật khẩu mới</label>
                <FormInputText
                    label=""
                    name="new_password"
                    updateFormData={this.updateFormData}
                    disabled={isChangingPassword}
                    value={this.state.changePassword.new_password}
                    required={true}
                    id="new-password"
                    type="password"
                />
                <label>Nhập lại mật khẩu</label>
                <FormInputText
                    label=""
                    name="retype_new_password"
                    updateFormData={this.updateFormData}
                    disabled={isChangingPassword}
                    value={this.state.changePassword.retype_new_password}
                    required={true}
                    type="password"
                />
                <div className="flex-end flex">
                    {this.state.isChangingPassword ?
                        (
                            <button
                                className="btn btn-fill btn-rose disabled flex-end"
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
                </div>
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

export default (ChangePassword);
