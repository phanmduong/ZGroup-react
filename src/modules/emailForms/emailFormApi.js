import axios from 'axios';
import * as env from '../../constants/env';
import moment from "moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";

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
    url += '&limit=6';
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
        template_id: emailForm.template ? emailForm.template.id : '',
        content: emailForm.content,
        footer: emailForm.footer,
        avatar_url: emailForm.avatarUrl,
        title_button: emailForm.titleButton,
        link_button: emailForm.linkButton,
        status: status,
    });
}

export function deleteEmailForm(emailFormId) {
    let url = env.MANAGE_API_URL + '/email-form/' + emailFormId + '/delete';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadEmailForm(emailFormId) {
    let url = env.MANAGE_API_URL + '/email-form/' + emailFormId + '/get';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function sendMailTest(emailFormId, email) {
    let url = env.MANAGE_API_URL + '/email-form/' + emailFormId + '/send-mail';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,
        {
            email: email
        });
}

export function loadSubscribersList() {
    let url = env.MANAGE_API_URL + "/email/subscribers-list/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function storeCampaign(campaign, emailFormId) {
    let dateIsValid = moment(campaign.timer, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).isValid();
    let url = env.MANAGE_API_URL + "/email/campaign/store";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        ...campaign, ... {
            form_id: emailFormId,
            timer: dateIsValid ? moment(campaign.timer, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT_SQL) : null
        }
    });
}

export function changeHideForm(emailFormId, hide) {
    let url = env.MANAGE_API_URL + '/email-form/change-hide';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,
        {
            id: emailFormId,
            hide: hide,
        });
}