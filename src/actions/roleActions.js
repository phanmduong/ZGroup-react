import * as types from '../constants/actionTypes';
import * as roleApi from '../apis/roleApi';

export function beginLoadRolesData() {
  return {
    type: types.BEGIN_LOAD_ROLES_DATA,
    isLoading: true,
    error: false,
    tabListData: []
  };
}

export function loadRolesData() {
  return function (dispatch) {
    dispatch(beginLoadRolesData());
      roleApi.getRoles()
      .then(function (res) {
        dispatch(loadRolesDataSucessful(res));
      }).catch(() =>{
        dispatch(loadRolesDataError());
    });
  };
}

export function loadRolesDataSucessful(res) {
  return (
    {type: types.LOAD_ROLES_DATA_SUCCESSFUL,
      roleListData: res.data.data.roles,
      status: res.data.status,
      isLoading: false,
      error: false
    })
    ;
}

export function loadRolesDataError() {
  return (
    {
      type: types.LOAD_ROLES_DATA_ERROR,
      isLoading: false,
      error: true
    })
    ;
}
