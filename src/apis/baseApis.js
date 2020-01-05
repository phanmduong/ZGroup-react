import axios from 'axios';
import * as env from '../constants/env';

export function loadBasesApi() {
    let url = env.NEW_MANAGE_API_URL + "/base/all?include=district.province";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}