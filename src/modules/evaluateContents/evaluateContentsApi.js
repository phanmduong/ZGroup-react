import axios from 'axios';
import * as env from '../../constants/env';

export function loadGensApi() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateContentsApi(genID = '', baseID = '') {
    let url = env.MANAGE_API_URL + "/posts/evaluate?gen_id=" + genID + "&base_id=" + baseID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateSalerByGensApi(salerId = '') {
    let url = env.MANAGE_API_URL + "/sales/evaluate/" + salerId + "?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}


export function loadEvaluateContentDetailApi(genID = '', userId = '') {
    let url = env.MANAGE_API_URL + "/posts/evaluate-detail?gen_id=" + genID +  "&user_id=" + userId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadBasesApi() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
