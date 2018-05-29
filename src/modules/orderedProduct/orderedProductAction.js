import * as types from '../../constants/actionTypes';
import * as orderedProductApi from './orderedProductApi';
import * as helper from "../../helpers/helper";

export function loadAllOrders(page = 1, searches, startTime, endTime, status, staff_id, user_id, queries) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ORDERED_PRODUCT});
        const infoPromise = new Promise((resolve) => {
            orderedProductApi.loadOrderInfo(page, searches, startTime, endTime, status, staff_id, user_id, queries)
                .then(res => resolve(res));
        });
        const orderPromise = new Promise((resolve) => {
            orderedProductApi.loadAllOrders(page, searches, startTime, endTime, status, staff_id, user_id, queries)
                .then(res => resolve(res));
        });
        Promise.all([infoPromise, orderPromise]).then(data => {
            const infoRes = data[0];
            const orderRes = data[1];
            dispatch({
                type: types.LOAD_ORDERED_PRODUCT_SUCCESS,
                totalPaidMoney: infoRes.data.data.total_paid_money,
                totalMoney: infoRes.data.data.total_money,
                totalDeliveryOrders: infoRes.data.data.total_delivery_orders,
                notLocked: infoRes.data.data.not_locked,
                deliveryOrders: orderRes.data.delivery_orders,
                currentPage: orderRes.data.paginator.current_page,
                totalPages: orderRes.data.paginator.total_pages,
                totalCount: orderRes.data.paginator.total_count,
                limit: orderRes.data.paginator.limit
            });
        });
    };
}

export function getAllStaffs() {
    return function (dispatch) {
        orderedProductApi.getAllStaffApi()
            .then(res => {
                dispatch({
                    type: types.GET_ALL_STAFFS_ORDERED_PRODUCT,
                    staffs: res.data.staffs
                });
            });
    };
}

export function showAddNoteModal() {
    return ({
        type: types.TOGGLE_ADD_NOTE_MODAL_ORDERED_PRODUCT
    });
}

export function handleAddNoteModal(order) {
    return ({
        type: types.HANDLE_ADD_NOTE_MODAL_ORDERED_PRODUCT,
        order
    });
}

export function editNote(order) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_NOTE_ORDERED_PRODUCT
        });
        helper.showTypeNotification("Đang chỉnh sửa ghi chú", "info");
        orderedProductApi.editNote(order)
            .then(() => {
                dispatch({
                    type: types.EDIT_NOTE_SUCCESS_ORDERED_PRODUCT,
                    order
                });
                helper.showNotification("Thay đổi ghi chú thành công");
            });
    };
}

export function changeStatus(status, deliveryOrderId, note) {
    return function (dispatch) {
        helper.showTypeNotification("Đang thay đổi trạng thái", "info");
        dispatch({
            type: types.BEGIN_CHANGE_STATUS_ORDERED_PRODUCT
        });
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        orderedProductApi.changeStatusApi(status, deliveryOrderId, note)
            .then((res) => {
                if (res.data.status === 0) {
                    helper.showErrorNotification(res.data.message.message);
                } else {
                    helper.showNotification("Thay đổi trạng thái thành công");
                    dispatch({
                        type: types.CHANGE_STATUS_ORDERED_SUCCESS
                    });
                }
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            })
            .catch(() => {
                helper.showErrorNotification("Thay đổi trạng thái xảy ra lỗi");
            });
    };
}

export function showAddCancelNoteModal() {
    return ({
        type: types.TOGGLE_ADD_CANCEL_NOTE_MODAL
    });
}

export function handleAddCancelNoteModal(cancelNote) {
    return ({
        type: types.HANDLE_ADD_CANCEL_NOTE_MODAL,
        cancelNote
    });
}

export function showSendPriceModal() {
    return ({
        type: types.TOGGLE_SEND_PRICE_MODAL
    });
}

export function handleSendPriceModal(orders) {
    return ({
        type: types.HANDLE_SEND_PRICE_MODAL,
        orders
    });
}

export function sendPrice(delivery_orders) {
    return function (dispatch) {
        let orders = delivery_orders.map(order => {
            return {
                id: order.id,
                attach_info: order.attach_info
            };
        });
        helper.showTypeNotification("Đang báo giá", "info");
        dispatch({
            type: types.BEGIN_SEND_PRICE_ORDERED_PRODUCT
        });
        orderedProductApi.sendPriceApi(orders)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Báo giá thành công");
                    dispatch({
                        type: types.SEND_PRICE_SUCCESS_ORDERED_PRODUCT
                    });
                } else {
                    dispatch({
                        type: types.TOGGLE_SEND_PRICE_MODAL
                    });
                    helper.showErrorNotification(res.data.message);
                }
            })
            .catch(() => {
                dispatch({
                    type: types.TOGGLE_SEND_PRICE_MODAL
                });
                helper.showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function loadAllCurrencies() {
    return function (dispatch) {
        orderedProductApi.loadAllCurrenciesApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_CURRENCIES_SUCCESS_ORDERED_PRODUCT,
                    currencies: res.data.data.currencies
                });
            });
    };
}

export function showChooseWalletModal() {
    return ({
        type: types.TOGGLE_CHOOSE_WALLET_MODAL
    });
}

export function handleChooseWalletModal(order) {
    return ({
        type: types.HANDLE_CHOOSE_WALLET_MODAL,
        order
    });
}

export function chooseWallet(order, wallet) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHOOSE_WALLET_ORDERED_PRODUCT
        });
        helper.showTypeNotification("Đang chọn ví", "info");
        orderedProductApi.chooseWalletApi(order, wallet)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification(res.data.data.message);
                } else {
                    helper.showErrorNotification(res.data.message);
                }
                dispatch({
                    type: types.CHOOSE_WALLET_ORDERED_PRODUCT_SUCCESS,

                });
            });
    };
}

export function showAddJavCodeModal() {
    return ({
        type: types.TOGGLE_ADD_JAV_CODE_MODAL
    });
}

export function handleAddJavCodeModal(order) {
    return ({
        type: types.HANDLE_ADD_JAV_CODE_MODAL,
        order
    });
}

export function showCameToVNModal() {
    return ({
        type: types.TOGGLE_CAME_TO_VN_MODAL
    });
}

export function handleCameToVNModal(order) {
    return ({
        type: types.HANDLE_CAME_TO_VN_MODAL,
        order
    });
}

export function showImportWeightModal() {
    return ({
        type: types.TOGGLE_IMPORT_WEIGHT_MODAL
    });
}

export function handleImportWeightModal(order) {
    return ({
        type: types.HANDLE_IMPORT_WEIGHT_MODAL,
        order
    });
}

export function showAddShipFeeModal() {
    return ({
        type: types.TOGGLE_ADD_SHIP_FEE_MODAL
    });
}

export function handleAddShipFeeModal(order) {
    return ({
        type: types.HANDLE_ADD_SHIP_FEE_MODAL,
        order
    });
}

export function loadAllOrderGoodNoPaging(success, searches, startTime, endTime, status, staff_id, user_id, queries) {
    return function () {
        orderedProductApi.loadAllOrderGoodNoPaging(searches, startTime, endTime, status, staff_id, user_id, queries)
            .then((res) => {
               success(res.data.data.delivery_orders);
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra. ");
                success(null);
            });
    };
}


