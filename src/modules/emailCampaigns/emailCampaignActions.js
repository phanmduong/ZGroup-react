import * as types from '../../constants/actionTypes';
import * as emailCampaignApi from './emailCampaignApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */
export function loadCampaigns(page, search, ownerId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_CAMPAIGNS,
        });
        emailCampaignApi.loadCampaigns(page, search, ownerId)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_CAMPAIGNS_SUCCESS,
                    campaigns: res.data.campaigns,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_CAMPAIGNS_ERROR,
                });
            });
    };
}

export function loadSubscribersList() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS,
        });
        emailCampaignApi.loadSubscribersList()
            .then(res => {
                dispatch({
                    type: types.LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS_SUCCESS,
                    subscribersList: res.data.data.subscribers_list,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS_ERROR,
                });
            });
    };
}

export function storeCampaign(campaign, closeModal) {

    if (helper.isEmptyInput(campaign.id)) {
        campaign.id = "";
    }

    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_EMAIL_CAMPAIGN,
        });
        emailCampaignApi.storeCampaign(campaign)
            .then(res => {
                closeModal();
                dispatch({
                    type: types.STORE_EMAIL_CAMPAIGN_SUCCESS,
                    campaign: res.data.data.campaign,
                    edit: !helper.isEmptyInput(campaign.id)
                });
            })
            .catch(() => {
                dispatch({
                    type: types.STORE_EMAIL_CAMPAIGN_ERROR,
                });
            });
    };
}

export function deleteEmailForm(campaignId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_EMAIL_CAMPAIGN,
        });
        emailCampaignApi.deleteCampaign(campaignId)
            .then(() => {
                helper.showNotification('Xóa email form thành công');
                dispatch({
                    type: types.DELETE_EMAIL_CAMPAIGN_SUCCESS,
                    campaignId
                });
            })
            .catch(() => {
                helper.showErrorNotification('Xóa email form thất bại');
                dispatch({
                    type: types.DELETE_EMAIL_CAMPAIGN_ERROR,
                });
            });
    };
}

export function loadForms() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_FORMS_EMAIL_CAMPAIGN,
        });
        emailCampaignApi.loadForms()
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_FORMS_EMAIL_CAMPAIGN_SUCCESS,
                    forms: res.data.data.email_forms,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_EMAIL_FORMS_EMAIL_CAMPAIGN_ERROR,
                });
            });
    };
}
