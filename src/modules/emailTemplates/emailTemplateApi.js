import axios from 'axios';
import * as env from '../../constants/env';

export function loadTemplates(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/email-templates?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteEmailTemplate(emailTemplateId) {
    let url = env.MANAGE_API_URL + '/email-template/' + emailTemplateId + '/delete';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function uploadImage(file, completeHandler, error) {
    let url = env.API_URL + '/upload-image-froala';
    let formdata = new FormData();
    formdata.append('image', file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
    ajax.addEventListener("error", error, false);
}

export function saveEmailTemplate(emailTemplate) {
    let url = env.MANAGE_API_URL + "/email-template/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
            name: emailTemplate.name,
            thumbnail_url: emailTemplate.thumbnailUrl,
            content: emailTemplate.content,
        }
    );
}

export function loadEmailTemplate(emailTemplateId) {
    let url = env.MANAGE_API_URL + '/email-template/' + emailTemplateId + '/get';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
