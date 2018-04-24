import * as types from './CampaignActionTypes';
import * as campaignApi from "./campaignApi";
import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../constants/actionTypes";
import {showNotification, showTypeNotification} from "../../helpers/helper";

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
                    template_types: res.data.data.template_types
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
                    showNotification("Thêm tin nhắn thành công");
                    dispatch({
                        type: types.SAVE_MESSAGE_SUCCESS,
                        message

                    });
                } else
                    showNotification(res.data.message);
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
                    showNotification("Chỉnh sửa tin nhắn thành công");
                    dispatch({
                        type: types.EDIT_MESSAGE_SUCCESS,
                        message
                    });
                } else {
                    showNotification(res.data.message);
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

export function getReceiversModal(campaignId, page, gens, classes, start_time, end_time, top, carer_id, rate, limit) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_RECEIVERS_MODAL
        });
        campaignApi.getReceiversModal(campaignId, page, gens, classes, start_time, end_time, top, carer_id, rate, limit)
            .then((res) => {
                dispatch({
                    type: types.LOAD_RECEIVERS_MODAL_SUCCESS,
                    receiversModal: res.data.users,
                    currentPageModal: res.data.paginator.current_page,
                    limitModal: res.data.paginator.limit,
                    totalCountModal: res.data.paginator.total_count,
                    totalPagesModal: res.data.paginator.total_pages,
                });
            });
    };
}

export function loadAllGens() {
    return function (dispatch) {
        campaignApi.loadAllGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_GENS,
                    gens: res.data.data.gens
                });
            });
    };
}

export function loadAllClasses() {
    return function (dispatch) {
        campaignApi.loadAllClasses()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_CLASSES,
                    classes: res.data.data.classes
                });
            });
    };
}

export function chooseReceivers(campaignId, users) {
    return function (dispatch) {
        dispatch({
           type: DISPLAY_GLOBAL_LOADING
        });
        showTypeNotification("Đang chỉnh sửa ghi chú", "info");

        dispatch({
           type: types.TOGGLE_CHOOSE_RECEIVERS
        });
        campaignApi.chooseReceivers(campaignId, users)
            .then(() => {
                dispatch({
                    type: types.TOGGLE_CHOOSE_RECEIVERS
                });
                showNotification("Đã thêm người nhận vào chiến dịch");
                dispatch({
                    type: HIDE_GLOBAL_LOADING
                });
            });
    };
}




