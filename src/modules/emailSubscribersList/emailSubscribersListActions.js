import * as types from '../../constants/actionTypes';
import * as emailSubcribersListApi from './emailSubcribersListApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */
export function loadSubscribersList(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_SUBSCRIBERS_LIST,
        });
        emailSubcribersListApi.loadSubscribersList(page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_LIST_SUCCESS,
                    subscribersList: res.data.subscribers_list,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
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
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa subscribers list", "info");
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_SUBSCRIBERS_LIST,
        });
        emailSubcribersListApi.deleteSubscribersList(subscribersListId)
            .then(() => {
                helper.showNotification('Xóa subscribers list thành công');
                dispatch({
                    type: types.DELETE_EMAIL_SUBSCRIBERS_LIST_SUCCESS,
                    subscribersListId
                });
            })
            .catch(() => {
                helper.showNotification('Xóa subscribers list thất bại');
                dispatch({
                    type: types.DELETE_EMAIL_SUBSCRIBERS_LIST_ERROR,
                });
            });
    };
}

export function storeSubscribersList(subscribersList, closeModal) {
    if (helper.isEmptyInput(subscribersList.id)) {
        subscribersList.id = '';
    }
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_EMAIL_SUBSCRIBERS_LIST,
        });
        emailSubcribersListApi.storeSubscribersList(subscribersList)
            .then(res => {
                closeModal();
                dispatch({
                    type: types.STORE_EMAIL_SUBSCRIBERS_LIST_SUCCESS,
                    subscribersList: res.data.data.subscribers_list,
                    edit: !helper.isEmptyInput(subscribersList.id)
                });
            })
            .catch(() => {
                dispatch({
                    type: types.STORE_EMAIL_SUBSCRIBERS_LIST_ERROR,
                });
            });
    };
}

export function loadSubscribers(listId, page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_SUBSCRIBERS,
        });
        emailSubcribersListApi.loadSubscribers(listId, page, search)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_SUCCESS,
                    subscribers: res.data.subscribers,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_SUBSCRIBERS_ERROR,
                });
            });
    };
}

export function addSubscribers(listId, emails, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_EMAIL_SUBSCRIBERS,
        });
        emailSubcribersListApi.addEmails(listId, emails)
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

export function deleteSubscriber(listId, subscriberId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa email", "info");
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_SUBSCRIBER,
        });
        emailSubcribersListApi.deleteSubscriber(listId, subscriberId)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Xóa emai thành công");
                    dispatch({
                        type: types.DELETE_EMAIL_SUBSCRIBER_SUCCESS,
                        subscriberId: subscriberId
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