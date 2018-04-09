import axios    from 'axios';
import * as env from '../../../constants/env';

export function createRequestVacation(data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/company/administration/request-vacation/create";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
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

export function editRequestVacation(id,data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/company/administration/request-vacation/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
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
    let url     = env.MANAGE_API_URL +"/company/administration/request-vacation/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    } 
    return axios.get(url);
}


export function createRequestMoney(data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/company/administration/advance-payment/create";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
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

export function editRequestMoney(id,data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/company/administration/advance-payment/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
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
    let url     = env.MANAGE_API_URL +"/company/administration/advance-payment/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    } 
    return axios.get(url);
}

export function getAllRequestMoney(id) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/company/administration/advance-payment/all" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    } 
    return axios.get(url);
}