/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.baseList, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BASES:
            return Object.assign({}, state, {
                isLoadingBases: true
            });
        case types.LOAD_BASES_SUCCESS:
            return Object.assign({}, state, {
                isLoadingBases: false,
                bases: action.bases,
                currentPage: action.currentPage,
                totalPages: action.totalPages
            });
        default:
            return state;
    }

}