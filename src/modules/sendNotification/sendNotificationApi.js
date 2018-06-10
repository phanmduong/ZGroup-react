import axios from 'axios';
import * as env from '../../constants/env';
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";
import moment from "moment/moment";

export function sendNotification(notificationTypeId, name, sendTime) {
    let url = env.MANAGE_API_URL + '/notification/notification-type/send';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'notification_type_id': notificationTypeId,
        'name': name,
        'send_time': sendTime ? moment(sendTime, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT_SQL) : ''
    });
}

export function loadNotificationType(page = 1, search = '') {
    let url = env.MANAGE_API_URL + '/notification/notification-types';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += `&page=${page}&search=${search}`;

    return axios.get(url);
}

export function loadHistoryNotifications(page = 1, search = '') {
    let url = env.MANAGE_API_URL + '/notification/history-send';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += `&page=${page}&search=${search}`;

    return axios.get(url);
}



