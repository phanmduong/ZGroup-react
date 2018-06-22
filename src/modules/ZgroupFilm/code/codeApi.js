import axios from 'axios';
import * as env from '../../../constants/env';


//Api tao code
export function postCodeApi(code) {
    let url = env.MANAGE_API_URL + "/code";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,code);
}

export function getCodeApi() {
    let url = env.MANAGE_API_URL + "/code";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function editCodeApi(code) {
    let url = env.MANAGE_API_URL + "/code/"+ code.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,code);
}

export function deleteCodeApi(code) {
    let url = env.MANAGE_API_URL + "/code/"+ code.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}
