
import axios    from 'axios';
import * as env from '../../constants/env';
import * as conts from '../../constants/constants';
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";


export function deleteWork(id='') {
    //manageapi.keetool.xyz/work/7?token=
    let url     = env.MANAGE_API_URL + "/work/" + id ;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.delete(url);
}

export function loadWorks() {
    //manageapi.keetool.xyz/work?limit=&search=&token=
    let url     = env.MANAGE_API_URL + "/work?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadStaffs() {
    //manageapi.keetool.xyz/staff?limit=-1&token=
    let url     = env.MANAGE_API_URL + "/staff?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadWork(id='') {
    //manageapi.keetool.xyz/work/7?token=
    let url     = env.MANAGE_API_URL + "/work/" + id ;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function changeStatusWork(workID,staffID,status='pending') {
    //manageapi.keetool.xyz/staff/{staffID}/{workID}?token=
    let url     = env.MANAGE_API_URL + "/staff/" + staffID + "/" + workID;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.post(url, {status: status});
}
export function doneWork(workID,staffID,data) {
    //manageapi.keetool.xyz/staff/{staffID}/{workID}?token=
    let url     = env.MANAGE_API_URL + "/staff/" + staffID + "/" + workID;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.post(url, {...data, status: "done"});
}

export function extendWork(workID,staffID, data) {
    //manageapi.keetool.xyz/staff/{staffID}/{workID}/extension?token=
    let url     = env.MANAGE_API_URL + "/staff/" + staffID + "/" + workID + "/extension";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    let time = moment( data.new_deadline, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT_SQL);
    return axios.post(url,{...data, new_deadline: time});
}

export function createWork(data) {
    //manageapi.keetool.xyz/work?token=
    let url     = env.MANAGE_API_URL + "/work";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    let time = moment( data.deadline, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT_SQL);
    let res = {
        name: data.name,
        type: data.type,
        cost: data.cost,
        deadline: time,
        bonus_value: data.bonus_value,
        bonus_type: data.bonus_type,
        staffs: JSON.stringify(data.staffs),
        status: conts.STATUS_WORK[0].value,
        payer_id: data.payer.id,
        currency_id: data.currency.id,
    };
    return axios.post(url, res);
}

export function editWork(data, status) {
    //manageapi.ketool.xyz/work/{workId}?token=
    let url     = env.MANAGE_API_URL + "/work/" + data.id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    let time = moment( data.deadline, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT_SQL);
    let res = {
        id: data.id,
        name: data.name,
        type: data.type,
        cost: data.cost,
        deadline: time,
        bonus_value: data.bonus_value,
        bonus_type: data.bonus_type,
        staffs: JSON.stringify(data.staffs),
        status:  status || data.status || conts.STATUS_WORK[0].value,
        payer_id: data.payer.id,
        currency_id: data.currency.id,
    };
    return axios.put(url, res);
}


export function loadCurrencies() {
    //http://manageapi.keetool.xyz/v2/currency?token=
    let url     = env.MANAGE_API_URL +"/v2/currency";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function acceptPay(workId, staffId) {
    //manageapi.keetool.xyz/staff/{staffID}/{workID}/acceptHire?token=
    let url     = env.MANAGE_API_URL +"/staff/" + staffId + "/" + workId + "/acceptHire";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.post(url);
}
export function loadArchivedWork() {
    //manageapi.ketool.xyz/work/archive?token=&limit=&search=
    let url     = env.MANAGE_API_URL +"/work/archive?search=" ;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}