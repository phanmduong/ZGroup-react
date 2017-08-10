/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';

export function deleteBase(base) {
    let url = env.MANAGE_API_URL + "/base/delete/" + base.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function loadBases(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/bases?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadBase(baseId) {
    let url = env.MANAGE_API_URL + "/base/" + baseId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function setDefaultBase(baseId) {
    let url = env.MANAGE_API_URL + "/set-default-base/" + baseId;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function createBase(base) {
    let url = env.MANAGE_API_URL + "/base/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {id: base.id, name: base.name, address: base.address});
}