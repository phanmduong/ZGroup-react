import axios from 'axios';
import * as env from '../../constants/env';


export function getRegisterStudent(page = 1, search = '', salerId = '') {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/register-list?page=" + page + "&search=" + search + "&saler_id=" + salerId + "&token=" + token;
    return axios.get(url);
}

export function loadGens() {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/gens?token=" + token;
    return axios.get(url);
}

