import axios from 'axios';
import * as env from '../../../constants/env';

export function loadAllRegistersApi(limit, page = 1, search, saler_id, base_id, startTime, endTime) {
    let url = env.MANAGE_API_URL + '/coworking-space/register?page=' + page;
    if (search) {
        url += "&search=" + search;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (saler_id) {
        url += "&saler_id=" + saler_id;
    }
    if (limit) {
        url += "&limit=" + limit;
    }
    if (startTime) {
        url += "&start_time=" + startTime;
    }
    if (endTime) {
        url += "&end_time=" + endTime;
    }
    if (base_id) {
        url += "&base_id=" + base_id;
    }
    return axios.get(url);
}

export function loadAllBasesApi() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadAllSalersApi() {
    let url = env.MANAGE_API_URL + '/coworking-space/saler?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function changeCallStatusApi(status, note, register_id, user_id) {
    let url = env.MANAGE_API_URL + '/coworking-space/save-call?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "register_id": register_id,
        "listener_id": user_id,
        "note": note,
        "call_status": status,
    });
}

export function savePaymentApi(money, note, register_id, user_id) {
    let url = env.MANAGE_API_URL + '/company/payment/create?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "register_id": register_id,
        "user_id": user_id,
        "money_value": money,
        "description": note,
    });
}

export function updateOfficialTimeApi(register) {
    let url = env.MANAGE_API_URL + '/coworking-space/room-booking/' + register.id + '/assign-time?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url, {
        "start_time": register.official_start_time,
        "end_time": register.official_end_time,
    });
}

