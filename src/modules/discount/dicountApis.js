import axios from 'axios';
import * as env from '../../constants/env';

export function loadDiscountsApi(limit , page , query ) {
    let url = env.MANAGE_API_URL + "/coupon/all?";
    let token = localStorage.getItem('token');
    if (limit){
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}