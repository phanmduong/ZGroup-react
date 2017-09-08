import axios from 'axios';
import * as env from '../../constants/env';

export function loadClasses(search, page = 1) {
    let url = env.MANAGE_API_URL + "/class/all?search=" + search + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


