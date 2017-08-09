import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let tabListData;
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
        case types.CHANGE_CHECK_TAB:
            tabListData = changeCheckTab(state.allTabs, action.tab);
            return {
                ...state,
                ...{
                    allTabs: tabListData
                }
            };
        case types.LOAD_ROLE_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    allTabs: action.tabListData
                }
            };
        default:
            return state;
    }
}

function changeCheckTab(tabListData, tab) {
    if (tabListData) {
        return tabListData.map((tabItem) => {
            if (tabItem.id === tab.id) {
                return {
                    ...tabItem,
                    ...tab
                };
            } else {
                return tabItem;
            }
        });
    }

    return tabListData;
}