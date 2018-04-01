// import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function campaignListReducer(state = initialState.campaignList, action) {
    switch (action.type) {
        case "LOAD_CAMPAIGNLIST_SUCCESS":
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}



