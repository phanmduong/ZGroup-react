import axios from 'axios';
import * as env from '../../constants/env';

export function historyCalls(page = 1, callerId = '') {
    let url = env.MANAGE_API_URL + "/history-calls?caller_id=" + callerId + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


