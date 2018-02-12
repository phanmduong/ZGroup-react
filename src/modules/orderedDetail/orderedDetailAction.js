import * as types from '../../constants/actionTypes';
import * as orderedDetailApi from './orderedDetailApi';
import * as helper from "../../helpers/helper";
import {browserHistory} from 'react-router';

export function saveOrder(order, customer) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        orderedDetailApi.saveOrderApi(order, customer)
            .then(function () {
                browserHistory.push("/order/orders");
                helper.showNotification("Thêm đơn hàng thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function editOrder(order, customer) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        orderedDetailApi.editOrderApi(order, customer)
            .then(function () {
                browserHistory.push("/order/orders");
                helper.showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.HIDE_GLOBAL_LOADING
                });
            });
    };
}

export function loadOrder(order_id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ORDER_ORDERED_DETAIL
        });
        orderedDetailApi.loadOrderApi(order_id)
            .then(function (res) {
                let order = res.data.data.delivery_order.attach_info ? (
                    JSON.parse(res.data.data.delivery_order.attach_info)
                ) : ({
                    size: '',
                    link: '',
                    color: '',
                    description: '',
                    sale_off: 0,
                    weight: 0,
                    tax: true,
                    unit: '',
                    ratio: 1,
                    money: 0,
                    fee: 0,
                    code: '',
                    endTime: '',
                    price: 0,
                    quantity: 0
                });
                let customer = res.data.data.delivery_order.customer ? ({
                    ...res.data.data.delivery_order.customer,
                    id: res.data.data.delivery_order.id,
                    note: res.data.data.delivery_order.note || '',
                }) : ({
                    name: '',
                    phone: '',
                    email: '',
                    note: '',
                    id: res.data.data.delivery_order.id,
                });
                dispatch({
                    type: types.LOAD_ORDER_ORDERED_DETAIL_SUCCESS,
                    order: order,
                    customer: customer
                });
            });
    };
}

export function handleOrder(order) {
    return ({
        type: types.HANDLE_ORDER_ORDERED_DETAIL,
        order
    });
}

export function handleCustomer(customer) {
    return ({
        type: types.HANDLE_CUSTOMER_ORDERED_DETAIL,
        customer
    });
}

export function handleDate(endTime) {
    return ({
        type: types.HANDLE_DATE_ORDERED_DETAIL,
        endTime
    });
}

export function loadAllCurrencies() {
    return function (dispatch) {
        orderedDetailApi.loadAllCurrenciesApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_CURRENCIES_SUCCESS_ORDERED_DETAIL,
                    currencies: res.data.data.currencies
                });
            });
    };
}



