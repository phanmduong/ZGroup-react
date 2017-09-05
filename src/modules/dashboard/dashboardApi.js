import axios from 'axios';
import * as env from '../../constants/env';

export function loadGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadDashboard(genId, baseId) {
    let url = env.MANAGE_API_URL + `/gens/${genId}/dashboard`;
    if (baseId) {
        url += '/'+ baseId;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
