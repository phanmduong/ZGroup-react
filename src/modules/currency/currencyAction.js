import * as types from '../../constants/actionTypes';
import * as currencyApi from './currencyApi';
import * as helper from '../../helpers/helper';

export function loadAllCurrencies() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CURRENCIES
        });
        currencyApi.loadAllCurrenciesApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_CURRENCIES_SUCCESS,
                    currencies: res.data.data.currencies
                });
            });
    };
}

export function showAddEditCurrencyModal() {
    return ({
        type: types.TOGGLE_ADD_EDIT_CURRENCIES_MODAL
    });
}

export function handleCurrency(currency) {
    return ({
        type: types.HANDLE_CURRENCY,
        currency
    });
}

export function saveCurrency(currency) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_CURRENCY
        });
        currencyApi.saveCurrencyApi(currency)
            .then((res) => {
                dispatch({
                    type: types.SAVE_CURRENCY_SUCCESS,
                    currency: res.data.data.currency
                });
                helper.showNotification("Thêm loại tiền tệ thành công");
            });
    };
}

export function editCurrency(currency) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_CURRENCY
        });
        currencyApi.editCurrencyApi(currency)
            .then(() => {
                dispatch({
                    type: types.EDIT_CURRENCY_SUCCESS,
                    currency
                });
                helper.showNotification("Chỉnh sửa loại tiền tệ thành công");
            });
    };
}

export function deleteCurrency(currency) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        currencyApi.deleteCurrencyApi(currency)
            .then(() => {
                dispatch({
                    type: types.DELETE_CURRENCY_SUCCESS,
                    currency
                });
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}