import React, {PropTypes} from 'react';

class LoginComponent extends React.Component {
  constructor(props, context) {
    super(props, context);
  }


  render() {

    return (
      <div className="container">
        <div className="card card-container">
          <img id="profile-img" className="profile-img-card"
               src="http://d1j8r0kxyu9tj8.cloudfront.net/images/1475497465dkoRCgGRO68Lbsf.jpg"/>
          <p id="profile-name" className="profile-name-card"/>
          <form className="form-signin">
            <span id="reauth-email" className="reauth-email"/>
            <input type="email" id="inputEmail" className="form-control"
                   name="email"
                   value={this.props.login.email}
                   placeholder="Email" required
                   onChange={this.props.updateFormData}
                   autoFocus/>
            <input type="password"
                   name="password"
                   value={this.props.login.password}
                   onChange={this.props.updateFormData}
                   id="inputPassword" className="form-control" placeholder="Password" required/>

          </form>

          {(!this.props.isLoading && this.props.token != "") ?
            this.context.router.push('/'):
            this.props.isLoading ? (
                <button className="btn btn-primary btn-lg btn-block btn-signin"><i className="fa fa-spinner fa-spin"/>
                  Đang đăng nhập</button>
              ) : (<button className="btn btn-lg btn-primary btn-block btn-signin" onClick={this.props.clickLogin}>
                Đăng nhập</button>)}

          <a href="http://colorme.vn/password/reset" className="forgot-password" target="_blank">
            Quên mật khẩu?
          </a>
        </div>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  login: PropTypes.object.isRequired,
  updateFormData: PropTypes.func.isRequired,
  clickLogin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired

};

LoginComponent.contextTypes = {
  router: PropTypes.object
};

export default LoginComponent;
