import * as types from '../../constants/actionTypes';
import * as summaryMarketingCampaignApi from './summaryMarketingCampaignApi';

/*eslint no-console: 0 */

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_SUMMARY_MARKETING_CAMPAIGN
        });
        summaryMarketingCampaignApi.loadGens()
            .then((res) => {
                dispatch({
                    type: types.LOAD_GENS_SUMMARY_MARKETING_CAMPAIGN_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_GENS_SUMMARY_MARKETING_CAMPAIGN_ERROR
            });
        });
    };
}

export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_SUMMARY_MARKETING_CAMPAIGN
        });
        summaryMarketingCampaignApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_SUCCESS,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_ERROR
            });
        });
    };
}

export function loadSummaryMarketingCampaignData(genId, baseId, startTime,endTime) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_MARKETING_CAMPAIGN
        });
        summaryMarketingCampaignApi.loadSummaryMarketingCampaign(genId, baseId,startTime,endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SUMMARY_MARKETING_CAMPAIGN_SUCCESS,
                    summary: res.data.data.summary_marketing_campaign,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_SUMMARY_MARKETING_CAMPAIGN_ERROR
            });
        });
    };
}





