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
    let url = env.MANAGE_API_URL + "/sms/template-types";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

// /sms/campaign-detail/1?token=
// get all tin nhan
export function loadAllMessageApi(campaignId, page, search) {
    let url = env.MANAGE_API_URL + "/sms/campaign-detail/" + campaignId;
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