import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllOrders(page = 1, search, startTime, endTime, staff_id, user_id) {
    let url = env.MANAGE_API_URL + '/order/delivery?limit=10&page=' + page;
    if (search) {
        url += `&search=${search}`;
    }
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (staff_id) {
        url += `&staff_id=${staff_id}`;
    }
    if (user_id) {
        url += `&user_id=${user_id}`;
    }
    return axios.get(url);
}

export function loadOrderInfo(page = 1, search, startTime, endTime, staff_id, user_id) {
    let url = env.MANAGE_API_URL + '/order/delivery-info?page=' + page;
    if (search) {
        url += `&search=${search}`;
    }
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (staff_id) {
        url += `&staff_id=${staff_id}`;
    }
    if (user_id) {
        url += `&user_id=${user_id}`;
    }
    return axios.get(url);
}
