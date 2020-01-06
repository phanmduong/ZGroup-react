import axios from 'axios';
import * as env from '../../constants/env';

export function loadDiscountsApi(filter) {
    let {page, limit, search} = filter;
    let url = env.MANAGE_API_URL + "/coupon/all?";
    let token = localStorage.getItem('token');
    if (limit) {
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteDiscountApi(id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/coupon/' + id + '/delete?';
    if (token) {
        url += 'token=' + token;
    }
    return axios.delete(url);
}
