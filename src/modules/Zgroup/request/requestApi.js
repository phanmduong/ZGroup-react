import axios from 'axios';
import * as env from '../../../constants/env';

export function createRequestVacation(data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url = env.MANAGE_API_URL + "/company/administration/request-vacation/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let res = {
        staff_id: data.staff.id,
        start_time: data.start_time,
        end_time: data.end_time,
        request_date: data.request_date,
        type: data.type,
        reason: data.reason,
    };

    return axios.post(url, res);
}

export function editRequestVacation(id, data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url = env.MANAGE_API_URL + "/company/administration/request-vacation/" + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let res = {
        staff_id: data.staff.id,
        start_time: data.start_time,
        end_time: data.end_time,
        request_date: data.request_date,
        type: data.type,
        reason: data.reason,
    };

    return axios.put(url, res);
}

export function getRequestVacation(id) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url = env.MANAGE_API_URL + "/company/administration/request-vacation/" + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function createRequestMoney(data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let res = {
        staff_id: data.staff.id,
        request_date: data.request_date,
        type: data.type,
        reason: data.reason,
        money_payment: data.money_payment,
    };

    return axios.post(url, res);
}

export function editRequestMoney(id, data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/" + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let res = {
        staff_id: data.staff.id,
        request_date: data.request_date,
        type: data.type,
        reason: data.reason,
        money_payment: data.money_payment,
    };

    return axios.put(url, res);
}

export function getRequestMoney(id) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/" + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function getAllRequestMoney(info = {}) {
    info = {
        ...info,
        page: info.page || 1,
        start_time: info.start_time || "",
        end_time: info.end_time || "",
        staff_name: info.staff_name || "",
        command_code: info.command_code || "",
        company_pay_id: info.company_pay_id || "",
        company_receive_id: info.company_receive_id || "",
        status: (info.status || info.status == 0) ? info.status : "",
    };
    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/all?"
        + "page=" + info.page
        + "&start_time=" + info.start_time
        + "&end_time=" + info.end_time
        + "&staff_name=" + info.staff_name
        + "&command_code=" + info.command_code
        + "&company_pay_id=" + info.company_pay_id
        + "&company_receive_id=" + info.company_receive_id
        + "&status=" + info.status
        ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function getAllRequestVacation(info = {}) {
    info = {
        ...info,
        page: info.page || 1,
        start_time: info.start_time || "",
        end_time: info.end_time || "",
        staff_name: info.staff_name || "",
        type: info.type || "",
        command_code: info.command_code || "",
        status: (info.status || info.status == 0) ? info.status : "",
    };
    let url = env.MANAGE_API_URL + "/company/administration/request-vacation/all?"
        + "page=" + info.page
        + "&start_time=" + info.start_time
        + "&end_time=" + info.end_time
        + "&staff_name=" + info.staff_name
        + "&command_code=" + info.command_code
        + "&status=" + info.status
        + "&type=" + info.type
        ;

    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function confirmPayRequest(id, money_received, company_pay_id) {
    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/" + id + "/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, { money_received, company_pay_id, status: 1 });
}

export function confirmReceiveRequest(id, money_used, date_complete, company_receive_id) {
    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/" + id + "/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, { money_used, date_complete, company_receive_id, status: 2 });
}

export function confirmRequestVacation(id) {
    let url = env.MANAGE_API_URL + "/company/administration/request-vacation/" + id + "/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, { status: 1 });
}


export function getRequestMoneyNoPaging() {

    let url = env.MANAGE_API_URL + "/company/administration/advance-payment/all?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function getRequestVacationNoPaging() {

    let url = env.MANAGE_API_URL + "/company/administration/request-vacation/all?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllCompany() {
    let url = env.MANAGE_API_URL + "/company/all?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
