import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllRegistersApi(limit, page = 1, search, staff_id, status, campaign_id,base_id,startTime,endTime) {
    let url = env.MANAGE_API_URL + '/coworking-space/register?page=' + page;
    if (search) {
        url += "&search=" + search;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (staff_id) {
        url += "&staff_id=" + staff_id;
    }
    if (limit) {
        url += "&limit=" + limit;
    }
    if (status) {
        url += "&status=" + status;
    }
    if (campaign_id) {
        url += "&campaign_id=" + campaign_id;
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

export function getAllSalerApi() {
    let url = 'api.quanca.net/all-saler?limit=-1';
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

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}