import * as types from '../../constants/actionTypes';
import * as sendNotificationApi from './sendNotificationApi';
import {showErrorNotification, showNotification} from "../../helpers/helper";


export function sendNotification(notificationTypeId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SEND_NOTIFICATION});
        sendNotificationApi.sendNotification(notificationTypeId)
            .then((res) => {
                if (res.data.status === 1) {
                    showNotification("Gửi thành công");
                    dispatch({
                        type: types.SEND_NOTIFICATION_SUCCESS,
                    });
                } else {
                    showErrorNotification(res.data.message);
                    dispatch({
                        type: types.SEND_NOTIFICATION_ERROR
                    });
                }
            }).catch(() => {
            dispatch({
                type: types.SEND_NOTIFICATION_ERROR
            });
        });
    };
}

