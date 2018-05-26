

import axios from 'axios';
import * as env from '../../../constants/env';

export function loadAllFund(page = 1) {
    let url = env.MANAGE_API_URL + "/company/fund/all?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}

export function createFund(data) {
    let url = env.MANAGE_API_URL + "/company/fund/" + (data.id ? (+data.id) : 'create')+"?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
   
    return (data.id ? axios.put(url,data) : axios.post(url,data));
}
