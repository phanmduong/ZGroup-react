import axios from 'axios';
import * as env from '../../../constants/env';

export function loadSummaryGoods(page,goodId) {
    let url = env.MANAGE_API_URL + '/company/summary-good/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=20" + "&good_id=" +goodId;
    }
    return axios.get(url);
}

export function loadHistoryGood(page,id){
    let url = env.MANAGE_API_URL + '/company/history-good/'+ id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=20";
    }
    return axios.get(url);
}

export function loadAllSummaryGoods() {
    let url = env.MANAGE_API_URL + '/company/summary-good/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    return axios.get(url);
}
export function loadAllGoods() {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/good/all/no-paging";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}
export function createWarehouse(data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/company/warehouse/create";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.post(url, {...data});
}