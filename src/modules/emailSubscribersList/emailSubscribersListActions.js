import * as types from "../../constants/actionTypes";
import * as emailSubcribersListApi from "./emailSubcribersListApi";
import * as helper from "../../helpers/helper";

/*eslint no-console: 0 */
export function loadSubscribersList(page, search) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_SUBSCRIBERS_LIST,
        });
        emailSubcribersListApi
            .loadSubscribersList(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_LIST_SUCCESS,
                    subscribersList: res.data.subscribers_list,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_LIST_ERROR,
                });
            });
    };
}

export function deleteSubscribersList(subscribersListId) {
    return function(dispatch) {
        helper.showTypeNotification("Đang xóa subscribers list", "info");
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_SUBSCRIBERS_LIST,
        });
        emailSubcribersListApi
            .deleteSubscribersList(subscribersListId)
            .then(() => {
                helper.showNotification("Xóa subscribers list thành công");
                dispatch({
                    type: types.DELETE_EMAIL_SUBSCRIBERS_LIST_SUCCESS,
                    subscribersListId,
                });
            })
            .catch(() => {
                helper.showNotification("Xóa subscribers list thất bại");
                dispatch({
                    type: types.DELETE_EMAIL_SUBSCRIBERS_LIST_ERROR,
                });
            });
    };
}

export function storeSubscribersList(subscribersList) {
    if (helper.isEmptyInput(subscribersList.id)) {
        subscribersList.id = "";
    }
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_STORE_EMAIL_SUBSCRIBERS_LIST,
        });
        emailSubcribersListApi
            .storeSubscribersList(subscribersList)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Tải lên thành công");
                    dispatch({
                        type: types.STORE_EMAIL_SUBSCRIBERS_LIST_SUCCESS,
                        subscribersList: res.data.data.subscribers_list,
                        edit: !helper.isEmptyInput(subscribersList.id),
                    });
                } else {
                    helper.showErrorNotification("Tải lên thất bại");
                    dispatch({
                        type: types.STORE_EMAIL_SUBSCRIBERS_LIST_ERROR,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Tải lên thất bại");
                dispatch({
                    type: types.STORE_EMAIL_SUBSCRIBERS_LIST_ERROR,
                });
            });
    };
}

export function showGlobalLoading() {
    return dispatch => {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING,
        });
    };
}

export function hideGlobalLoading() {
    return dispatch => {
        dispatch({
            type: types.HIDE_GLOBAL_LOADING,
        });
    };
}

export function loadSubscribers(listId, page, search, limit = 20) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_SUBSCRIBERS,
        });
        emailSubcribersListApi
            .loadSubscribers(listId, page, search, limit)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_SUCCESS,
                    subscribers: res.data.subscribers,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_ERROR,
                });
            });
    };
}

export function loadSubscribersListItem(listId) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_SUBSCRIBERS_LIST_ITEM,
        });
        emailSubcribersListApi
            .loadSubscribersListItem(listId)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_LIST_ITEM_SUCCESS,
                    subscribersListItem: res.data.data.subscribers_list_item,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_LIST_ITEM_ERROR,
                });
            });
    };
}

export function addSubscriber(listId, subscriber, closeModal) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_ADD_EMAIL_SUBSCRIBERS,
        });
        emailSubcribersListApi
            .addSubscriber(listId, subscriber)
            .then(() => {
                closeModal();
                dispatch(loadSubscribers(listId, 1, ""));
                helper.showNotification("Thêm email thành công");
                dispatch({
                    type: types.ADD_EMAIL_SUBSCRIBERS_SUCCESS,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.ADD_EMAIL_SUBSCRIBERS_ERROR,
                });
            });
    };
}

export function editSubscriber(subscriber, closeModal) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_ADD_EMAIL_SUBSCRIBERS,
        });
        emailSubcribersListApi
            .editSubscriber(subscriber)
            .then(res => {
                closeModal();
                dispatch({
                    type: types.ADD_EMAIL_SUBSCRIBERS_SUCCESS,
                    subscriber: res.data.data.subscriber,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.ADD_EMAIL_SUBSCRIBERS_ERROR,
                });
            });
    };
}

export function uploadFileSubscribers(listId, file, closeModal) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_ADD_EMAIL_SUBSCRIBERS,
        });
        emailSubcribersListApi.uploadFile(
            listId,
            file,
            function() {
                closeModal();
                dispatch(loadSubscribers(listId, 1, ""));
                helper.showNotification("Thêm email thành công");
                dispatch({
                    type: types.ADD_EMAIL_SUBSCRIBERS_SUCCESS,
                });
            },
            function() {
                dispatch({
                    type: types.ADD_EMAIL_SUBSCRIBERS_ERROR,
                });
            },
        );
    };
}

export function deleteSubscriber(listId, subscriberId) {
    return function(dispatch) {
        helper.showTypeNotification("Đang xóa email", "info");
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_SUBSCRIBER,
        });
        emailSubcribersListApi
            .deleteSubscriber(listId, subscriberId)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Xóa emai thành công");
                    dispatch({
                        type: types.DELETE_EMAIL_SUBSCRIBER_SUCCESS,
                        subscriberId: subscriberId,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                    dispatch({
                        type: types.DELETE_EMAIL_SUBSCRIBER_ERROR,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification("Xóa email thất bại");
                dispatch({
                    type: types.DELETE_EMAIL_SUBSCRIBER_ERROR,
                });
            });
    };
}

export function init() {
    return {
        type: types.INIT_FORM_EMAIL_SUBSCRIBERS_LIST,
    };
}
