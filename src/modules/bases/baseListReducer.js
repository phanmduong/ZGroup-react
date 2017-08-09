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
        case types.UPDATE_BASE_FORM_DATA:
            return {
                ...state,
                createBase: {...state.createBase, base: action.base}
            };
        case types.BEGIN_CREATE_BASE:
            return {
                ...state,
                createBase: {...state.createBase, isSavingBase: true}
            };
        case types.CREATE_BASE_SUCCESS:
            return {
                ...state,
                createBase: {...state.createBase, isSavingBase: false}
            };
        default:
            return state;
    }

}