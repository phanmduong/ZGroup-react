import axios from 'axios';
import * as env from '../../constants/env';

export function historyCollectMoney(filter = {}) {
    let {limit = 40, search = '', page = 1, collectorId = null, start_time = null, end_time = null} = filter;
    let url = env.MANAGE_API_URL + "/collect-money/history?search=" + search +
        "&limit=" + limit +
        "&staff_id=" + collectorId +
        "&page=" + page +
        "&start_time=" + start_time +
        "&end_time=" + end_time
    ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


