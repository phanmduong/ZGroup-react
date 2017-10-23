/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function goodOrdersReducer(state = initialState.goodOrders, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GOOD_ORDERS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_GOOD_ORDERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    orders: action.orders,
                    totalOrder: action.totalOrder,
                    totalMoney: action.totalMoney,
                    totalPaidMoney: action.totalPaidMoney,
                    limit: action.limit,
                    totalCount: action.totalCount,
                }
            };
        case types.LOAD_GOOD_ORDERS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}