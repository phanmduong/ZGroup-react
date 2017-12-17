/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function excelReducer(state = initialState.excel, action) {
    switch (action.type) {
        case types.BEGIN_EXPORT_EXCEL:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.EXPORT_EXCEL_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: action.data
                }
            };
        case types.EXPORT_EXCEL_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        default:
            return state;
    }
}

