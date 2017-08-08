/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';

export function loadBases(page = 1) {
    let url = env.MANAGE_API_URL + "/bases?page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}


export function setDefaultBase(baseId) {
    let url = env.MANAGE_API_URL + "/set-default-base/" + baseId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url);
}
