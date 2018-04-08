import * as types from './campaignListActionTypes';
import * as campaignListApi from './campaignListApi';
import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../constants/actionTypes";
import {showNotification, showTypeNotification} from "../../helpers/helper";

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