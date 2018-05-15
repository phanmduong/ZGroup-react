import axios from 'axios';
import * as env from '../../constants/env';

export function loadMyNofitications(page = 1) {
    let url = env.MANAGE_API_URL + '/notification/list?page=' + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function readAllNofitications() {
    let url = env.MANAGE_API_URL + '/notification/seen';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
