import axios from 'axios';
import * as env from '../../constants/env';

export function historyExtensionWork(page = 1, search = '') {
    let url = env.MANAGE_API_URL + "/work/history-extension";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=2" + "&search=" + search;

    }
    return axios.get(url);
}

export function deleteHistoryExtensionWork(id) {
    let url = env.MANAGE_API_URL + "/work/history-extension/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id + "?token=" + token;
    }
    return axios.delete(url);
}

export function acceptHistoryExtensionWork(id) {
    let url = env.MANAGE_API_URL + "/work/history-extension/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id + "?token=" + token;
    }
    return axios.post(url);
}

