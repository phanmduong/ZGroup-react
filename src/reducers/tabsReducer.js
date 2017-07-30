import * as types from '../constants/actionTypes';
import initialState from './initialState';

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
    default:
      return state;
  }
}
