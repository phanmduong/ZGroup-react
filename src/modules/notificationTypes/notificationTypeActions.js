import * as types from '../../constants/actionTypes';
import * as notificationTypeApi from './notificationTypeApi';
import {showErrorNotification, showNotification, showTypeNotification} from "../../helpers/helper";


export function loadNotificationTypes(page, search) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_NOTIFICATION_TYPES});
        notificationTypeApi.loadNotificationType(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_NOTIFICATION_TYPES_SUCCESS,
                    notificationTypes: res.data.notification_types,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_NOTIFICATION_TYPES_ERROR
            });
        });
    };
}

export function deleteNotificationType(notificationTypeId, page, search) {
    return function (dispatch) {
        showTypeNotification("Đang xóa", "info");
        dispatch({type: types.BEGIN_DELETE_NOTIFICATION_TYPE});
        notificationTypeApi.deleteNotificationType(notificationTypeId)
            .then((res) => {
                if (res.data.status === 1) {
                    showNotification("Xóa thành công");
                    dispatch({
                        type: types.DELETE_NOTIFICATION_TYPE_SUCCESS,
                    });
                    dispatch(loadNotificationTypes(page, search));
                } else {
                    showErrorNotification(res.data.message);
                }

            }).catch(() => {
            showErrorNotification("Có lỗi xảy ra. Thử lại");
            dispatch({
                type: types.DELETE_NOTIFICATION_TYPE_ERROR
            });
        });
    };
}

export function storeNotificationType(notificationType, closeModal) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_STORE_NOTIFICATION_TYPE});

        if (notificationType.id) {
            notificationTypeApi.editNotificationType(notificationType)
                .then((res) => {
                    if (res.data.status === 1) {
                        showNotification("Sửa thành công");
                        closeModal();
                        dispatch({
                            type: types.STORE_NOTIFICATION_TYPE_SUCCESS,
                            notificationType: res.data.data.notification_type,
                            edit: true
                        });
                    } else {
                        showErrorNotification(res.data.message);
                        dispatch({
                            type: types.STORE_NOTIFICATION_TYPE_ERROR,
                        });
                    }
                })
                .catch(() => {
                    showErrorNotification("Có lỗi xảy ra. Thử lại");
                    dispatch({
                        type: types.STORE_NOTIFICATION_TYPE_ERROR,
                    });
                });
        } else {
            notificationTypeApi.createNotificationType(notificationType)
                .then((res) => {
                    if (res.data.status === 1) {
                        showNotification("Tạo thành công");
                        closeModal();
                        dispatch({
                            type: types.STORE_NOTIFICATION_TYPE_SUCCESS,
                            notificationType: res.data.data.notification_type,
                        });
                    } else {
                        showErrorNotification(res.data.message);
                        dispatch({
                            type: types.STORE_NOTIFICATION_TYPE_ERROR,
                        });
                    }
                })
                .catch(() => {
                    showErrorNotification("Có lỗi xảy ra. Thử lại")
                    dispatch({
                        type: types.STORE_NOTIFICATION_TYPE_ERROR,
                    });
                });
        }
    };
}

