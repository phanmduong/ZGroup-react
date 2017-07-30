import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function searchRegistersReducer(state = initialState.searchRegisters, action) {
  switch (action.type) {
    case (types.BEGIN_SEARCH_REGISTERS_DATA):
      return Object.assign({}, state, {
        isLoading: true
      });

    case (types.LOADED_SEARCH_REGISTERS_DATA):
      return Object.assign({}, state, {
        isLoading: false,
        data: {
          next_code: action.next_code,
          next_waiting_code: action.next_waiting_code,
          users: action.users
        },
        status: action.status
      });
    default:
      return state;
  }

}
