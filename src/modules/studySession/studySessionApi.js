import axios from 'axios';
import * as env from '../../constants/env';

export function loadStudySession() {
    let url = env.MANAGE_API_URL + "/study-session";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function addStudySession(studySession) {
    let url = env.MANAGE_API_URL + '/study-session/add';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            start_time: studySession.start_time,
            end_time: studySession.end_time,
            weekday: studySession.weekday
        });
}

export function editStudySession(studySession) {
    let url = env.MANAGE_API_URL + `/study-session/${studySession.id}/edit`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            start_time: studySession.start_time,
            end_time: studySession.end_time,
            weekday: studySession.weekday
        });
}

export function deleteStudySession(studySessionId) {
    let url = env.MANAGE_API_URL + '/delete-study-session';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,
        {
            id: studySessionId,
        });
}