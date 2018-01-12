import axios from 'axios';
import * as env from '../../constants/env';
import {getToken} from '../../helpers/tokenHelper';

export function createSurvey(surveyName) {
    let url = env.MANAGE_API_URL + "/v2/survey";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: surveyName,
    });
}

export const loadSurveys = (page, search) => {
    let url = env.MANAGE_API_URL + "/v2/survey";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += "&search=" + search;
    url += "&page=" + page;
    return axios.get(url);
};

export const loadSurvey = (surveyId) => {
    let url = env.MANAGE_API_URL + "/v2/survey/" + surveyId;
    const token = getToken();
    url += "?token=" + token;
    return axios.get(url);
};

export const saveQuestion = (surveyId, question) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/${surveyId}/question/${question.id}?token=${token}`;
    return axios.put(url, {
        content_data: question.content
    });
};