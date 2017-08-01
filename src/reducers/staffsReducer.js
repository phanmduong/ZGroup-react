import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function staffsReducer(state = initialState.staffs, action) {

  switch (action.type) {
    case types.BEGIN_LOAD_STAFFS_DATA:
      return {
        ...state,
        ...{
          isLoading: action.isLoading,
          error: action.error,
          staffListData: action.staffListData
        }
      };
    case types.LOAD_STAFFS_DATA_SUCCESSFUL:
      return {
        ...state,
        ...{
          isLoading: action.isLoading,
          error: action.error,
          staffListData: action.staffListData
        }
      };
    case types.LOAD_STAFFS_DATA_ERROR:
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
