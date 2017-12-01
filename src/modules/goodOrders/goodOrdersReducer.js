/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

function changeStatusOrder(goodOrders, order_id, status) {
    if (goodOrders) {
        goodOrders = goodOrders.map((order) => {
            if (order.id === order_id) {
                return {
                    ...order,
                    status: status,
                };
            }
            return order;
        });
    }
    return goodOrders;
}

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
        case types.BEGIN_LOAD_DETAIL_ORDER:
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoading: true,
                    error: false
                }
            };
        case types.LOAD_DETAIL_ORDER_SUCCESS:
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoading: false,
                    error: false,
                    infoOrder: action.infoOrder,
                    infoUser: action.infoUser,
                    infoShip: action.infoShip,
                    goodOrders: action.goodOrders,
                }
            };
        case types.LOAD_DETAIL_ORDER_ERROR:
            return {
                ...state,
                order: {
                    ...state.order,
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_STAFFS_ORDERS:
            return {
                ...state,
                ...{
                    isLoadingStaffs: true,
                    errorStaffs: false,
                }
            };
        case types.LOAD_STAFFS_ORDERS_SUCCESS:
            return {
                ...state,
                staffs: action.staffs,
                isLoadingStaffs: false,
                errorStaffs: false,
            };
        case types.LOAD_STAFFS_ORDERS_ERROR:
            return {
                ...state,
                isLoadingStaffs: false,
                errorStaffs: true,
            };
        case types.CHANGE_STATUS_ORDER_SUCCESS:
            return {
                ...state,
                order: {
                    ...state.order,
                    goodOrders: changeStatusOrder(state.order.goodOrders, action.order_id, action.status),
                }
            };
        default:
            return state;
    }
}