import axios from 'axios';
import * as env from '../../constants/env';

export function loadUser() {

    let url = env.MANAGE_API_URL + "/profile";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
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

export function getTransactions(page = 1, type = "", status = "") {

    let url = env.MANAGE_API_URL + "/finance/transactions";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page;
    url += "&type=" + type;
    url += "&status=" + status;
    return axios.get(url);
}

export function createTransaction(receiverId, money) {

    let url = env.MANAGE_API_URL + "/finance/create-transaction";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        receiver_id: receiverId,
        money: money
    });
}

export function confirmTransaction(transactionId, status) {

    let url = env.MANAGE_API_URL + "/finance/confirm-transaction";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        transaction_id: transactionId,
        status: status,
    });
}

