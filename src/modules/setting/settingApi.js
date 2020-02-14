import axios from 'axios';
import * as env from '../../constants/env';

export function getAllSettingApi() {
    let url = env.NEW_MANAGE_API_URL + "/setting/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function saveSettingsApi(settings) {
    let url = env.NEW_MANAGE_API_URL + "/setting/save";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {settings});
}