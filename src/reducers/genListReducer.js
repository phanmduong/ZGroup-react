import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function genListReducer(state = initialState.genList, action) {

  switch (action.type) {
    case types.BEGIN_LOAD_GENS_DATA:
      return Object.assign({}, state, {isLoading: true});
    case types.LOADED_GENS_DATA:
      return Object.assign({}, state, {
        gens: action.gens,
        isLoading: false
      });
    default:
      return state;
  }
}
