import axios from 'axios';
import * as env from '../../constants/env';

export function getCampaignListApi(search) {
    let url = env.MANAGE_API_URL + "/sms/campaign-list";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (search) {
        url += "&search=" + search;
    }
    return axios.get(url);
}