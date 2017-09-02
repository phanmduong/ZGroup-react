import * as types from '../../constants/actionTypes';
import * as notificationApi from './notificationApi';

export function loadMyNotification() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_NOTIFICATIONS});
        notificationApi.loadMyNofitications()
            .then((res) => {
                const notifications = res.data.data.notifications;
                dispatch({
                    type: types.LOAD_NOTIFICATIONS_SUCCESS,
                    notifications,
                    isEmpty: notifications.length === 0
                });
            });
    };
}

