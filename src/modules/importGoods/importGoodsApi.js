import axios from 'axios';
import * as env from '../../constants/env';

export function loadImportOrders(startTime = '', endTime = '') {
    let url = env.MANAGE_API_URL + '/order/import-orders';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }

    return axios.get(url);
}

export function loadImportGoodsOrder(orderId) {
    let url = env.MANAGE_API_URL + '/order/detailed-import-order/' + orderId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function searchGoods(search) {
    let url = env.MANAGE_API_URL + `/good/all?limit=-1&search=${search}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}
