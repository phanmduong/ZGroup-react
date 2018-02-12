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
    });
}

export function editOrderApi(order, customer) {
    let url = env.MANAGE_API_URL + "/order/delivery/" + customer.id + "?token=" + token;
    return axios.put(url, {
        attach_info: JSON.stringify(order),
        note: customer.note,
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
    });
}

export function loadOrderApi(order_id) {
    let url = env.MANAGE_API_URL + "/order/delivery/" + order_id + "?token=" + token;
    return axios.get(url);
}

export function loadAllCurrenciesApi() {
    let url = env.MANAGE_API_URL + '/v2/currency';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}