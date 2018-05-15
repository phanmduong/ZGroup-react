import React from 'react';
import {MANAGE_BASE_URL} from "../../constants/env";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import * as notificationActions from "./notificationActions";
import {bindActionCreators} from 'redux';
import Loading from "../../components/common/Loading";
import * as helper from '../../helpers/helper';


class NotificationListContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            page: 1,
        };
        this.loadNotifications = this.loadNotifications.bind(this);
    }

    componentWillMount() {
        this.props.notificationActions.loadMyNotification();
    }


    loadNotifications() {
        this.setState({
            page: this.state.page + 1
        });
        this.props.notificationActions.loadMyNotification(this.state.page + 1);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-content">
                        <div className="tab-content">
                            <h4 className="card-title">
                                <strong>Thông báo của bạn</strong>
                            </h4>
                            <br/>
                            {
                                this.props.notifications.map((notification, index) => {
                                    if (!helper.isEmptyInput(notification.message)) {
                                        const backgroundColor = notification.seen === 2 ? "#fbfbfb" : "#f7f7f7";
                                        return (
                                            <div key={index} style={{backgroundColor}}>
                                                <br/>
                                                <a style={{color: "#565656", fontSize: "16px"}}
                                                   href={MANAGE_BASE_URL + "/notification/" + notification.id + "/redirect"}>
                                                    &ensp;&emsp;{//eslint-disable-next-line
                                                }<span dangerouslySetInnerHTML={{__html: notification.icon}}/>
                                                    &ensp;{//eslint-disable-next-line
                                                }<span dangerouslySetInnerHTML={{__html: notification.message}}/>

                                                </a>
                                                <hr/>
                                            </div>
                                        );
                                    }
                                })
                            }
                            {this.props.isLoading && <Loading/>}
                            {!this.props.isEmpty && !this.props.isLoading && (
                                <button
                                    onClick={this.loadNotifications}
                                    style={{width: "100%", fontSize: "14px", color: "#565656", fontWeight: "600"}}
                                    className="btn btn-simple">
                                    Tải thêm
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NotificationListContainer.propTypes = {
    notificationActions: PropTypes.object.isRequired,
    notifications: PropTypes.array.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
    return {
        notifications: state.notification.notificationList.notifications,
        isLoading: state.notification.notificationList.isLoading,
        isEmpty: state.notification.notificationList.isEmpty,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        notificationActions: bindActionCreators(notificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationListContainer);