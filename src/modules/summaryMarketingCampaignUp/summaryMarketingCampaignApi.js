import axios from 'axios';
import * as env from '../../constants/env';

export function loadSummaryMarketingCampaign( baseId = '', startTime = '',endTime = '') {
    let url = env.MANAGE_API_URL + "/room-service/marketing-campaign/summary";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    url += `&base_id=${baseId}&start_time=${startTime}&end_time=${endTime}`;

    return axios.get(url);
}


export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}