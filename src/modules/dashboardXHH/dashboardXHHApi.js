import axios from 'axios';
import * as env from '../../constants/env';

export function loadDashboard() {
    let url = env.MANAGE_API_URL + `/xhh-dashboard`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}