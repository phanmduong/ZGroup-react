import axios from 'axios';
import * as env from '../../constants/env';

export function loadHonorStaffs() {
    let url = env.MANAGE_API_URL + "/get-honor-staffs";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function addHonorStaffs(data) {
    let url = env.MANAGE_API_URL + "/add-honor-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}
export function deleteHonorStaffs(data) {
    let url = env.MANAGE_API_URL + "/delete-honor-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {honor_id: data.honor_id});
}
