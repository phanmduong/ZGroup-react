import axios from 'axios';
import * as env from '../../constants/env';

const token = localStorage.getItem('token');

export function getInventoriesOrderApi(page = 1, search, staff_id, user_id, start_time, end_time) {
    let url = env.MANAGE_API_URL + "/order/delivery/inventories";
    if (token) {
        url += "?token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (staff_id) {
        url += "&staff_id=" + staff_id;
    }
    if (user_id) {
        url += "&user_id=" + user_id;
    }
    if (start_time && end_time) {
        url += "&start_time=" + start_time + "&end_time=" + end_time;
    }
    return axios.get(url);
}

export function getInfoInventoriesOrderApi(page = 1, search, staff_id, user_id, start_time, end_time) {
    let url = env.MANAGE_API_URL + "/order/delivery/inventories-info";
    if (token) {
        url += "?token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (staff_id) {
        url += "&staff_id=" + staff_id;
    }
    if (user_id) {
        url += "&user_id=" + user_id;
    }
    if (start_time && end_time) {
        url += "&start_time=" + start_time + "&end_time=" + end_time;
    }
    return axios.get(url);
}

export function getAllStaffApi() {
    let url = env.MANAGE_API_URL + '/staff?limit=-1';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

