import axios from 'axios';
import * as env from '../../constants/env';


//  /campaign-detail/{campaignId} api Post tin nhan theo campainId = 1
export function saveMessageApi(campaignId, message) {
    let url = env.MANAGE_API_URL + "/sms/campaign-detail/" + campaignId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, message);
}

// /sms/template-types
// get danh sach loại tin nhắn
export function loadTypeOfMessageApi() {
    let url = env.MANAGE_API_URL + "/sms/template-types?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

// get all tin nhan /sms/campaign-detail/{campaignId}/template-list
export function loadAllMessageApi(campaignId, page, search) {
    let url = env.MANAGE_API_URL + "/sms/campaign-detail/" + campaignId + "/template-list";
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

// edit message /sms/template-list/{templateId}
export function editMessageApi(message) {
    let url = env.MANAGE_API_URL + "/sms/template-list/" + message.template_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, message);
}

// get all nguoi nhan /sms/campaign-detail/{campaignId}/receiver-list
export function loadAllReceiverApi(campaignId, page, search) {
    let url = env.MANAGE_API_URL + "/sms/campaign-detail/" + campaignId + "/receiver-list";
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