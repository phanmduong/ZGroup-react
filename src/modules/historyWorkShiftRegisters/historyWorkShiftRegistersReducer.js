/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyShiftRegistersReducer(state = initialState.historyWorkShiftRegisters, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_HISTORY_WORK_SHIFT_REGISTERS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_HISTORY_WORK_SHIFT_REGISTERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    shiftPicks: action.shiftPicks,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_HISTORY_WORK_SHIFT_REGISTERS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        default:
            return state;
    }
}
