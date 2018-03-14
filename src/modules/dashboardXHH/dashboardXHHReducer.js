/* eslint-disable no-case-declarations */
import * as types from "../../constants/actionTypes";
import initialState from "../../reducers/initialState";

export default function dashboardXHHReducer(
    state = initialState.dashboardXHH,
    action,
) {
    switch (action.type) {
        case types.BEGIN_LOAD_DASHBOARD_XHH_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                },
            };
        case types.LOAD_DASHBOARD_XHH_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    dashboard: action.dashboard,
                },
            };
        case types.LOAD_DASHBOARD_XHH_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                },
            };
        default:
            return state;
    }
}
