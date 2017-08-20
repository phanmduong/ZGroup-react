import React from 'react';
import {NAME_COMPANY, LOGO_SIDEBAR} from '../constants/env';
import Loading from "./common/Loading";
import PropTypes from 'prop-types';
import TabContainer from "../modules/tab/TabContainer";
import {Link} from 'react-router';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

    render() {
        return (
            <div className="wrapper">
                <div className="sidebar" data-active-color="rose" data-background-color="black"
                     data-image="http://d1j8r0kxyu9tj8.cloudfront.net/libs/material/assets/img/sidebar-1.jpg">
                    <div className="logo">
                        <Link to="/" className="simple-text">
                            {NAME_COMPANY}
                        </Link>
                    </div>
                    <div className="logo logo-mini">
                        <Link to="/" className="simple-text">
                            <img src={LOGO_SIDEBAR} className="logo-sidebar"/>
                        </Link>
                    </div>
                    <div className="sidebar-wrapper">
                        <div className="user">
                            <div className="photo">
                                <img
                                    src={this.props.user.avatar_url}/>
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="#collapseExample" className="collapsed">
                                    {this.props.user.name}
                                    <b className="caret"></b>
                                </a>
                                <div className="collapse" id="collapseExample">
                                    <ul className="nav">
                                        <li>
                                            <a onClick={this.props.onLogOut}>Đăng xuất</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>


                        <TabContainer
                            pathname={this.props.pathname}
                        />

                    </div>
                </div>
                <div className="main-panel">
                    <nav className="navbar navbar-transparent navbar-absolute">
                        <div className="container-fluid">
                            <div className="navbar-minimize">
                                <button id="minimizeSidebar" className="btn btn-round btn-white btn-fill btn-just-icon">
                                    <i className="material-icons visible-on-sidebar-regular">more_vert</i>
                                    <i className="material-icons visible-on-sidebar-mini">view_list</i>
                                </button>
                            </div>
                            <div className="navbar-header">
                                <button type="button" className="navbar-toggle" data-toggle="collapse">
                                    <span className="sr-only">Toggle navigation</span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                    <span className="icon-bar"></span>
                                </button>
                                <Link className="navbar-brand" to="/"> {NAME_COMPANY} </Link>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="material-icons">dashboard</i>
                                            <p className="hidden-lg hidden-md">Dashboard</p>
                                        </a>
                                    </li>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="material-icons">notifications</i>
                                            <span className="notification">5</span>
                                            <p className="hidden-lg hidden-md">
                                                Notifications
                                                <b className="caret"></b>
                                            </p>
                                        </a>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a href="#">Mike John responded to your email</a>
                                            </li>
                                            <li>
                                                <a href="#">You have 5 new tasks</a>
                                            </li>
                                            <li>
                                                <a href="#">You're now friend with Andrew</a>
                                            </li>
                                            <li>
                                                <a href="#">Another Notification</a>
                                            </li>
                                            <li>
                                                <a href="#">Another One</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a onClick={this.props.onLogOut} className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="material-icons">exit_to_app</i>
                                            <p className="hidden-lg hidden-md">Profile</p>
                                        </a>
                                    </li>
                                    <li className="separator hidden-lg hidden-md"></li>
                                </ul>
                                <form className="navbar-form navbar-right" role="search">
                                    <div className="form-group form-search is-empty">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                        <span className="material-input"></span>
                                    </div>
                                    <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                        <i className="material-icons">search</i>
                                        <div className="ripple-container"></div>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <div className="content">
                        <div className="container-fluid">
                            {!this.props.isLoadingTab ? this.props.children : <div id="loading-page"><Loading/></div>}
                        </div>
                    </div>

                    <footer className="footer">
                        <div className="container-fluid">
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
                                <a href="http://colorme.vn"> color ME</a>
                            </p>
                        </div>
                    </footer>
                </div>
            </div>

        );
    }
}

App.propTypes = {
    children: PropTypes.element,
    pathname: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    onLogOut: PropTypes.func.isRequired
};

export default App;
