import axios from 'axios';
import * as env from '../../constants/env';

export function getAllSources() {
    let url = env.MANAGE_API_URL + "/import/sources";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function getAllMarketingCampaigns() {
    let url = env.MANAGE_API_URL + "/import/marketing-campaigns";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function uploadImportData(data = []) {
    let url = env.MANAGE_API_URL + "/import/import-data";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        data
    });
}
