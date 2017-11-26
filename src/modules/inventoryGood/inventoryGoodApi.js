import axios from 'axios';
import * as env from '../../constants/env';

export function getInventoriesApi(page, search, manufacture_id, good_category_id) {
    let token = localStorage.getItem('token');
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
    return axios.get(url);
}

export function getManufacturesApi() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/good/manufactures?token=" + token;
    return axios.get(url);
}

export function getCategoriesApi() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/order/category/all?token=" + token;
    return axios.get(url);
}

export function getHistoryInventoriesApi(id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/good/history/" + id + "?token=" + token;
    return axios.get(url);
}

export function getWarehouseApi(id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/good/warehouses/" + id + "?token=" + token;
    return axios.get(url);
}

export function getInfoInventoriesApi() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/good/inventories-info?token=" + token;
    return axios.get(url);
}