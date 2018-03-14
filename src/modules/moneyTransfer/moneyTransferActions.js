import * as types from '../../constants/actionTypes';
import * as moneyTransferApi from './moneyTransferApi';

/*eslint no-console: 0 */
export function getUser() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_USER_MONEY_TRANSFER});
        moneyTransferApi.loadUser()
            .then(res => {
                dispatch({
                    type: types.LOAD_USER_MONEY_TRANSFER_SUCCESS,
                    user: res.data.data.staff
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_USER_MONEY_TRANSFER_ERROR});
            });
    };
}