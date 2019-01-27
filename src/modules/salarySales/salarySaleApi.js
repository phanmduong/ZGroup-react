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

export function loadSalarySalesApi(genID = '', baseID = '') {
    let url = env.MANAGE_API_URL + "/finance/salary-sales?gen_id=" + genID + "&base_id=" + baseID;
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

export function addBonusSalaryApi(saleSalaryId, amount, note) {
    let url = env.MANAGE_API_URL + "/finance/add-bonus-salary";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        sale_salary_id: saleSalaryId,
        amount: amount,
        note: note
    });
}

export function addSaleSalaryApi(saleSalaryId, money, note, type) {
    let url = env.MANAGE_API_URL + "/finance/add-sale-salary";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        sale_salary_id: saleSalaryId,
        money: money,
        type: type,
        note: note
    });
}

export function getDetailSalaryBonusApi(saleSalaryId) {
    let url = env.MANAGE_API_URL + "/finance/detail-sale-salary-bonus/" + saleSalaryId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function sendEmailSaleSalaryApi(genId) {
    let url = env.MANAGE_API_URL + "/finance/send-email-sale-salary/" + genId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}


