import axios from 'axios';
import * as env from '../../constants/env';

export function addDiscountApi(discount) {
    let url = env.MANAGE_API_URL + "/coupon/create?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.post(url,{
        'name' :  discount.name,
        'description' : discount.description,
        'discount_type' : discount.discount_type,
        'discount_value' : discount.discount_value,
        'type' : discount.type,
        'start_time' : discount.start_time,
        'end_time' : discount.end_time,
        'used_for' : discount.used_for,
    });
}

export function loadCustomersApi(limit , page , query ) {
    let url = env.MANAGE_API_URL + "/order/all-customers?";
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

export function loadGoodsApi(limit , page , query ) {
    let url = env.MANAGE_API_URL + "/good/all?";
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

export function loadCategoriesApi() {
    let url = env.MANAGE_API_URL + "/order/category/all?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}