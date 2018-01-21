import axios from 'axios';
import * as env from '../../constants/env';

const token = localStorage.getItem("token");

export function saveOrderApi(order, customer) {
    let url = env.MANAGE_API_URL + "/order/delivery?token=" + token;
    return axios.post(url, {
        attach_info: JSON.stringify(order),
        note: customer.note,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        price: customer.price,
        quantity: customer.quantity
    });
}

export function editOrderApi(order, customer) {
    let url = env.MANAGE_API_URL + "/order/delivery/" + order.id + "?token=" + token;
    return axios.put(url, {
        attach_info: JSON.stringify(order),
        note: customer.note,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
        price: customer.price,
        quantity: customer.quantity
    });
}

export function loadOrderApi(order_id) {
    let url = env.MANAGE_API_URL + "/order/delivery/" + order_id + "?token=" + token;
    return axios.get(url);
}