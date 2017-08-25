import axios from 'axios';
import * as env from '../../constants/env';

export function loadTemplates(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/email-templates?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}