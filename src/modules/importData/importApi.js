import axios from 'axios';
import * as env from '../../constants/env';
import {STATUS_REFS} from "../../constants/constants";

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

export function getAllStatusesLead() {
    let url = `${env.NEW_MANAGE_API_URL}/statuses/all?ref=${STATUS_REFS["registers"]}`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function getAllStatusesRegister() {
    let url = `${env.NEW_MANAGE_API_URL}/statuses/all?ref=${STATUS_REFS["leads"]}`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
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
