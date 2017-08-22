import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function tabsReducer(state = initialState.tabs, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_TABS_DATA:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    tabListData: action.tabListData
                }
            };
        case types.LOAD_TABS_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    tabListData: action.tabListData
                }
            };
        case types.LOAD_TABS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error
                }
            };
        case types.BEGIN_LOAD_ALL_TABS_DATA:
            return {
                ...state,
                ...{
                    isLoadingAllTabs: action.isLoading,
                    errorAllTabs: action.error,
                    allTabs: action.tabListData

                }
            };
        case types.LOAD_ALL_TABS_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoadingAllTabs: action.isLoading,
                    errorAllTabs: action.error,
                    allTabs: action.tabListData

                }
            };
        case types.LOAD_ALL_TABS_DATA_ERROR:
            return {
                ...state,
                ...{

                    isLoadingAllTabs: action.isLoading,
                    errorAllTabs: action.error,

                }
            };
        default:
            return state;
    }
}

