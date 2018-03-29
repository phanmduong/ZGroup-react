/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summarySalesRoomReducer(state = initialState.summarySalesRoom, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_SUMMARY_SALES_ROOM:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOAD_SUMMARY_SALES_SUCCESS_ROOM:
            return {
                ...state,
                ...{
                    isLoading: false,
                    summary: action.summary,
                }
            };
        case types.LOAD_SUMMARY_SALES_ERROR_ROOM:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.LOADED_BASES_ERROR_IN_SUMMARY_SALE_ROOM:
            return{
                ...state,
                isLoadingBases : false,
            };
            case types.BEGIN_LOAD_BASES_IN_SUMMARY_SALE_ROOM:
            return{
                ...state,
                isLoadingBases : true,
            };
        case types.LOADED_BASES_SUCCESS_IN_SUMMARY_SALE_ROOM:
            return{
                ...state,
                isLoadingBases: false,
                bases : getBases(action.bases),
            };

        default:
            return state;
    }
}

export  function getBases(bases) {
    let options = bases.map((base) => {
        return {
            key: base.id,
            value: base.name,
        };
    });
    return [{key: null, value: "Tất cả"}, ...options];
}