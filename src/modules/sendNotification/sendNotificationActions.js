import * as types from '../../constants/actionTypes';
import * as sendNotificationApi from './sendNotificationApi';
import {showErrorNotification, showNotification} from "../../helpers/helper";


export function sendNotification(notificationTypeId, name, sendTime, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SEND_NOTIFICATION});
        sendNotificationApi.sendNotification(notificationTypeId, name, sendTime, closeModal)
            .then((res) => {
                if (res.data.status === 1) {
                    showNotification("Gửi thành công");
                    dispatch(loadHistoryNotifications(1, ''));
                    closeModal();
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
            showErrorNotification("Có lỗi xảy ra. Thử lại");
            dispatch({
                type: types.SEND_NOTIFICATION_ERROR
            });
        });
    };
}

export function loadHistoryNotifications(page, search) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_HISTORY_NOTIFICATION});
        sendNotificationApi.loadHistoryNotifications(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_HISTORY_NOTIFICATION_SUCCESS,
                    historyNotifications: res.data.history_notifications,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_HISTORY_NOTIFICATION_ERROR
            });
        });
    };
}

