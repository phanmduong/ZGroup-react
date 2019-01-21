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

export function loadDashboard(genId, baseId, startTime = '', endTime = '') {
    let url = env.MANAGE_API_URL + `/gens/${genId}/dashboard-study-pack`;
    if (baseId) {
        url += '/' + baseId;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    url += `&start_time=${startTime}&end_time=${endTime}`;

    return axios.get(url);
}

export function loadStudyPackRegister(genId, baseId, search = '', filter = '', filterStatus = 1, page = '') {
    let url = env.MANAGE_API_URL + `/study-pack/registers?gen_id=${genId}&base_id=${baseId}&search=${search}&page=${page}
    &filter=${filter}&filter_status=${filterStatus}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function changeClassStatus(classId) {
    let url = env.MANAGE_API_URL + `/class/change-status`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'class_id': classId
    });
}
