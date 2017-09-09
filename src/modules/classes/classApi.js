import axios from 'axios';
import * as env from '../../constants/env';

export function loadClasses(search, page = 1, teacherId = '') {
    let url = env.MANAGE_API_URL + "/class/all?search=" + search + "&teacher_id=" + teacherId + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteClass(classId) {
    let url = env.MANAGE_API_URL + "/class/delete";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        'class_id': classId
    });
}

export function duplicateClass(classId) {
    let url = env.MANAGE_API_URL + "/class/duplicate/" + classId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeClassStatus(classId) {
    let url = env.MANAGE_API_URL + `/class/change-status`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'class_id': classId
    });
}

