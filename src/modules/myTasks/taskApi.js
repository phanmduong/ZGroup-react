import axios from 'axios';
import * as env from '../../constants/env';

export function getTasksApi(date = '') {
    let url = env.MANAGE_API_URL + "/task/by-user?date=" + date;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
