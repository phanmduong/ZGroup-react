import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import * as sendNotificationApi from './sendNotificationApi';
import * as sendNotificationActions from './sendNotificationActions';

class SendNotificationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedNotificationType: null
        };
        this.loadNotificationTypes = this.loadNotificationTypes.bind(this);
        this.selectNotificationType = this.selectNotificationType.bind(this);
        this.sendNotification = this.sendNotification.bind(this);
        this.timeOut = null;
    }

    loadNotificationTypes(input, callback) {
        if (this.timeOut !== null) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(function () {
            sendNotificationApi.loadNotificationType(1, input).then(res => {
                let notificationTypes = res.data.notification_types.map((notificationType) => {
                    return {
                        ...notificationType,
                        ...{
                            value: notificationType.id,
                            label: notificationType.name,
                        }
                    };
                });
                callback(null, {options: notificationTypes, complete: true});
            });
        }.bind(this), 500);
    }

    selectNotificationType(value) {
        this.setState({
            selectedNotificationType: value
        });
    }

    sendNotification() {
        this.props.sendNotificationActions.sendNotification(this.state.selectedNotificationType.id);
    }

    render() {
        return (
            <div>
                <ReactSelect.Async
                    loadOptions={this.loadNotificationTypes}
                    loadingPlaceholder="Đang tải..."
                    placeholder="Chọn loại thông báo"
                    searchPromptText="Không có dữ liệu thông báo"
                    onChange={this.selectNotificationType}
                    value={this.state.selectedNotificationType}
                />
                {this.props.isSending ?
                    (
                        <button className="btn btn-fill btn-rose disabled" type="button">
                            <i className="fa fa-spinner fa-spin"/> Đang gửi
                        </button>
                    )
                    :
                    (
                        (this.state.selectedNotificationType ?
                                <button className="btn btn-fill btn-rose"
                                        type="button" onClick={this.sendNotification}>Gửi
                                </button>
                                :
                                <button className="btn btn-fill btn-rose disabled" type="button">
                                    Gửi
                                </button>

                        )

                    )
                }
            </div>
        );
    }
}

SendNotificationContainer.propTypes = {
    isSending: PropTypes.bool.isRequired,
    sendNotificationActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
    return {
        isSending: state.sendNotification.isSending
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendNotificationActions: bindActionCreators(sendNotificationActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SendNotificationContainer);