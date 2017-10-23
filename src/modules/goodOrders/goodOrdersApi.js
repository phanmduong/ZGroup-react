import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllOrders(page = 1, search = '', startTime = '', endTime = '') {
    let url = env.MANAGE_API_URL + '/order/all-orders?page=' + page;

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
    return axios.get(url);
}
