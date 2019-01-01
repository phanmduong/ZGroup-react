import axios from 'axios';
import * as env from '../../constants/env';

export function loadGensApi() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateClassesApi(genID = '', baseID = '', courseID='') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-classes?gen_id=" + genID + "&base_id=" + baseID + "&course_id=" + courseID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadBasesApi() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
export function loadCoursesApi() {
    let url = env.MANAGE_API_URL + "/course/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadClassDetail(classId) {
    let url = env.MANAGE_API_URL + `/class/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeacherDetailStudentRatingApi(genID = '', baseID = '', userID = '',class_id = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teacher-detail-student-rating?gen_id=" + genID
        + "&base_id=" + baseID
        + "&class_id=" + class_id
        + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeachingAssistantDetailStudentRatingApi(genID = '', baseID = '', userID = '',class_id = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teaching-assistant-detail-student-rating?gen_id=" + genID
        + "&base_id=" + baseID
        + "&class_id=" + class_id
        + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}
