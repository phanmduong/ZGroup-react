import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function orderedDetailReducer(state = initialState.orderedDetail, action) {
    switch (action.type) {
        case types.HANDLE_ORDER_ORDERED_DETAIL:
            return {
                ...state,
                order: action.order
            };
        case types.HANDLE_CUSTOMER_ORDERED_DETAIL:
            return {
                ...state,
                customer: action.customer
            };
        case types.BEGIN_LOAD_ORDER_ORDERED_DETAIL:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_ORDER_ORDERED_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                order: action.order,
                customer: action.customer,
                delivery: action.delivery
            };
        case types.HANDLE_DATE_ORDERED_DETAIL:
            return {
                ...state,
                order: {
                    ...state.order,
                    endTime: action.endTime
                }
            };
        case types.LOAD_CURRENCIES_SUCCESS_ORDERED_DETAIL:
            return {
                ...state,
                currencies: action.currencies
            };
        default:
            return state;
    }
}
