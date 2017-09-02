import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as notificationActions from './notificationActions';
import Loading from "../../components/common/Loading";
import OutsideAlerter from '../../components/common/OutsideAlerter';
import "./notification.css";

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
    }

    componentWillMount() {
        this.props.notificationActions.loadMyNotification();
    }

    loadNotifications(event) {
        event.stopPropagation();
        event.preventDefault();
        this.setState({
            page: this.state.page + 1
        });
        this.props.notificationActions.loadMyNotification(this.state.page + 1);
    }

    toggle() {
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
                    <span className="notification">{this.props.unread}</span>
                    <p className="hidden-lg hidden-md">
                        Notifications
                        <b className="caret"/>
                    </p>
                </a>

                <ul className="dropdown-menu">

                    {
                        this.props.notifications.map((notification) => {
                            return (
                                <li key={notification.id}>
                                    <a href={notification.url}>{notification.message}</a>
                                </li>
                            );
                        })
                    }
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
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        notifications: state.notification.notificationList.notifications,
        isLoading: state.notification.notificationList.isLoading,
        isEmpty: state.notification.notificationList.isEmpty,
        unread: state.notification.notificationList.unread
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);