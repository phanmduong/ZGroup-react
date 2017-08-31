import axios from 'axios';
import * as env from '../../constants/env';

export function loadScheduleClasses() {
    let url = env.MANAGE_API_URL + "/schedule-classes";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function addScheduleClass(scheduleClass) {
    let url = env.MANAGE_API_URL + '/schedule-class/add';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            name: scheduleClass.name,
            description: scheduleClass.description,
            study_session_ids: scheduleClass.studySessionIds
        });
}

export function editScheduleClass(scheduleClass) {
    let url = env.MANAGE_API_URL + `/schedule-class/${scheduleClass.id}/edit`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            name: scheduleClass.name,
            description: scheduleClass.description,
            study_session_ids: scheduleClass.studySessionIds
        });
}

export function deleteScheduleClass(scheduleClassId) {
    let url = env.MANAGE_API_URL + '/delete-schedule-class';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,
        {
            id: scheduleClassId,
        });
}

export function loadStudySession() {
    let url = env.MANAGE_API_URL + "/study-session";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}