import axios from 'axios';
import * as env from '../../constants/env';

export function loadMyNofitications() {
    let url = env.MANAGE_API_URL + '/notification/list';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


