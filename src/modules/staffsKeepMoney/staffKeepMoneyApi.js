import axios from 'axios';
import * as env from '../../constants/env';

export function loadStaffsKeepMoney(page = 1, search ="") {

    let url = env.MANAGE_API_URL_V3 + "/finance/staffs-keep-money";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page;
    url += "&search=" + search;
    return axios.get(url);
}

export function loadHistoryTransactionStaff(staffId, page = 1, type = "") {

    let url = env.MANAGE_API_URL_V3 + "/finance/history-transaction/" + staffId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page;
    url += "&type=" + type;
    return axios.get(url);
}

