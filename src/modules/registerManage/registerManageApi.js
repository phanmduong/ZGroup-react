import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllRegistersApi(limit, page = 1, search, saler_id, status, campaign_id,base_id,startTime,endTime) {
    let url = env.MANAGE_API_URL + '/coworking-space/register?page=' + page;
    if (search) {
        url += "&search=" + search;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (saler_id) {
        url += "&saler_id=" + saler_id;
    }
    if (limit) {
        url += "&limit=" + limit;
    }
    if (status) {
        url += "&status=" + status;
    }
    if (campaign_id) {
        url += "&campaign_id=" + campaign_id;
    }
    if (startTime) {
        url += "&start_time=" + startTime;
    }
    if (endTime) {
        url += "&end_time=" + endTime;
    }
    if (base_id) {
        url += "&base_id=" + base_id;
    }
    return axios.get(url);
}

export function getAllSalerApi() {
    let url = env.MANAGE_API_URL + '/coworking-space/saler?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function changeCallStatusApi(status, note, register_id, user_id) {
    let url = env.MANAGE_API_URL + '/coworking-space/save-call?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "register_id": register_id,
        "listener_id": user_id,
        "note": note,
        "call_status": status,
    });
}

export function savePaymentApi(hour, minute,money,note, register_id, user_id) {
    let url = env.MANAGE_API_URL + '/company/payment/create?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "register_id": register_id,
        "user_id": user_id,
        "money_value": money,
        "description" : note,
        "time" : parseInt(hour) * 60 +   parseInt(minute),
    });
}

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadSubscriptionApi(userpack_id) {
    let url = env.MANAGE_API_URL + "/coworking-space/user-pack/" + userpack_id + "/subscription";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function loadUserpackApi(){
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + `/coworking-space/user-pack?&token=${token}&limit=-1`;
    return axios.get(url);
}
export function saveSubscriptionApi(register_id,select) {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + `/coworking-space/register/${register_id}/assign-subscription?&token=${token}`;
    return axios.put(url,{
        'subscription_id' : select.subscription_id,
        'start_time' : select.start_time,
        'extra_time' :select.extra_time,
        'end_time' : select.end_time,
        'note' : select.note,
    });
}

export function createRegisterApi(register) {
    let url = env.MANAGE_API_URL + '/coworking-space/register?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "name": register.name,
        "phone": register.phone,
        "email": register.email,
        "base_id" : register.base_id,
        "subscription_id" : register.subscriptions,
    });
}