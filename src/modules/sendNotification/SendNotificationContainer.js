import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import ReactSelect from 'react-select';
import * as sendNotificationApi from './sendNotificationApi';
import * as sendNotificationActions from './sendNotificationActions';
import FormInputText from "../../components/common/FormInputText";
import {setFormValidation} from "../../helpers/helper";
import FormInputDateTime from "../../components/common/FormInputDateTime";

class SendNotificationContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedNotificationType: null,
            name: '',
            send_time: ''
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
        setFormValidation("#form-send-notification-type");
        if ($('#form-send-notification-type').valid()) {
            this.props.sendNotificationActions.sendNotification(this.state.selectedNotificationType.id, this.state.name, this.state.send_time, this.props.closeModal);
        }
    }

    render() {
        return (
            <div>
                <form id="form-send-notification-type">
                    <FormInputText
                        label="Tên"
                        name="name"
                        updateFormData={(event) => {
                            this.setState({name: event.target.value});
                        }}
                        value={this.state.name}
                        required={true}
                    />
                </form>
                <div className="form-group">
                    <label className="label-control">Mẫu thông báo</label>
                    <ReactSelect.Async
                        loadOptions={this.loadNotificationTypes}
                        loadingPlaceholder="Đang tải..."
                        placeholder="Chọn loại thông báo"
                        searchPromptText="Không có dữ liệu thông báo"
                        onChange={this.selectNotificationType}
                        value={this.state.selectedNotificationType}
                    />
                </div>
                <FormInputDateTime
                    label={"Thời gian gửi"}
                    id={'send_time_notification'}
                    value={this.state.send_time}
                    updateFormData={(event) => this.setState({send_time: event.target.value})}/>
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
    closeModal: PropTypes.func.isRequired,
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