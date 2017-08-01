import * as types from '../constants/actionTypes';
import * as staffApi from '../apis/staffApi';

export function beginLoadStaffsData() {
  return {
    type: types.BEGIN_LOAD_STAFFS_DATA,
    isLoading: true,
    error: false,
    tabListData: []
  };
}

export function loadStaffsData() {
  return function (dispatch) {
    dispatch(beginLoadStaffsData());
      staffApi.getStaffs()
      .then(function (res) {
        dispatch(loadStaffsDataSucessful(res));
      }).catch(() =>{
        dispatch(loadStaffsDataError());
    });
  };
}

export function loadStaffsDataSucessful(res) {
  return (
    {type: types.LOAD_STAFFS_DATA_SUCCESSFUL,
      staffListData: res.data.data.staffs,
      status: res.data.status,
      isLoading: false,
      error: false
    })
    ;
}

export function loadStaffsDataError() {
  return (
    {
      type: types.LOAD_STAFFS_DATA_ERROR,
      isLoading: false,
      error: true
    })
    ;
}
