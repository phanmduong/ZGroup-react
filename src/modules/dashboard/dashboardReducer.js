/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function dashboardReducer(state = initialState.dashboard, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false

                }
            };
        case types.LOAD_GENS_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true
                }
            };
        case types.BEGIN_LOAD_BASES_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false

                }
            };
        case types.LOAD_BASES_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
            case types.BEGIN_LOAD_DASHBOARD_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false

                }
            };
        case types.LOAD_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    dashboard: action.dashboard
                }
            };
        case types.LOAD_DASHBOARD_DATA_ERROR:
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