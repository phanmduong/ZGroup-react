import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginComponent from '../components/LoginComponent';
// Import actions here!!
import * as loginActions from '../actions/loginActions';
import toastr from 'toastr';

class LoginContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateFormData = this.updateFormData.bind(this);
    this.clickLogin = this.clickLogin.bind(this);
    this.state = {
      login: {},
      error: false,
      user:{
        role: -1
      }
    };
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
    this.props.loginActions.updateFormData(this.state.login);
  }

  render() {
    if (this.state.error && !this.props.isLoading) {
      toastr.error("Lỗi. Kiểm tra thông tin tài khoản");
      this.setState({
        error: false
      });
    }
    if (this.state.user.role == 0 && !this.props.isLoading){
      toastr.error("Bạn không phải là nhân viên của colorME");
      this.setState({
        user:{
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
  token: PropTypes.string.isRequired
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
    loginActions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
