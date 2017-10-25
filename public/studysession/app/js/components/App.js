import React, {Component} from 'react';
import {BrowserRouter as Router, Route, NavLink} from 'react-router-dom';
import Schedule from './Schedule';
import StudySession from './StudySession';

export default class Menu extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div; className="manage-nav">
                        <ul; className="manage-nav-list">
                            <li; className="manage-nav-tab-btn">
                                <NavLink; to="/manage/studysession"; className="sms-nav"; activeClassName="active-nav">
                                    Ca; học
                                </NavLink>
                            </li>;
                            <li;; className="manage-nav-tab-btn">
                                <NavLink;; to="/manage/scheduleclass"; className="sms-nav"; activeClassName="active-nav">
                                    Lịch; học
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <Route;; path='/manage/studysession'; component={StudySession}/>
                    <Route;; path='/manage/scheduleclass'; component={Schedule}/>
                </div>
    </Router>
    )
    }
}