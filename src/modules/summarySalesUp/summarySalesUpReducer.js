/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summarySalesUpReducer(state = initialState.summarySalesUp, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BASES_DATA_SUMMARY_SALES_UP:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false

                }
            };
        case types.LOAD_BASES_SUMMARY_SALES_SUCCESS_UP:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_SUMMARY_SALES_ERROR_UP:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
        case types.BEGIN_LOAD_SUMMARY_SALES_UP:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false

                }
            };
        case types.LOAD_SUMMARY_SALES_SUCCESS_UP:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    summary: action.summary,
                }
            };
        case types.LOAD_SUMMARY_SALES_ERROR_UP:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}

