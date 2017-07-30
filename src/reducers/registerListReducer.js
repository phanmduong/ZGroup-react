import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function dashboardReducer(state = initialState.registerList, action) {

  switch (action.type) {
    case types.BEGIN_LOAD_REGISTER_LIST_DATA:
      return Object.assign({}, state, {
        isLoading: true
      });
    case types.LOAD_REGISTER_LIST_DATA:
      return Object.assign({}, state,
        {
          isLoading: false,
          registers: action.registers
        }
      );
    case types.LOAD_MORE_REGISTER_LIST_DATA:
      return Object.assign({}, state,
        {
          isLoading: false,
          registers: [...state.registers, ...action.registers]
        }
      );
    default:
      return state;
  }
}
