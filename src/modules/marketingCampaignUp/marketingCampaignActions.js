import * as types from '../../constants/actionTypes';
import * as marketingCampaignApi from './marketingCampaignApi';


export function loadMarketingCampaigns(page) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_MARKETING_CAMPAIGNS_UP});
        marketingCampaignApi.loadMarketingEmail(page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_MARKETING_CAMPAIGNS_SUCCESS_UP,
                    marketingCampaigns: res.data.marketing_campaigns,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_MARKETING_CAMPAIGNS_ERROR_UP
            });
        });
    };
}

export function storeMarketingCampaign(marketingCampaign, closeModal) {
    let isEdit = !!marketingCampaign.id;
    return function (dispatch) {
        dispatch({type: types.BEGIN_STORE_MARKETING_CAMPAIGN_UP});
        marketingCampaignApi.storeMarketingCampaign(marketingCampaign)
            .then((res) => {
                closeModal();
                dispatch({
                    type: types.STORE_MARKETING_CAMPAIGN_SUCCESS_UP,
                    marketingCampaign: res.data.data.marketing_campaign,
                    isEdit: isEdit,
                });
            }).catch(() => {
            dispatch({
                type: types.STORE_MARKETING_CAMPAIGN_ERROR_UP,
            });
        });
    };
}

