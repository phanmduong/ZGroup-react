import React from 'react';
import {
    NAME_COMPANY,
    LOGO_SIDEBAR,
    NO_AVATAR
} from '../constants/env';
import Loading from "./common/Loading";
import PropTypes from 'prop-types';
import TabContainer from "../modules/tab/TabContainer";
import {
    Link
} from 'react-router';
import * as helper from '../helpers/helper';
import NotificationContainer from "../modules/notification/NotificationContainer";

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.
class App extends React.Component {

    render() {
        let avatar = helper.avatarEmpty(this.props.user ? this.props.user.avatar_url : '') ? NO_AVATAR : this.props.user.avatar_url;
        return (
            <div className="wrapper">
                <div className="sidebar" data-active-color="rose" data-background-color="white"
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
                                <div className="img"
                                     style={{
                                         background: 'url(' + avatar + ') center center / cover',
                                         width: '80px',
                                         height: '80px'
                                     }}
                                />
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="#collapseExample" className="collapsed">
                                    {this.props.user&&this.props.user.name}
                                    <b className="caret"/>
                                </a>
                                <div className="collapse" id="collapseExample">
                                    <ul className="nav">
                                        <li>
                                            <a href="/profile/my-profile">Trang cá nhân</a>
                                        </li>
                                    </ul>
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
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                    <span className="icon-bar"/>
                                </button>
                                <Link className="navbar-brand" to="/"> {NAME_COMPANY} </Link>
                            </div>
                            <div className="collapse navbar-collapse">
                                <ul className="nav navbar-nav navbar-right">
                                    <li>
                                        <a onClick={this.props.openModalRule}>
                                            <i className="material-icons">info</i>
                                            <p className="hidden-lg hidden-md">Quy định</p>
                                        </a>
                                    </li>
                                    <NotificationContainer/>
                                    <li>
                                        <a onClick={this.props.onLogOut} className="dropdown-toggle"
                                           data-toggle="dropdown">
                                            <i className="material-icons">exit_to_app</i>
                                            <p className="hidden-lg hidden-md">Đăng xuất</p>
                                        </a>
                                    </li>
                                    <li className="separator hidden-lg hidden-md"/>
                                </ul>
                                <form className="navbar-form navbar-right" role="search">
                                    <div className="form-group form-search is-empty">
                                        <input type="text" className="form-control" placeholder="Search"/>
                                        <span className="material-input"/>
                                    </div>
                                    <button type="submit" className="btn btn-white btn-round btn-just-icon">
                                        <i className="material-icons">search</i>
                                        <div className="ripple-container"/>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <div className="keetool-content">
                        <div className="container-fluid">
                            {!this.props.isLoadingTab ? this.props.children : <div id="loading-page"><Loading/></div>}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

App.propTypes = {
    children: PropTypes.element,
    pathname: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    onLogOut: PropTypes.func.isRequired,
    openModalRule: PropTypes.func.isRequired,
    isLoadingTab: PropTypes.bool,
};

export default App;