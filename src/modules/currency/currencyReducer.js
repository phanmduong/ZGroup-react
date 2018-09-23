/**
 * Created by Nguyen Tien Tai on 01/15/18.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function currencyReducer(state = initialState.currency, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_CURRENCIES:
            return {
                ...state,
                ...{
                    isLoading: true
                }
            };
        case types.LOAD_CURRENCIES_SUCCESS:
            return {
                ...state,
                currencies: action.currencies,
                isLoading: false
            };
        case types.TOGGLE_ADD_EDIT_CURRENCIES_MODAL:
            return {
                ...state,
                addEditCurrencyModal: !state.addEditCurrencyModal
            };
        case types.HANDLE_CURRENCY:
            return {
                ...state,
                currencyEditModal: action.currency
            };
        case types.BEGIN_SAVE_CURRENCY:
            return {
                ...state,
                isUpdatingEditModal: true
            };
        case types.SAVE_CURRENCY_SUCCESS:
            return {
                ...state,
                isUpdatingEditModal: false,
                addEditCurrencyModal: false,
                currencies: [action.currency, ...state.currencies]
            };
        case types.EDIT_CURRENCY_SUCCESS: {
            let currencies = state.currencies.map((currency) => {
                if (currency.id === action.currency.id)
                    return {
                        ...currency,
                        name: action.currency.name,
                        notation: action.currency.notation,
                        ratio: action.currency.ratio
                    };
                return currency;
            });
            return {
                ...state,
                isUpdatingEditModal: false,
                addEditCurrencyModal: false,
                currencies: currencies
            };
        }
        default:
            return state;
    }
}