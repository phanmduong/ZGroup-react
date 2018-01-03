import axios from 'axios';
import * as env from '../../constants/env';

export function loadLandingPages(page = 1, search = '') {
    let url = env.MANAGE_API_URL + "/build-landing-page/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&page=" + page + "&search=" + search;
    return axios.get(url);
}

export function deleteLandingPage(landingPageId) {
    let url = env.MANAGE_API_URL + "/build-landing-page/" + landingPageId + "/delete";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

