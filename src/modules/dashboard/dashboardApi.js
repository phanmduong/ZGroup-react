import axios from 'axios';
import * as env from '../../constants/env';

export function loadGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function genCerti(classId) {
    let url = env.MANAGE_API_URL + `/class/${classId}/compute-certificate`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadDashboard(genId, baseId, startTime = '', endTime = '') {
    let url = env.MANAGE_API_URL + `/gens/${genId}/dashboard`;
    if (baseId) {
        url += '/' + baseId;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    url += `&start_time=${startTime}&end_time=${endTime}`;

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

export function loadClass(classId) {
    let url = env.MANAGE_API_URL + `/class/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadAttendanceShifts(genId, baseId, time) {
    let url = env.MANAGE_API_URL + `/gens/${genId}/attendance-shifts`;
    if (baseId) {
        url += '/' + baseId;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        time: time
    });
}

export function loadAttendanceClasses(genId, baseId, time) {
    let url = env.MANAGE_API_URL + `/gens/${genId}/attendance-classes`;
    if (baseId) {
        url += '/' + baseId;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        time: time
    });
}
