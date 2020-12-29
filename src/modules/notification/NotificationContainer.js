import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as notificationActions from './notificationActions';
import Loading from "../../components/common/Loading";
import OutsideAlerter from '../../components/common/OutsideAlerter';
import socket from '../../services/socketio';
import "./notification.css";
import {CHANNEL} from '../../constants/env';
import {showNotificationMessage} from "../../helpers/helper";
import Avatar from "../../components/common/Avatar";

class NotificationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
            open: false
        };
        this.loadNotifications = this.loadNotifications.bind(this);
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.socketListen = this.socketListen.bind(this);
    }

    componentWillMount() {
        this.props.notificationActions.loadMyNotification();
        this.socketListen();
    }

    socketListen() {
        const channel = CHANNEL + ":notification";
        socket.on(channel, (data) => {
            const {message, link, receiver_id, actor_id, icon, color} = data;
            if (Number(receiver_id) === this.props.user.id && this.props.user.id !== actor_id) {
                showNotificationMessage(`<a href="${link}">${message}</a>`, icon, color);
                this.props.notificationActions.newNotification({
                    ...data,
                    url: link,
                    icon,
                    color
                });
            }
        });
    }

    loadNotifications() {
        this.setState({
            page: this.state.page + 1
        });
        this.props.notificationActions.loadMyNotification(this.state.page + 1);
    }

    toggle() {
        if (this.props.unread > 0) {
            this.props.notificationActions.readAllNotifications();
        }
        this.setState({
            open: !this.state.open
        });
    }

    close() {
        if (this.state.open) {
            this.toggle();
        }
    }

    render() {
        let className = "dropdown notification-dropdown";
        if (this.state.open) {
            className += " open";
        }
        return (
            <OutsideAlerter handle={this.close} className={className}>
                <a className="dropdown-toggle"
                   onClick={this.toggle}>
                    <i className="material-icons">notifications</i>
                    {this.props.unread > 0 && <span className="notification">{this.props.unread}</span>}
                    <p className="hidden-lg hidden-md">
                        Notifications
                        <b className="caret"/>
                    </p>
                </a>
                <ul className="dropdown-menu notification-list-wrapper">

                    {
                        this.props.notifications.map((notification, index) => {
                            const backgroundColor = notification.seen === 2 ? "#fff" : "#f5f5f5";
                            return (
                                <li key={index} style={{backgroundColor}}>
                                    {/*<a href={MANAGE_BASE_URL + "/notification/" + notification.id + "/redirect"} className="flex flex-row">*/}
                                    <a href={notification.url} className="flex flex-row">
                                        <Avatar size={50} url={notification.image_url} style={{borderRadius: "50%"}}/>
                                        <div style={{marginLeft: 10}}>
                                            <div className="notification-item"
                                                 dangerouslySetInnerHTML={{__html: notification.message}}/>
                                            <div>
                                                {notification.created_at}
                                            </div>
                                        </div>

                                    </a>
                                </li>
                            );
                        })}
                    {this.props.isLoading && <li><Loading/></li>}
                    {!this.props.isEmpty && !this.props.isLoading && (
                        <button
                            onClick={this.loadNotifications}
                            style={{width: "100%"}}
                            className="btn btn-simple">
                            Tải thêm
                        </button>
                    )}

                </ul>
            </OutsideAlerter>


        );
    }
}

NotificationContainer.propTypes = {
    notificationActions: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    unread: PropTypes.number.isRequired,
    user: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        notifications: state.notification.notificationList.notifications,
        isLoading: state.notification.notificationList.isLoading,
        isEmpty: state.notification.notificationList.isEmpty,
        unread: state.notification.notificationList.unread,
        user: state.login.user
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);
