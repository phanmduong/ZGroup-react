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

export function editOrder(product) {
    return function (dispatch) {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
        orderedDetailApi.editOrderApi(product)
            .then(function () {
                browserHistory.push("/good/goods/products");
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
                    quantity: 0,
                    sale_off: 0,
                    weight: 0,
                    tax: true,
                    price: 0,
                    unit: '',
                    ratio: 1,
                    money: 0,
                    fee: 0,
                    code: '',
                    endTime: ''
                });
                let customer = res.data.data.delivery_order.customer ? ({
                    ...res.data.data.delivery_order.customer,
                    note: res.data.data.delivery_order.note || ''
                }) : ({
                    name: '',
                    phone: '',
                    email: '',
                    note: ''
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


