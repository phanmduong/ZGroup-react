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

export function saveCampaignModal(campaign) {
    let edit = campaign.id ? ('/' + campaign.id) : '';
    let url = env.MANAGE_API_URL + '/sms/campaign-list' + edit;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (campaign.id)
        return axios.put(url, campaign);
    return axios.post(url, campaign);
}

export function getTemplateTypes(page = 1, search = '') {
    let url = env.MANAGE_API_URL + "/sms/template-types";
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
    url += "&limit="+10;
    return axios.get(url);
}

export function saveTemplateType(type) {
    let edit = type.id ? ('/' + type.id) : '';
    let url = env.MANAGE_API_URL + '/sms/template-types' + edit;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (type.id)
        return axios.put(url, type);
    return axios.post(url, type);
}