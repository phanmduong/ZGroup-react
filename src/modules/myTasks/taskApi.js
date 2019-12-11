import axios from 'axios';
import * as env from '../../constants/env';

export function getTasksApi(date = '') {
    let url = env.NEW_MANAGE_API_URL + "/task/by-user?date=" + date;
    url += "&include=task_list,register.saler";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function getAnalyticTasksApi() {
    let url = env.MANAGE_API_URL + "/task/analytics/by-user";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
