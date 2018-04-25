import * as types from './campaignListActionTypes';
import * as campaignListApi from './campaignListApi';
import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../constants/actionTypes";
import {showErrorNotification, showNotification, showTypeNotification} from "../../helpers/helper";

export function getCampaignList(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CAMPAIGN_LIST
        });
        campaignListApi.getCampaignListApi(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CAMPAIGN_LIST_SUCCESS,
                    campaigns: res.data.campaigns,
                    totalCount: res.data.paginator.total_count,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    limit: res.data.paginator.limit
                });
            });
    };
}

export function changeCampaignStatus(campaignId, status) {
    return function (dispatch) {
        dispatch({
            type: DISPLAY_GLOBAL_LOADING
        });
        showTypeNotification("Đang thay đổi trạng thái", "info");
        campaignListApi.changeCampaignStatus(campaignId, status)
            .then(() => {
                showNotification("Thay đổi trạng thái thành công");
                dispatch({
                    type: types.CHANGE_CAMPAIGN_STATUS_SUCCESS,
                    status,
                    campaignId
                });
                dispatch({
                    type: HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function showCreateEditCampaignModal() {
    return ({
        type: types.TOGGLE_CREATE_EDIT_CAMPAIGN_MODAL
    });
}

export function handleCreateEditCampaignModal(campaign) {
    return ({
        type: types.HANDLE_CREATE_EDIT_CAMPAIGN_MODAL,
        campaign
    });
}

export function saveCampaign(campaign) {
    return function (dispatch) {
        showTypeNotification("Đang lưu chiến dịch", "info");
        dispatch({
            type: types.BEGIN_SAVE_CAMPAIGN_MODAL
        });
        campaignListApi.saveCampaignModal(campaign)
            .then((res) => {
                if (res.data.status) {
                    showNotification("Lưu chiến dịch thành công");
                } else {
                    showErrorNotification(res.data.message.message);
                }
                dispatch({
                    type: types.SAVE_CAMPAIGN_SUCCESS
                });
            });
    };
}

export function showManageTemplateTypesModal() {
    return ({
        type: types.TOGGLE_MANAGE_TEMPLATE_TYPES_MODAL
    });
}

export function handleManageTemplateTypesModal(templateType) {
    return ({
        type: types.HANDLE_MANAGE_TEMPLATE_TYPES_MODAL,
        templateType
    });
}

export function getTemplateTypes(page, search) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TEMPLATE_TYPES
        });
        campaignListApi.getTemplateTypes(page, search)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TEMPLATE_TYPES_SUCCESS,
                    templateTypesList: res.data.template_types,
                    totalCountTemplateTypes: res.data.paginator.total_count,
                    totalPagesTemplateTypes: res.data.paginator.total_pages,
                    currentPageTemplateTypes: res.data.paginator.current_page,
                    limitTemplateTypes: res.data.paginator.limit
                });
            });
    };
}

export function saveTemplateType(type) {
    return function (dispatch) {
        showTypeNotification("Đang lưu loại tin nhắn", "info");
        dispatch({
            type: types.TOGGLE_SAVE_TEMPLATE_TYPE_MODAL
        });
        campaignListApi.saveTemplateType(type)
            .then((res) => {
                if (res.data.status) {
                    showNotification("Lưu loại tin nhắn thành công");
                    dispatch({
                        type: types.SAVE_TEMPLATE_TYPE_SUCCESS
                    });
                } else {
                    showErrorNotification(res.data.message.message);
                }
                dispatch({
                    type: types.TOGGLE_SAVE_TEMPLATE_TYPE_MODAL
                });
            });
    };
}