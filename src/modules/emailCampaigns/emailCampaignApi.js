import axios from 'axios';
import * as env from '../../constants/env';
import moment from "moment";
import {DATETIME_FORMAT} from "../../constants/constants";

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
    let timer = moment(campaign.timer, DATETIME_FORMAT).format("YYYY-MM-DD HH:mm:ss");
    let url = env.MANAGE_API_URL + "/email/campaign/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        ...campaign, ... {
            timer: timer
        }
    });
}

export function deleteCampaign(campaignId) {
    let url = env.MANAGE_API_URL + "/email/campaign/" + campaignId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function loadForms() {
    let url = env.MANAGE_API_URL + "/email-forms/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
