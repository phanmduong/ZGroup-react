/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

function changeStatusOrder(orders, order_id, status) {
    if (orders) {
        orders = orders.map((order) => {
            if (order.id === order_id) {
                return {
                    ...order,
                    status: status,
                };
            }
            return order;
        });
    }
    return orders;
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
                    total: action.total,
                    paid: action.paid,
                    debt: action.debt,
                    order: action.order,
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

        case types.GET_ALL_STAFFS_COMPLETE_GOOD_ORDER:
            return {
                ...state,
                allStaffs: action.allStaffs
            };
        case types.CHANGE_STATUS_ORDER_SUCCESS:
            return {
                ...state,
                orders: changeStatusOrder(state.orders, action.order_id, action.status),
                order: {
                    ...state.order,
                    order: {
                        ...state.order.order,
                        status: action.status
                    }
                }
            };
        case types.TOGGLE_SHIP_GOOD_MODAL:
            return {
                ...state,
                isUpdate: action.isUpdate || false,
                shipGoodModal: !state.shipGoodModal
            };
        case types.TOGGLE_ADD_NOTE_MODAL:
            return {
                ...state,
                addNoteModal: !state.addNoteModal
            };
        case types.HANDLE_ADD_NOTE_MODAL:
            return {
                ...state,
                orderNote: action.order
            };
        case types.BEGIN_EDIT_NOTE_GOOD_ORDER:
            return {
                ...state,
                isSendingNote: true
            };
        case types.EDIT_NOTE_SUCCESS_GOOD_ORDER: {
            let orders = state.orders.map(order => {
                if (order.id === action.order.id) {
                    return {
                        ...order,
                        note: action.order.note
                    };
                }
                return order;
            });
            return {
                ...state,
                isSendingNote: false,
                addNoteModal: false,
                orders: orders
            };
        }
        case types.HANDLE_SHIP_ORDER_BEGIN: {
            let products = {...state.shippingGood.products};
            action.order.good_orders.forEach(product => {
                products = [...product, {
                    name: product.name,
                    weight: 0.3 * product.quantity
                }];
            });
            return {
                ...state,
                orderId: action.order.id,
                labelId: action.order.label_id ? action.order.label_id : -1,
                shippingGood: {
                    ...state.shipGoodModal,
                    products,
                    order: {
                        ...state.shippingGood.order,
                        id: action.order.code,
                        tel: action.order.customer ? action.order.customer.phone : '',
                        name: action.order.customer ? action.order.customer.name : '',
                        address: action.order.customer ? action.order.customer.address : '',
                        value: action.order.total
                    }
                }
            };
        }
        case types.HANDLE_SHIP_ORDER:
            return {
                ...state,
                shippingGood: {
                    ...state.shippingGood,
                    order: action.order
                }
            };
        case types.BEGIN_SEND_SHIP_ORDER:
            return {
                ...state,
                isSendingShipOrder: true
            };
        case types.SEND_SHIP_ORDER_COMPLETE: {
            let orders = state.orders.map(order => {
                if (action.orderId === order.id) {
                    return {
                        ...order,
                        label_id: action.labelId
                    };
                }
                return order;
            });
            return {
                ...state,
                orders: orders,
                isSendingShipOrder: false,
                shipGoodModal: false,
                shippedGoodResponse: action.shippedGoodResponse
            };
        }
        case types.SEND_SHIP_ORDER_FAILED:
            return {
                ...state,
                isSendingShipOrder: false,
                shipGoodModal: false
            };
        case types.UPDATE_ORDER_FORM_DATA:
            return {
                ...state,
                order: {
                    ...state.order,
                    order: action.order,
                }
            };


        case types.BEGIN_EDIT_ORDER:
            return {
                ...state,
                order: {
                    ...state.order,
                    isSaving: true,
                }
            };
        case types.EDIT_ORDER_ERROR:
            return {
                ...state,
                order: {
                    ...state.order,
                    isSaving: false,
                }
            };
        case types.EDIT_ORDER_SUCCESS:
            return {
                ...state,
                order: {
                    ...state.order,
                    isSaving: false,
                }
            };
        default:
            return state;
    }
}