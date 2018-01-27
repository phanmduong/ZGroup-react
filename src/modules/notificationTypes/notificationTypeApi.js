import axios from 'axios';
import * as env from '../../constants/env';

export function loadNotificationType(page = 1, search = '') {
    let url = env.MANAGE_API_URL + '/notification/notification-types';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += `&page=${page}&search=${search}`;

    return axios.get(url);
}

export function deleteNotificationType(notificationTypeId) {
    let url = env.MANAGE_API_URL + '/notification/notification-type/' + notificationTypeId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.delete(url);
}

export function createNotificationType(notificationType) {
    let url = env.MANAGE_API_URL + '/notification/notification-type';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, notificationType);
}

export function editNotificationType(notificationType) {
    let url = env.MANAGE_API_URL + '/notification/notification-type/' + notificationType.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.put(url, notificationType);
}



