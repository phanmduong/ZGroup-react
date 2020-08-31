import axios from 'axios';
import * as env from '../../constants/env';
import moment from "moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";

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
    console.log(campaign);
    let dateIsValid = moment(campaign.timer, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
    let url = env.MANAGE_API_URL + "/email/campaign/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        ...campaign, ... {
            timer: dateIsValid ? moment(campaign.timer, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT_SQL) : null
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
