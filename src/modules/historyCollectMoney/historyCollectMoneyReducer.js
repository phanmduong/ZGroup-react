/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyCollectMoneyReducer(state = initialState.historyCollectMoney, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_HISTORY_COLLECT_MONEY:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_HISTORY_COLLECT_MONEY_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    registers: action.registers,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_HISTORY_COLLECT_MONEY_ERROR:
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
