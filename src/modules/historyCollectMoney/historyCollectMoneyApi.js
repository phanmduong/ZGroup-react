import axios from 'axios';
import * as env from '../../constants/env';

export function historyCollectMoney(search, page = 1, collectorId = '') {
    let url = env.MANAGE_API_URL + "/collect-money/history?search=" + search + "&staff_id=" + collectorId + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


