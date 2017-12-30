
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
    };
    return axios.put(url, res);
}
