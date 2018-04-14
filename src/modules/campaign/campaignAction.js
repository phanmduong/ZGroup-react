import * as types from './CampaignActionTypes';
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
                    currentPageMessage: res.data.paginator.current_page,
                    limitMessage: res.data.paginator.limit,
                    totalCountMessage: res.data.paginator.total_count,
                    totalPagesMessage: res.data.paginator.total_pages,
                    campaignName: res.data.campaign.name,
                    campaign_needed_quantity: res.data.campaign.needed_quantity,
                });
            });
    };
}
export function loadTypeOfMessage() {
    return function (dispatch) {
        campaignApi.loadTypeOfMessageApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_TEMPLATE_SUCCESS,
                    template_types: res.data.template_types
                });
            });
    };
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


export function loadAllReceiver(campaignId, page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_RECEIVER
        });
        campaignApi.loadAllReceiverApi(campaignId, page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_RECEIVER_SUCCESS,
                    allReceiver: res.data.receivers,
                    currentPageReceiver: res.data.paginator.current_page,
                    limitReceiver: res.data.paginator.limit,
                    totalCountReceiver: res.data.paginator.total_count,
                    totalPagesReceiver: res.data.paginator.total_pages,
                });
            });
    };
}

