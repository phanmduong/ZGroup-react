import axios from 'axios';
import * as env from '../../constants/env';

export function loadForms(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/email-forms?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
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

export function saveEmailForm(emailForm, status) {
    let url = env.MANAGE_API_URL + "/email-form/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        id: emailForm.id,
        name: emailForm.name,
        title: emailForm.title,
        subtitle: emailForm.subtitle,
        logo_url: emailForm.logoUrl,
        template_id: emailForm.template.id,
        content: emailForm.content,
        footer: emailForm.footer,
        status: status,
    });
}