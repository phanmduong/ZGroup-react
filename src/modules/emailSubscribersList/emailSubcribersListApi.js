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

export function loadSubscribers(listId, page = 1, query = null) {
    let url = env.MANAGE_API_URL + `/email/subscribers?list_id=${listId}&page=${page}`;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function addEmails(listId, emails) {
    let url = env.MANAGE_API_URL + "/email/subscribers/add";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        list_id: listId,
        emails: emails
    });
}

export function uploadFile(listId, file, completeHandler, error) {
    let url = env.MANAGE_API_URL + '/email/subscribers/upload-file';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formdata = new FormData();
    formdata.append('csv', file);
    formdata.append('list_id', listId);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
    ajax.addEventListener("error", error, false);
}

export function deleteSubscriber(listId, subscriberId) {
    let url = env.MANAGE_API_URL + "/email/subscribers/delete?list_id=" + listId + "&subscriber_id=" + subscriberId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.delete(url);
}