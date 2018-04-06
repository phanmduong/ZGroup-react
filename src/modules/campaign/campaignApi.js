import axios from 'axios';
import * as env from '../../constants/env';


//  /campaign-detail/{campaignId} api Post tin nhan theo campainId = 1
export function saveMessageApi(message) {
    let url = env.MANAGE_API_URL + "/sms/campaign-detail/1";
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
export function loadAllMessageApi(page) {
    let url = env.MANAGE_API_URL + "/sms/campaign-detail/1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (page) {
        url += "&page=" + page;
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