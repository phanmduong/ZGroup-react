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
        // return (
        //     <div className="container">
        //         <div className="card card-container">
        //             <img id="profile-img" className="profile-img-card"
        //                  src="http://charitylabs.co.uk/wp-content/uploads/2012/12/The-Z-Principal.jpg"/>
        //             <p id="profile-name" className="profile-name-card"/>
        //             <form className="form-signin">
        //                 <span id="reauth-email" className="reauth-email"/>
        //                 <input type="email" id="inputEmail" className="form-control"
        //                        name="email"
        //                        value={this.props.login.email}
        //                        placeholder="Email" required
        //                        onChange={this.props.updateFormData}
        //                        autoFocus/>
        //                 <input type="password"
        //                        name="password"
        //                        value={this.props.login.password}
        //                        onChange={this.props.updateFormData}
        //                        id="inputPassword" className="form-control" placeholder="Password" required
        //                        onKeyPress={this.pressEnterKey}
        //                 />
        //
        //             </form>
        //
        //             {(!this.props.isLoading && this.props.token !== null && this.props.token !== '') ?
        //                 this.context.router.push('/') :
        //                 this.props.isLoading ? (
        //                     <button className="btn btn-primary btn-lg btn-block disabled btn-signin">
        //                         <i className="fa fa-spinner fa-spin"/> Đang đăng nhập</button>
        //                 ) : (<button className="btn btn-lg btn-primary btn-block btn-signin"
        //                              onClick={this.props.clickLogin}>
        //                     Đăng nhập</button>)}
        //
        //             <a href="http://colorme.vn/password/reset" className="forgot-password" target="_blank">
        //                 Quên mật khẩu?
        //             </a>
        //         </div>
        //     </div>
        //
        return (
            <div>
                <nav className="navbar navbar-primary navbar-transparent navbar-absolute">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navigation-example-2">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href=" ../dashboard.html ">Material Dashboard Pro</a>
                        </div>
                        <div className="collapse navbar-collapse">
                            <ul className="nav navbar-nav navbar-right">
                                <li className=" active ">
                                    <a href="login.html">
                                        <i className="material-icons">fingerprint</i> Login
                                    </a>
                                </li>
                                <li className="">
                                    <a href="lock.html">
                                        <i className="material-icons">lock_open</i> Lock
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="wrapper wrapper-full-page">
                    <div className="full-page login-page">
                        <div className="full-page-background" style={{backgroundImage: "url(https://www.w3schools.com/css/img_fjords.jpg)"}}/>
                        <div className="content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                                        <form method="#" action="#">
                                            <div className="card card-login card-hidden">
                                                <div className="card-header text-center" data-background-color="rose">
                                                    <h4 className="card-title">Login</h4>
                                                    <div className="social-line">
                                                        <a href="#btn" className="btn btn-just-icon btn-simple">
                                                            <i className="fa fa-facebook-square"></i>
                                                        </a>
                                                        <a href="#pablo" className="btn btn-just-icon btn-simple">
                                                            <i className="fa fa-twitter"></i>
                                                        </a>
                                                        <a href="#eugen" className="btn btn-just-icon btn-simple">
                                                            <i className="fa fa-google-plus"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className="category text-center">
                                                    Or Be classNameical
                                                </p>
                                                <div className="card-content">
                                                    <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">face</i>
                                            </span>
                                                        <div className="form-group label-floating">
                                                            <label className="control-label">First Name</label>
                                                            <input type="text" className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">email</i>
                                            </span>
                                                        <div className="form-group label-floating">
                                                            <label className="control-label">Email address</label>
                                                            <input type="email" className="form-control"/>
                                                        </div>
                                                    </div>
                                                    <div className="input-group">
                                            <span className="input-group-addon">
                                                <i className="material-icons">lock_outline</i>
                                            </span>
                                                        <div className="form-group label-floating">
                                                            <label className="control-label">Password</label>
                                                            <input type="password" className="form-control"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer text-center">
                                                    <button type="submit" className="btn btn-rose btn-simple btn-wd btn-lg">Let's go</button>
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
