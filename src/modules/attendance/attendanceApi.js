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

export function loadClassLessonModal(id) {
    //http://api.keetool.xyz/apiv2/class/555/attendance/lessons?token=
    let url = env.API_URL + "/apiv2/class/" + id + "/attendance/lessons";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}