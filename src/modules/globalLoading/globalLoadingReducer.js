/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function genssReducer(state = initialState.gens, action) {
    switch (action.type) {
        case types.DISPLAY_GLOBAL_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case types.HIDE_GLOBAL_LOADING:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}
