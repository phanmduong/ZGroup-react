/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

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
        default:
            return state;
    }
}