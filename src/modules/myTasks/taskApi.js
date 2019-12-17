import axios from 'axios';
import * as env from '../../constants/env';

export function getTasksApi(date = '', user_id = '') {
    let url = env.NEW_MANAGE_API_URL + "/task/by-date?date=" + date;
    url += "&include=task_list,register.saler";
    url += "&user_id=" + user_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function getAnalyticTasksApi(user_id = '') {
    let url = env.MANAGE_API_URL + "/task/analytics/by-user";
    url += "?user_id=" + user_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function getEmployeesApi() {
    let url = env.NEW_MANAGE_API_URL + "/task/all-employees";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
