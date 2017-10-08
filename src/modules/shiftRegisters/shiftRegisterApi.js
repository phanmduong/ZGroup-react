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
    let url = env.MANAGE_API_URL + "/base/center/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadShiftRegisters(baseId, genId) {
    let url = env.MANAGE_API_URL + `/shift-registers/current-shifts?base_id=${baseId}&gen_id=${genId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}