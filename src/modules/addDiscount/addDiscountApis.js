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
        'order_value' : discount.order_value ? discount.order_value : '',
        'customer_id' : discount.customer ? discount.customer.id : '',
        'category_id' : discount.category ? discount.category.id : '',
        'good_id' : discount.good ? discount.good.id : '',
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


export function loadDiscountApi(id) {
    let url = env.MANAGE_API_URL + '/coupon/' + id + '/detailed?'; // chờ API
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function editDiscountApi(discount) {
    let token = localStorage.getItem("token");

    let url = env.MANAGE_API_URL + '/coupon/'+ discount.id +'/edit?';
    if (token){
        url += '&token=' + token;
    }
    return axios.put(url,{
        'name' :  discount.name,
        'description' : discount.description,
        'discount_type' : discount.discount_type,
        'discount_value' : discount.discount_value,
        'type' : discount.type,
        'start_time' : discount.start_time,
        'end_time' : discount.end_time,
        'used_for' : discount.used_for,
        'order_value' : discount.order_value ? discount.order_value : '',
        'customer_id' : discount.customer ? discount.customer.id : '',
        'category_id' : discount.category ? discount.category.id : '',
        'good_id' : discount.good ? discount.good.id : '',
    });
}