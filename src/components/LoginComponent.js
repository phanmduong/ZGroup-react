import React from 'react';
import PropTypes from 'prop-types';
import FormInputText from './common/FormInputText';
import {LINK_LOGO_2} from '../constants/env';

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
            <div>
                <nav className="navbar navbar-primary navbar-transparent navbar-absolute">
                    <div className="container">
                        <div className="navbar-header">
                            <img src={LINK_LOGO_2}
                                 className="logo-header"
                            />
                        </div>
                    </div>
                </nav>
                <div className="wrapper wrapper-full-page">
                    <div className="full-page login-page">
                        <div className="full-page-background"
                             style={{backgroundImage: "url(http://d2xbg5ewmrmfml.cloudfront.net/web/login.jpeg)"}}/>
                        <div className="content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                                        <form id="form-login" onSubmit={(e) => {
                                            e.preventDefault();
                                        }}>
                                            <div className="card card-login card-hidden">
                                                <div className="card-header text-center" data-background-color="rose">
                                                    <a>
                                                        <h4 className="card-title">
                                                            <i className="material-icons">lock_open</i> Đăng nhập
                                                        </h4>
                                                    </a>
                                                </div>
                                                <div className="card-content">
                                                    <div className="input-group">
                                                        <span className="input-group-addon">
                                                            <i className="material-icons">face</i>
                                                        </span>
                                                        <FormInputText
                                                            name="email"
                                                            updateFormData={this.props.updateFormData}
                                                            label="Tên đăng nhập"
                                                            value={this.props.login.email}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">lock_outline</i>
                                            </span>
                                                        <FormInputText
                                                            name="password"
                                                            updateFormData={this.props.updateFormData}
                                                            label="Mật khẩu"
                                                            type="password"
                                                            required
                                                            value={this.props.login.password}
                                                            onKeyPress={this.pressEnterKey}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="footer text-center">
                                                    {
                                                        (!this.props.isLoading && this.props.token !== null && this.props.token !== '') ?
                                                        this.context.router.push('/') :
                                                        this.props.isLoading ?
                                                            (
                                                                <button type="submit"
                                                                        className="btn btn-rose btn-simple btn-wd btn-lg disabled">
                                                                    <i className="fa fa-spinner fa-spin"/> Đang đăng
                                                                    nhập
                                                                </button>
                                                            )
                                                            :
                                                            (
                                                                <button type="submit"
                                                                        className="btn btn-rose btn-simple btn-wd btn-lg"
                                                                        onClick={this.props.clickLogin}>
                                                                    Đăng nhập
                                                                </button>
                                                            )
                                                    }
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer className="footer">
                            <div className="container">
                                <nav className="pull-left">
                                    <ul>
                                        <li>
                                            <a href="#">
                                                Home
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Company
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Portfolio
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                Blog
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                                <p className="copyright pull-right">
                                    &copy;
                                    {
                                        new Date().getFullYear()
                                    }
                                    <a href="http://colorme.vn"> colorME</a>
                                </p>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>

        )
    }
}

LoginComponent.propTypes = {
    login: PropTypes.object.isRequired,
    updateFormData: PropTypes.func.isRequired,
    clickLogin: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    token: PropTypes.string

};

LoginComponent.contextTypes = {
    router: PropTypes.object
};

export default LoginComponent;
