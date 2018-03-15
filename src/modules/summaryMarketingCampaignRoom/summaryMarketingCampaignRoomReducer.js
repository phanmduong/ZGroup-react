/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summaryMarketingCampaignRoomReducer(state = initialState.summaryMarketingCampaignRoom, action) {
    switch (action.type) {

        case types.BEGIN_LOAD_BASES_DATA_SUMMARY_MARKETING_CAMPAIGN_ROOM:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false

                }
            };
        case types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_SUCCESS_ROOM:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_SUMMARY_MARKETING_CAMPAIGN_ERROR_ROOM:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
        case types.BEGIN_LOAD_SUMMARY_MARKETING_CAMPAIGN_ROOM:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_SUMMARY_MARKETING_CAMPAIGN_SUCCESS_ROOM:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    summary: action.summary,
                }
            };
        case types.LOAD_SUMMARY_MARKETING_CAMPAIGN_ERROR_ROOM:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}

