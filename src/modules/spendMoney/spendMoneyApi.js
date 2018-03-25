import axios from 'axios';
import * as env from '../../constants/env';

export function loadHistoryTransactions(page = 1, type = "") {

    let url = env.MANAGE_API_URL_V3 + "/finance/history-spend-money-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page;
    url += "&type=" + type;
    return axios.get(url);
}

export function getCategoryTransactions() {

    let url = env.MANAGE_API_URL_V3 + "/finance/category-transactions";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadUser() {

    let url = env.MANAGE_API_URL + "/my-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function createSpendMoney(data) {

    let url = env.MANAGE_API_URL_V3 + "/finance/create-spend-money";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        money: data.money,
        type: data.type,
        note: data.note,
        category_id: data.category_id,
    });
}

