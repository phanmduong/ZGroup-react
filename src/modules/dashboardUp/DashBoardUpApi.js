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

export function loadDashBoard() {
    let url = env.MANAGE_API_URL + '/gen/23/dashboard';
    // if (baseId) {
    //     url += '/' + baseId;
    // }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    //
    // url += `&start_time=${startTime}&end_time=${endTime}`;
    url += "&start_time=2017-09-01&end_time=2017-10-31";
    return axios.get(url);
}
