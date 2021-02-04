import axios from 'axios';
import * as env from '../../constants/env';
// eslint-disable-next-line import/named
import {makeid} from "../../helpers/helper";

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
    let url = env.MANAGE_API_URL + `/shift-registers/current-shifts?base_id=${baseId}&gen_id=${genId}&c=${makeid(10)}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function register(shiftRegisterId) {
    let url = env.MANAGE_API_URL + "/shift-registers/register-shift/" + shiftRegisterId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function removeRegister(shiftRegisterId) {
    let url = env.MANAGE_API_URL + "/shift-registers/remove-shift-regis/" + shiftRegisterId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}