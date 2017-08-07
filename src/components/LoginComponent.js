import React from 'react';
import PropTypes from 'prop-types';

class LoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.pressEnterKey = this.pressEnterKey.bind(this);
    }

    pressEnterKey(target) {
        if (target.charCode === 13) {
            this.props.clickLogin();
        }
    }


    render() {
        return (
            <div className="container">
                <div className="card card-container">
                    <img id="profile-img" className="profile-img-card"
                         src="http://charitylabs.co.uk/wp-content/uploads/2012/12/The-Z-Principal.jpg"/>
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
                               id="inputPassword" className="form-control" placeholder="Password" required
                               onKeyPress={this.pressEnterKey}
                        />

                    </form>

                    {(!this.props.isLoading && this.props.token !== null && this.props.token !== '') ?
                        this.context.router.push('/') :
                        this.props.isLoading ? (
                            <button className="btn btn-primary btn-lg btn-block disabled btn-signin">
                                <i className="fa fa-spinner fa-spin"/> Đang đăng nhập</button>
                        ) : (<button className="btn btn-lg btn-primary btn-block btn-signin"
                                     onClick={this.props.clickLogin}>
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
