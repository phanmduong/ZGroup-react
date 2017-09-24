import axios from 'axios';
import * as env from '../../constants/env';

export function loadSubscribersList(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/email/subscribers-list?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteSubscribersList(subscribersListId) {
    let url = env.MANAGE_API_URL + "/email/subscribers-list/" + subscribersListId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function storeSubscribersList(subscribersList) {
    let url = env.MANAGE_API_URL + "/email/subscribers-list/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: subscribersList.id,
        name: subscribersList.name
    });
}
