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
                    reset: page === 1,
                    isEmpty: notifications.length === 0
                });
            });
    };
}

export function readAllNotifications() {
    return function (dispatch) {
        dispatch({type: types.READ_ALL_NOTIFICATIONS});
        notificationApi.readAllNofitications();
    };
}


export function newNotification(notification) {
    return function (dispatch) {
        dispatch({
            type: types.NEW_NOTIFICATION,
            notification
        });
    };
}
