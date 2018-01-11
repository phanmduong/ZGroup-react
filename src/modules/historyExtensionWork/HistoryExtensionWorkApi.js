import axios from 'axios';
import * as env from '../../constants/env';

export function historyExtensionWork(page = 1, search = '') {
    let url = env.MANAGE_API_URL + "/work/history-extension";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=10" + "&search=" + search;

    }
    return axios.get(url);
}

export function deleteHistoryExtensionWork(id,userId) {
    let url = env.MANAGE_API_URL + "/work/history-extension/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id + "/refuse" + "?token=" + token;
    }
    return axios.post(url, {
        'status': 'Refuse',
        'manager_id': userId,
    });
}

export function acceptHistoryExtensionWork(id,userId) {
    let url = env.MANAGE_API_URL + "/work/history-extension/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id + "/accept" + "?token=" + token;
    }
    return axios.post(url, {
        'status': 'Accept',
        'manager_id': userId,
    });
}

