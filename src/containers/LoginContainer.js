import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginComponent from '../components/LoginComponent';
// Import actions here!!
import * as loginActions from '../actions/loginActions';
import toastr from 'toastr';
import * as env from '../constants/env';

class LoginContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.updateFormData = this.updateFormData.bind(this);
        this.clickLogin = this.clickLogin.bind(this);
        this.state = {
            login: {
                email: '',
                password: ''
            },
            error: false,
            user: {
                role: -1
            }
        };
    }

    componentDidMount() {
        setTimeout(function() {
            // after 1000 ms we add the class animated to the login/register card
            $('.card').removeClass('card-hidden');
        }, 700);
        $('#form-login').validate({
            errorPlacement: function (error, element) {
                $(element).parent('div').addClass('has-error');
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.error,
            user: nextProps.user
        });
    }

    updateFormData(event) {
        const field = event.target.name;
        let login = this.state.login;
        login[field] = event.target.value;
        return this.setState({
            login: login
        });
    }

    clickLogin() {
        if ($('#form-login').valid()) {
            this.props.loginActions.updateFormData(this.state.login);
        }
    }

    render() {
        if (this.state.error && !this.props.isLoading) {
            toastr.error("Lỗi. Kiểm tra thông tin tài khoản");
            this.setState({
                error: false
            });
        }
        if (this.state.user && this.state.user.role === 0 && !this.props.isLoading) {
            toastr.error("Bạn không phải là nhân viên của" + env.NAME_COMPANY);
            this.setState({
                user: {
                    role: -1
                }
            });
        }
        return (
            <LoginComponent
                updateFormData={this.updateFormData}
                login={this.state.login}
                clickLogin={this.clickLogin}
                isLoading={this.props.isLoading}
                token={this.props.token}
                user={this.props.user}
            />
        );
    }
}

LoginContainer.propTypes = {
    loginActions: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    token: PropTypes.string
};

function mapStateToProps(state) {
    return {
        token: state.login.token,
        isLoading: state.login.isLoading,
        error: state.login.error,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        loginActions: bindActionCreators(loginActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
