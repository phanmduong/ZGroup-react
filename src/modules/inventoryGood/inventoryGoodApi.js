import axios from 'axios';
import * as env from '../../constants/env';

const token = localStorage.getItem('token');

export function getInventoriesApi(page, search, manufacture_id, good_category_id, warehouse_id) {
    let url = env.MANAGE_API_URL + "/good/inventories/all?token=" + token;
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (manufacture_id) {
        url += "&manufacture_id=" + manufacture_id;
    }
    if (good_category_id) {
        url += "&good_category_id=" + good_category_id;
    }
    if (warehouse_id) {
        url += "&warehouse_id=" + warehouse_id;
    }
    return axios.get(url);
}

export function getInfoInventoriesApi(page, search, manufacture_id, good_category_id, warehouse_id) {
    let url = env.MANAGE_API_URL + "/good/inventories-info?token=" + token;
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (manufacture_id) {
        url += "&manufacture_id=" + manufacture_id;
    }
    if (good_category_id) {
        url += "&good_category_id=" + good_category_id;
    }
    if (warehouse_id) {
        url += "&warehouse_id=" + warehouse_id;
    }
    return axios.get(url);
}

export function getManufacturesApi() {
    let url = env.MANAGE_API_URL + "/v2/manufacture?token=" + token + "&limit=-1";
    return axios.get(url);
}

export function getCategoriesApi() {
    let url = env.MANAGE_API_URL + "/order/category/all?token=" + token;
    return axios.get(url);
}

export function getHistoryInventoriesApi(id, page, warehouse_id) {
    let url = env.MANAGE_API_URL + "/good/history/" + id + "?token=" + token;
    if (page) {
        url += "&page=" + page;
    }
    if (warehouse_id) {
        url += "&warehouse_id=" + warehouse_id;
    }
    return axios.get(url);
}

export function getWarehouseApi(id) {
    let url = env.MANAGE_API_URL + "/good/warehouses/" + id + "?token=" + token;
    return axios.get(url);
}

export function getWarehouseListApi() {
    let url = env.MANAGE_API_URL + "/order/all-warehouses" + "?token=" + token;
    return axios.get(url);
}