import * as types from './actionTypes';
import * as helper from "../../helpers/helper";
import * as campaignApi from "./campaignApi";

export function showAddMessageModal() {
    return ({
        type: types.TOGGLE_ADD_MESSAGE_MODAL
    });
}

export function showAddReceiverModal() {
    return ({
        type: types.TOGGLE_ADD_RECEIVER_MODAL
    });
}

export function upMessage(message) {
    return ({
        type: types.UPLOAD_MESSAGE,
        message
    });
}

export function saveMessage(campaignId, message) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_MESSAGE
        });
        campaignApi.saveMessageApi(campaignId, message)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Thêm tin nhắn thành công");
                    dispatch({
                        type: types.SAVE_MESSAGE_SUCCESS,
                        message

                    });
                } else
                    helper.showNotification(res.data.message);
            });
    };
}

export function loadTypeOfMessage() {
    return function (dispatch) {
        campaignApi.loadTypeOfMessageApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_TEMPLATE_SUCCESS,
                    template_types: res.data.data.template_types
                });
            });
    };
}

export function loadAllMessage(campaignId, page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_MESSAGE
        });
        campaignApi.loadAllMessageApi(campaignId, page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_MESSAGE_SUCCESS,
                    allMessage: res.data.templates,
                    currentPage: res.data.paginator.current_page,
                    limit: res.data.paginator.limit,
                    totalCount: res.data.paginator.total_count,
                    totalPages: res.data.paginator.total_pages
                });
            });
    };
}

export function editMessage(message) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_MESSAGE
        });
        campaignApi.editMessageApi(message)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Chỉnh sửa tin nhắn thành công");
                    dispatch({
                        type: types.EDIT_MESSAGE_SUCCESS,
                        message
                    });
                } else {
                    helper.showNotification(res.data.message);
                }
            });
    };
}