import axios from 'axios';
import * as env from '../../../constants/env';

export function loadCards(from, to, projectId = "", staffId = "") {
    let url = env.MANAGE_API_URL + `/card/chart?from=${from}&to=${to}&project_id=${projectId}&staff_id=${staffId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


export const loadFilteredCards = (from, to, projectId = "", staffId = "") => {
    let url = env.MANAGE_API_URL + `/card?from=${from}&to=${to}&project_id=${projectId}&staff_id=${staffId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
};

export const loadProjects = () => {
    let url = env.MANAGE_API_URL + `/projects?limit=-1`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
};


export const loadStaffs = () => {
    let url = env.MANAGE_API_URL + `/staff?limit=-1`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
};

