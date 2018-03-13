/**
 * Created by Tien Tai Nguyen on 1/1/2018.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

function changeStatusDelivery(deliveryOrders, delivery_id, status) {
    if (deliveryOrders) {
        deliveryOrders = deliveryOrders.map((delivery) => {
            if (delivery.id === delivery_id) {
                return {
                    ...delivery,
                    status: status,
                };
            }
            return delivery;
        });
    }
    return deliveryOrders;
}

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
        case types.CHANGE_STATUS_ORDERED_SUCCESS:
            return {
                ...state,
                deliveryOrders: changeStatusDelivery(state.deliveryOrders, action.delivery_id, action.status),
                addCancelNoteModal: false,
                sendPriceModal: false,
                addJavCodeModal: false
            };
        case types.TOGGLE_ADD_CANCEL_NOTE_MODAL:
            return {
                ...state,
                addCancelNoteModal: !state.addCancelNoteModal
            };
        case types.HANDLE_ADD_CANCEL_NOTE_MODAL:
            return {
                ...state,
                cancelNote: action.cancelNote
            };
        case types.TOGGLE_SEND_PRICE_MODAL:
            return {
                ...state,
                sendPriceModal: !state.sendPriceModal,
                isSendingPrice: false
            };
        case types.HANDLE_SEND_PRICE_MODAL:
            return {
                ...state,
                orderSendPriceModal: action.orders
            };
        case types.BEGIN_SEND_PRICE_ORDERED_PRODUCT:
            return {
                ...state,
                isSendingPrice: true
            };
        case types.SEND_PRICE_SUCCESS_ORDERED_PRODUCT:
            return {
                ...state,
                isSendingPrice: false,
                sendPriceModal: false,
            };
        case types.LOAD_CURRENCIES_SUCCESS_ORDERED_PRODUCT:
            return {
                ...state,
                currencies: action.currencies
            };
        case types.TOGGLE_CHOOSE_WALLET_MODAL:
            return {
                ...state,
                chooseWalletModal: !state.chooseWalletModal
            };
        case types.HANDLE_CHOOSE_WALLET_MODAL:
            return {
                ...state,
                orderWalletChosen: action.order
            };
        case types.BEGIN_CHOOSE_WALLET_ORDERED_PRODUCT:
            return {
                ...state,
                isChoosingWallet: true
            };
        case types.CHOOSE_WALLET_ORDERED_PRODUCT_SUCCESS:
            return {
                ...state,
                isChoosingWallet: false,
                chooseWalletModal: false
            };
        case types.HANDLE_ADD_JAV_CODE_MODAL:
            return {
                ...state,
                orderJavCode: action.order
            };
        case types.TOGGLE_ADD_JAV_CODE_MODAL:
            return {
                ...state,
                addJavCodeModal: !state.addJavCodeModal
            };
        case types.TOGGLE_CAME_TO_VN_MODAL:
            return {
                ...state,
                cameToVNModal: !state.cameToVNModal
            };
        case types.HANDLE_CAME_TO_VN_MODAL:
            return {
                ...state,
                orderCameToVN: action.order
            };
        case types.TOGGLE_IMPORT_WEIGHT_MODAL:
            return {
                ...state,
                importWeightModal: !state.importWeightModal
            };
        case types.HANDLE_IMPORT_WEIGHT_MODAL:
            return {
                ...state,
                orderImportWeight: action.order
            };
        case types.TOGGLE_ADD_SHIP_FEE_MODAL:
            return {
                ...state,
                addShipFeeModal: !state.addShipFeeModal
            };
        case types.HANDLE_ADD_SHIP_FEE_MODAL:
            return {
                ...state,
                orderAddShipFee: action.order
            };
        default:
            return state;
    }
}