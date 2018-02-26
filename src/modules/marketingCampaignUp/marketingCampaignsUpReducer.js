import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let marketingCampaigns;
export default function importGoodsReducer(state = initialState.marketingCampaignUp, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_MARKETING_CAMPAIGNS_UP:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_MARKETING_CAMPAIGNS_SUCCESS_UP:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    marketingCampaigns: action.marketingCampaigns,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_MARKETING_CAMPAIGNS_ERROR_UP:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_STORE_MARKETING_CAMPAIGN_UP:
            return {
                ...state,
                ...{
                    isStoringCampaign: true,
                    errorStoreCampaign: false,
                }
            };
        case types.STORE_MARKETING_CAMPAIGN_SUCCESS_UP:

            if (action.isEdit) {
                marketingCampaigns = state.marketingCampaigns.map((marketingCampaign) => {
                    if (marketingCampaign.id === action.marketingCampaign.id) {
                        return {
                            ...action.marketingCampaign
                        };
                    }
                    return {
                        ...marketingCampaign
                    };
                });
            } else {
                marketingCampaigns = [action.marketingCampaign, ...state.marketingCampaigns];
            }
            return {
                ...state,
                ...{
                    isStoringCampaign: false,
                    errorStoreCampaign: false,
                    marketingCampaigns: marketingCampaigns
                }
            };
        case types.STORE_MARKETING_CAMPAIGN_ERROR_UP:
            return {
                ...state,
                ...{
                    isStoringCampaign: false,
                    errorStoreCampaign: true
                }
            };
        default:
            return state;
    }
}