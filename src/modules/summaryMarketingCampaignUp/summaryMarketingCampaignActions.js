import * as types from '../../constants/actionTypes';
import * as summaryMarketingCampaignApi from './summaryMarketingCampaignApi';

/*eslint no-console: 0 */



export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_SUMMARY_MARKETING_CAMPAIGN_UP
        });
        summaryMarketingCampaignApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_SUCCESS_UP,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_ERROR_UP
            });
        });
    };
}

export function loadSummaryMarketingCampaignData( baseId, startTime,endTime,success) {
    // console.log(startTime,endTime,"xxxxxxxxxxx");
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_MARKETING_CAMPAIGN_UP
        });
        summaryMarketingCampaignApi.loadSummaryMarketingCampaign( baseId,startTime,endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SUMMARY_MARKETING_CAMPAIGN_SUCCESS_UP,
                    summary: res.data.data.summary_marketing_campaign,
                });
                success();
            }).catch(() => {
            dispatch({
                type: types.LOAD_SUMMARY_MARKETING_CAMPAIGN_ERROR_UP
            });
        });
    };
}





