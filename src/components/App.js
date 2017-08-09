import React from 'react';
import {Link} from 'react-router';
// import {NAME_COMPANY} from '../constants/env';
import Loading from "./common/Loading";
import PropTypes from 'prop-types';

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
                        <a href="http://www.creative-tim.com" className="simple-text">
                            Creative Tim
                        </a>
                    </div>
                    <div className="logo logo-mini">
                        <a href="http://www.creative-tim.com" className="simple-text">
                            Ct
                        </a>
                    </div>
                    <div className="sidebar-wrapper">
                        <div className="user">
                            <div className="photo">
                                <img
                                    src="http://d1j8r0kxyu9tj8.cloudfront.net/libs/material/assets/img/faces/avatar.jpg"/>
                            </div>
                            <div className="info">
                                <a data-toggle="collapse" href="#collapseExample" className="collapsed">
                                    Tania Andrew
                                    <b className="caret"></b>
                                </a>
                                <div className="collapse" id="collapseExample">
                                    <ul className="nav">
                                        <li>
                                            <a href="#">My Profile</a>
                                        </li>
                                        <li>
                                            <a href="#">Edit Profile</a>
                                        </li>
                                        <li>
                                            <a href="#">Settings</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        {this.props.isLoadingTab ?
                            <Loading/>
                            :
                            (
                                <ul className="nav">
                                    {this.props.tabsListData.map((tab, index) => {
                                        let checkDropdown = false;
                                        if (tab.parent_id === 0) {
                                            this.props.tabsListData.forEach((tabChild) => {
                                                if (tabChild.parent_id === tab.id && !checkDropdown) {
                                                    checkDropdown = true;
                                                }
                                            });
                                            if (checkDropdown) {
                                                return (
                                                    <li activeClassName="active" key={"keytabpar" + index}>
                                                        <a data-toggle="collapse" href={'#tab' + tab.id}>
                                                            <i className="material-icons">image</i>
                                                            <p>{tab.name}
                                                                <b className="caret">
                                                                </b>
                                                            </p>
                                                        </a>
                                                        <div className="collapse" id={'tab' + tab.id}>
                                                            <ul className="nav">
                                                                {
                                                                    this.props.tabsListData.map((tabChild, index) => {
                                                                        if (tabChild.parent_id === tab.id) {
                                                                            return (
                                                                                <li
                                                                                    key={"keytabchil" + index}>
                                                                                    <Link to={tabChild.url}
                                                                                          activeClassName="active">{tabChild.name}</Link>
                                                                                </li>
                                                                            );
                                                                        }
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </li>
                                                );
                                            } else {
                                                return (
                                                    <li key={"keytabpar" + index}>
                                                        <Link to={tab.url} activeClassName="active">
                                                            <i className="material-icons">image</i>
                                                            {tab.name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        }
                                    })}
                                </ul>






                            )
                        }

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
                                <a className="navbar-brand" href="#"> Template </a>
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
                                        <a href="#pablo" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="material-icons">person</i>
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
                                <script>
                                    document.write(new Date().getFullYear())
                                </script>
                                <a href="http://colorme.vn">Color ME</a>
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
    isLoadingTab: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onLogOut: PropTypes.func.isRequired,
    tabsListData: PropTypes.array.isRequired,
};

export default App;
