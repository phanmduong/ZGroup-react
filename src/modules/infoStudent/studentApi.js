import axios from 'axios';
import * as env from '../../constants/env';

export function loadRegisters(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/registers`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadInfoStudent(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function historyCalls(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/history-calls`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}