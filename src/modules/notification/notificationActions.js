import * as types from '../../constants/actionTypes';
import * as notificationApi from './notificationApi';

export function loadMyNotification(page = 1) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_NOTIFICATIONS});
        notificationApi.loadMyNofitications(page)
            .then((res) => {
                const notifications = res.data.data.notifications;
                dispatch({
                    type: types.LOAD_NOTIFICATIONS_SUCCESS,
                    notifications,
                    unread: res.data.data.unread,
                    isEmpty: notifications.length === 0
                });
            });
    };
}

