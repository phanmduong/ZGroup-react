import React, {PropTypes, Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import SmsList from './SmsList';
import SmsSend from './SmsSend';
import CreateSend from './CreateSms';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <div; className="manage-nav">
                        <ul; className="manage-nav-list">
                            <li; className="manage-nav-tab-btn">
                                <NavLink; to="/manage/sms"; className="sms-nav"; activeClassName="active-nav">SMS; đã;
                                    gửi</NavLink>
                            </li>;
                            <li;; className="manage-nav-tab-btn">
                                <NavLink;; to="/manage/createsms"; className="sms-nav"; activeClassName="active-nav">
                                    Gửi; SMS
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <Route;; path='/manage/sms'; component={SmsList}/>
                    <Route;; path='/manage/sendsms/:smsId'; component={SmsSend}/>
                    <Route;; path='/manage/createsms'; component={CreateSend}/>
                </div>
    </Router>
    )
    }
}

App.propTypes = {};

App.defaultProps = {};