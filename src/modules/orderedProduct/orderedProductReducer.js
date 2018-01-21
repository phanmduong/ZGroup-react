/**
 * Created by Tien Tai Nguyen on 1/1/2018.
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
        case types.TOGGLE_ADD_NOTE_MODAL_ORDERED_PRODUCT:
            return {
                ...state,
                addNoteModal: !state.addNoteModal
            };
        case types.HANDLE_ADD_NOTE_MODAL_ORDERED_PRODUCT:
            return {
                ...state,
                orderNote: action.order
            };
        case types.BEGIN_EDIT_NOTE_ORDERED_PRODUCT:
            return {
                ...state,
                isSendingNote: true
            };
        case types.EDIT_NOTE_SUCCESS_ORDERED_PRODUCT: {
            let orders = state.deliveryOrders.map(order => {
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
                deliveryOrders: orders
            };
        }
        default:
            return state;
    }
}