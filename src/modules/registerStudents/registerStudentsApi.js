import axios from 'axios';
import * as env from '../../constants/env';


export function getRegisterStudent(page = 1, genId, search = '', salerId = '') {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/register-list?page=" + page + "&gen_id=" + genId + "&search=" + search + "&saler_id=" + salerId + "&token=" + token;
    return axios.get(url);
}

export function loadGens() {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/gens?token=" + token;
    return axios.get(url);
}

export function historyCallStudent(studentId, genId) {
    let token = localStorage.getItem('token');
    let url = `${env.MANAGE_API_URL}/history-call-student?id=${studentId}&gen_id=${genId}&token=${token}`;
    return axios.get(url);
}