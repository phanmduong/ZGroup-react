import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllRegistersApi(page = 1, search, staff_id, status,campaign_id) {
    let url = env.MANAGE_API_URL + '/coworking-space/register?page=' + page;
    if (search) {
        url += `&search=${search}`;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (staff_id) {
        url += `&staff_id=${staff_id}`;
    }
    if (status) {
        url += `&status=` + status;
    }
    if (campaign_id) {
        url += `&campaign_id=` + campaign_id;
    }
    return axios.get(url);
}

export function getAllStaffApi() {
    let url = env.MANAGE_API_URL + '/staff?limit=-1';
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
    return axios.post(url,{
        "register_id" : register_id,
        "listener_id" : user_id,
        "note" : note,
        "call_status" : status,
    });
}