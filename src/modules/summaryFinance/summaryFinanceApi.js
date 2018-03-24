import axios from 'axios';
import * as env from '../../constants/env';

export function loadSummaryFinance(genId = "", startTime = '', endTime = '') {
    let url = env.MANAGE_API_URL_V3 + "/finance/summary";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    url += `&start_time=${startTime}&end_time=${endTime}`;
    url += `&gen_id=${genId}`;

    return axios.get(url);
}

export function loadGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadHistoryTransactions(page = 1, type = "", genId = "", startTime = '', endTime = '') {

    let url = env.MANAGE_API_URL_V3 + "/finance/history-spend-money";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page;
    url += "&type=" + type;
    url += `&start_time=${startTime}&end_time=${endTime}`;
    url += `&gen_id=${genId}`;
    return axios.get(url);
}
