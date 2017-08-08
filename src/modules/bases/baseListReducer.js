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
        case types.SET_DEFAULT_BASE:
            return Object.assign({}, state, {
                bases: state.bases.map(base => {
                    if (base.id === action.baseId) {
                        return Object.assign({}, base, {center: 1});
                    } else {
                        return Object.assign({}, base, {center: 0});
                    }
                })
            });
        default:
            return state;
    }

}