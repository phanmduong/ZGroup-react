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
    let url = env.MANAGE_API_URL + `/work-shift/current-shifts?base_id=${baseId}&gen_id=${genId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadDetailShiftsUser(baseId, genId, week, userId) {
    let url = env.MANAGE_API_URL + `/work-shift/detail-shifts/${userId}?base_id=${baseId}&gen_id=${genId}&week=${week}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function register(workShiftRegisterId) {
    let url = env.MANAGE_API_URL + "/work-shift/register-shift/" + workShiftRegisterId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}

export function removeRegister(workShiftRegisterId) {
    let url = env.MANAGE_API_URL + "/work-shift/remove-register-shift/" + workShiftRegisterId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}