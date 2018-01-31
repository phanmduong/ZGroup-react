import axios from 'axios';
import * as env from '../../constants/env';

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadDashBoard(genId =23, baseId, startTime = '2017-10-01', endTime = '2017-10-31') {
    let url = env.MANAGE_API_URL + `/gens/${genId}/dashboard`;
    if (baseId) {
        url += '/' + baseId;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    url += `&start_time=${startTime}&end_time=${endTime}`;

    return axios.get(url);
}
