/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let campaigns;
export default function emailCampaignReducer(state = initialState.emailCampaigns, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_EMAIL_CAMPAIGNS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_EMAIL_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    campaigns: action.campaigns
                }
            };
        case types.LOAD_EMAIL_CAMPAIGNS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.LOAD_SUBSCRIBERS_LIST_EMAIL_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                ...{
                    subscribersList: action.subscribersList
                }
            };
        case types.BEGIN_STORE_EMAIL_CAMPAIGN:
            return {
                ...state,
                ...{
                    isStoring: true,
                    errorStore: false,
                }
            };
        case types.STORE_EMAIL_CAMPAIGN_SUCCESS:
            if (action.edit) {
                campaigns = changeCampaigns(action.campaign, state.campaigns);
            } else {
                campaigns = [action.campaign, ...state.campaigns];
            }
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: false,
                    campaigns: campaigns
                }
            };
        case types.STORE_EMAIL_CAMPAIGN_ERROR:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: true
                }
            };
        default:
            return state;
    }
}

function changeCampaigns(campaignsData, campaigns) {
    if (campaigns) {
        campaigns = campaigns.map((campaignsItem) => {
            if (campaignsItem.id === campaignsData.id) {
                return campaignsData;
            }
            return campaignsItem;
        });
    }
    return campaigns;
}