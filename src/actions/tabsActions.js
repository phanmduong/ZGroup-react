import * as types from '../constants/actionTypes';
import * as tabsApi from '../apis/tabsApi';

export function beginLoadTabsData() {
  return {
    type: types.BEGIN_LOAD_TABS_DATA,
    isLoading: true,
    error: false,
    tabListData: []
  };
}

export function loadTabsData() {
  return function (dispatch) {
    dispatch(beginLoadTabsData());
    tabsApi.loadTabsApi()
      .then(function (res) {
        dispatch(loadTabsDataSucessful(res));
      }).catch(() =>{
        dispatch(loadTabsDataError());
    });
  };
}

export function loadTabsDataSucessful(res) {
  return (
    {type: types.LOAD_TABS_DATA_SUCCESSFUL,
      tabListData: res.data.data.tabs,
      status: res.data.status,
      isLoading: false,
      error: false
    })
    ;
}

export function loadTabsDataError() {
  return (
    {
      type: types.LOAD_TABS_DATA_ERROR,
      isLoading: false,
      error: true
    })
    ;
}
