import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import * as notificationActions from './notificationActions';
import Loading from "../../components/common/Loading";

class NotificationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.notificationActions.loadMyNotification();
    }

    render() {
        return (
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
                    <button className="btn btn-simple">Tải thêm</button>
                )}
            </ul>
        );
    }
}

NotificationContainer.propTypes = {
    notificationActions: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        notifications: state.notification.notificationList.notifications,
        isLoading: state.notification.notificationList.isLoading,
        isEmpty: state.notification.notificationList.isEmpty
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer);