import * as types from '../../constants/actionTypes';
import * as historyShiftRegisterApi from './historyShiftRegisterApi';

/*eslint no-console: 0 */

export function historyShiftRegisters(page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_SHIFT_REGISTERS
        });
        historyShiftRegisterApi.getHistoryShiftRegisters(page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_HISTORY_SHIFT_REGISTERS_SUCCESS,
                    shiftPicks: res.data.shift_picks,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_HISTORY_SHIFT_REGISTERS_ERROR
            });
        });
    };
}






