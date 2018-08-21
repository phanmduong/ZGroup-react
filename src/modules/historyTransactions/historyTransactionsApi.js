import axios from 'axios';
import * as env from '../../constants/env';

export function loadHistoryTransactions(page = 1, type = "") {

    let url = env.MANAGE_API_URL + "/finance/history-transactions";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page;
    url += "&type=" + type;
    return axios.get(url);
}

