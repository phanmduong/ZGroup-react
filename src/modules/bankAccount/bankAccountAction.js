import * as types from '../../constants/actionTypes';
import * as bankAccountApi from './bankAccountApi';

export function loadAllBankAccounts() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BANK_ACCOUNTS
        });
        bankAccountApi.loadAllBankAccountsApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_CURRENCIES_SUCCESS,
                    currencies: res.data.data.currencies
                });
            });
    };
}
