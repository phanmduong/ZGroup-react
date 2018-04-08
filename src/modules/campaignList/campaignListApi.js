import axios from 'axios';
import * as env from '../../constants/env';

export function getCampaignListApi(page, search) {
    let url = env.MANAGE_API_URL + "/sms/campaign-list";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    return axios.get(url);
}

export function changeCampaignStatus(campaignId, status) {
    let url = env.MANAGE_API_URL + "/sms/campaign-list/" + campaignId + "/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        status: status
    });
}