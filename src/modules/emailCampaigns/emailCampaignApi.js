import axios from 'axios';
import * as env from '../../constants/env';

export function loadCampaigns(page = 1, query = null, ownerId = "") {
    let url = env.MANAGE_API_URL + "/email/campaigns?page=" + page + "&owner_id=" + ownerId;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadSubscribersList() {
    let url = env.MANAGE_API_URL + "/email/subscribers-list/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function storeCampaign(campaign) {
    let url = env.MANAGE_API_URL + "/email/campaign/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, campaign);
}
