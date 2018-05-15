import * as types from '../../constants/actionTypes';
import * as collectMoneyApi from './collectMoneyApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */

export function searchStudentRegister(search, page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SEARCH_REGISTERS_COLLECT_MONEY
        });
        collectMoneyApi.searchStudentRegister(search, page)
            .then((res) => {
                dispatch({
                    type: types.SEARCH_REGISTERS_COLLECT_MONEY_SUCCESS,
                    nextCode: res.data.next_code,
                    nextWaitingCode: res.data.next_waiting_code,
                    users: res.data.users,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.SEARCH_REGISTERS_COLLECT_MONEY_ERROR
            });
        });
    };
}

export function payMoneyRegister(register) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_PAY_REGISTER_COLLECT_MONEY,
            registerId: register.id
        });
        collectMoneyApi.payMoney(register)
            .then((res) => {
                helper.sweetAlertSuccess("Nộp tiền thành công");
                dispatch({
                    type: types.PAY_REGISTER_COLLECT_MONEY_SUCCESS,
                    register: res.data.data.register,
                    nextCode: res.data.data.next_code,
                    nextWaitingCode: res.data.data.next_waiting_code,
                });
            }).catch(() => {
            helper.sweetAlertError("Có lỗi xảy ra. Kiểm tra và thử lại");
            dispatch({
                type: types.PAY_REGISTER_COLLECT_MONEY_ERROR,
                registerId: register.id
            });
        });
    };
}





