import * as types from './campaignListActionTypes';
import initialState from "../../reducers/initialState";

export default function campaignListReducer(state = initialState.campaignList, action) {
    switch (action.type) {
        case  types.BEGIN_LOAD_CAMPAIGN_LIST:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_CAMPAIGN_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                campaigns: action.campaigns,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount
            };
        default:
            return state;
    }
}
