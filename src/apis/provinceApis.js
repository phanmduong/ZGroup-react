import axios from 'axios';
import * as env from '../constants/env';

export function loadProvincesApi() {
    let url = env.NEW_MANAGE_API_URL + "/province/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}