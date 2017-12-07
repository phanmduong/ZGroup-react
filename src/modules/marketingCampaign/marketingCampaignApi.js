import axios from 'axios';
import * as env from '../../constants/env';

export function loadMarketingEmail(page = 1) {
    let url = env.MANAGE_API_URL + '/marketing-campaign/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += `&page=${page}`;

    return axios.get(url);
}

export function loadAllCourses() {

    let url = env.MANAGE_API_URL + "/v2/course/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function storeMarketingCampaign(marketingCampaign) {

    let url = env.MANAGE_API_URL + "/marketing-campaign/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: marketingCampaign.id ? marketingCampaign.id : '',
        name: marketingCampaign.name,
        color: marketingCampaign.color && marketingCampaign.color[0] == '#' ? marketingCampaign.color.substr(1) : marketingCampaign.color,
    });
}



