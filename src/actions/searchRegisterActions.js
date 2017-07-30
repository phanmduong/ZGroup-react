import * as types from '../constants/actionTypes';
import * as searchRegister from "../apis/financialManager/SearchRegister";

export function beginSearchRegistersData() {
  return {type: types.BEGIN_SEARCH_REGISTERS_DATA};
}

export function loadSearchRegistersData(search) {
  return function (dispatch) {
    dispatch(beginSearchRegistersData());
    searchRegister.loadSearchRegisterData(search)
      .then(function (res) {
        dispatch(loadedSearchRegisterData(res));
      });
  };
}

export function loadedSearchRegisterData(res) {
  return (
    {
      type: types.LOADED_SEARCH_REGISTERS_DATA,
      next_code: res.data.data.next_code,
      next_waiting_code: res.data.data.next_waiting_code,
      users: res.data.data.users,
      status: res.data.status
    })
    ;
}
