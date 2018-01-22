/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function orderedProductReducer(state = initialState.orderedProduct, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_ORDERED_PRODUCT:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_ORDERED_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                totalPaidMoney: action.totalPaidMoney,
                totalMoney: action.totalMoney,
                totalDeliveryOrders: action.totalDeliveryOrders,
                notLocked: action.notLocked,
                deliveryOrders: action.deliveryOrders,
                currentPage: action.currentPage,
                totalPages: action.totalPages,
                totalCount: action.totalCount
            };
        case types.GET_ALL_STAFFS_ORDERED_PRODUCT:
            return {
                ...state,
                staffs: action.staffs
            };
        default:
            return state;
    }
}