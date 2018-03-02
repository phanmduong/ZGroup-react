import axios from 'axios';
import * as env from '../../../constants/env';

export function loadDetailOrder(orderId) {
    let url = env.MANAGE_API_URL + `/order/${orderId}/info`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

