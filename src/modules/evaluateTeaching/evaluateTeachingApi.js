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

export function loadEvaluateTeacherApi(genID = '', baseID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teacher?gen_id=" + genID + "&base_id=" + baseID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluatePersonTeacherApi(userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-person-teacher?user_id=" + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluatePersonTeachingAssistantApi(userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-person-teaching-assistant?user_id=" + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeachingAssistantApi(genID = '', baseID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teaching-assistant?gen_id=" + genID + "&base_id=" + baseID;
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

export function loadEvaluateTeacherDetailCheckinCheckoutApi(genID = '', baseID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teacher-detail-checkin-checkout?gen_id=" + genID + "&base_id=" + baseID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeachingAssistantDetailCheckinCheckoutApi(genID = '', baseID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teaching-assistant-detail-checkin-checkout?gen_id=" + genID + "&base_id=" + baseID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeacherDetailStudentAttendanceApi(genID = '', baseID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teacher-detail-student-attendance?gen_id=" + genID + "&base_id=" + baseID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeachingAssistantDetailStudentAttendanceApi(genID = '', baseID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teaching-assistant-detail-student-attendance?gen_id=" + genID + "&base_id=" + baseID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeacherDetailStudentRatingApi(genID = '', baseID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teacher-detail-student-rating?gen_id=" + genID + "&base_id=" + baseID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeachingAssistantDetailStudentRatingApi(genID = '', baseID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teaching-assistant-detail-student-rating?gen_id=" + genID + "&base_id=" + baseID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeacherDetailCommentProductApi(genID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teacher-detail-comment-product?gen_id=" + genID  + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadEvaluateTeachingAssistantDetailCommentProductApi(genID = '', userID = '') {
    let url = env.MANAGE_API_URL + "/teaching/evaluate-teaching-assistant-detail-comment-product?gen_id=" + genID + '&user_id=' + userID;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}
