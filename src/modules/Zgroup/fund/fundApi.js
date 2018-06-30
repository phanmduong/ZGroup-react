

import axios from 'axios';
import * as env from '../../../constants/env';

export function loadAllHistoryFund(page = 1, filter = {}) {
    let url = env.MANAGE_API_URL + "/company/history-fund/all?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    if(filter){
        if(filter.send_id){
            url += "&send_id=" + filter.send_id;
        }
        if(filter.receive_id){
            url += "&receive_id=" + filter.receive_id;
        }
    }
    return axios.get(url);
}

export function loadAllFund(page = 1) {
    let url = env.MANAGE_API_URL + "/company/fund/all?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}
export function loadAllFundNoPaging() {
    let url = env.MANAGE_API_URL + "/company/fund/all?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    
        url += "&limit=-1" ;
    
    return axios.get(url);
}

export function transfer(data) {
    let url = env.MANAGE_API_URL + "/company/history-fund/create?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    
    return axios.post(url, data);
}

export function createFund(data) {
    let url = env.MANAGE_API_URL + "/company/fund/" + (data.id ? (+data.id) : 'create')+"?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
   
    return (data.id ? axios.put(url,data) : axios.post(url,data));
}
