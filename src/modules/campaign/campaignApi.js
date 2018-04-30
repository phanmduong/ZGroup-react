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

export function getReceiversModal(campaignId, page = 1, gens, classes, start_time, end_time, top, carer_id, rate, limit = 10, paid_course_quantity) {
    let url = env.MANAGE_API_URL + "/sms/user-list/" + campaignId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (limit) {
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (gens) {
        url += "&gens=" + JSON.stringify(gens);
    }
    if (classes) {
        url += "&classes=" + JSON.stringify(classes);
    }
    if (start_time && end_time) {
        url += "&start_time=" + start_time + "&end_time=" + end_time;
    }
    if (top) {
        url += "&top=" + top;
    }
    if (carer_id) {
        url += "&carer_id=" + carer_id;
    }
    if (rate) {
        url += "&rate=" + rate;
    }
    if (paid_course_quantity) {
        url += "&paid_course_quantity=" + paid_course_quantity;
    }
    return axios.get(url);
}

export function searchStaffs(search) {
    let url = env.MANAGE_API_URL + `/get-staffs?search=` + search;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadAllClasses() {
    let url = env.MANAGE_API_URL + "/v2/class";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function chooseReceivers(campaignId, users) {
    let url = env.MANAGE_API_URL + "/sms/user-list/" + campaignId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        users: JSON.stringify(users)
    });
}