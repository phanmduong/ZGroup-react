import axios from 'axios';
import * as env from '../../constants/env';
import {getToken} from '../../helpers/tokenHelper';

export function createSurvey(survey, file) {
    let url = env.MANAGE_API_URL + "/v2/survey";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    const formData = new FormData();
    formData.append('image_url', file);
    formData.append("target", survey.target);
    formData.append("name", survey.name);
    formData.append("description", survey.description);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    return axios.post(url, formData, config);
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

    let url = env.MANAGE_API_URL + `/v2/survey/${surveyId}/question`;

    if (question.id) {
        url += `/${question.id}?token=${token}`;
        return axios.put(url, {
            ...question,
            content_data: question.content
        });
    } else {
        url += `?token=${token}`;
        return axios.post(url, {
            ...question,
            content_data: question.content
        });
    }
};

export const duplicateQuestion = (surveyId, question) => {
    const token = getToken();

    const url = env.MANAGE_API_URL + `/v2/survey/${surveyId}/question/${question.id}?token=${token}`;

    return axios.post(url);

};

export const saveAnswer = (answer) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/answer/${answer.id}?token=${token}`;
    return axios.put(url, {
        content_data: answer.content
    });
};

export const addSurveyLesson = (surveyId, lessonId, minutesDuration, minuteStart) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/${surveyId}/lesson/${lessonId}?token=${token}`;
    return axios.post(url, {
        time_display: minutesDuration,
        start_time_display: minuteStart
    });
};

export const removeSurveyLesson = (surveyId, lessonId) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/${surveyId}/lesson/${lessonId}?token=${token}`;
    return axios.delete(url);
};

export const loadSurveyLessons = (surveyId) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/${surveyId}/lesson?token=${token}`;
    return axios.get(url);
};


export const updateQuestionOrders = (questions) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/questions?token=${token}`;
    return axios.put(
        url,
        {
            questions: JSON.stringify(questions)
        }
    );

};

export const deleteQuestion = (question) => {
    const token = getToken();
    const url = env.MANAGE_API_URL + `/v2/survey/question/${question.id}?token=${token}`;
    return axios.delete(url);
};

