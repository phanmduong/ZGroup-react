import axios from 'axios';
import * as env from '../../../constants/env';
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL } from '../../../constants/constants';


export function submitBooking(data = {}) {
    //http://homestead.test/manageapi/v3/coworking-space/register-room?
    let res = { ...data };
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/coworking-space/register-room?token=" + token;
    res.start_time = moment(data.start_time, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT_SQL);
    res.end_time = moment(data.end_time, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT_SQL);

    return axios.post(url, res);

}

export function loadRooms() {
    // http://homestead.test/manageapi/v3/trongdong/room/all?
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/trongdong/room/all?token=" + token;
    return axios.get(url);
}

export function loadCampaigns() {
    //http://manageapi.keetool.xyz/marketing-campaign/all?token=
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/marketing-campaign/all?limit=-1&token=" + token;
    return axios.get(url);
}


export function loadAllRegistersApi(filter) {
    filter = filter ? filter : {};
    let {
        limit,
        page = 1,
        search,
        saler_id,
        base_id,
        startTime,
        endTime
    } = filter;
    let url = env.MANAGE_API_URL + '/coworking-space/room-booking?page=' + page;
    if (search) {
        url += "&search=" + search;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (saler_id) {
        url += "&saler_id=" + (saler_id == -1 ? '' : saler_id);
    }
    if (limit) {
        url += "&limit=" + limit;
    }
    if (startTime) {
        url += "&start_time=" + startTime;
    }
    if (endTime) {
        url += "&end_time=" + endTime;
    }
    if (base_id) {
        url += "&base_id=" + (base_id == -1 ? '' : base_id);
    }
    return axios.get(url);
}

export function loadAllBasesApi() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadAllSalersApi() {
    let url = env.MANAGE_API_URL + '/coworking-space/saler?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function changeCallStatusApi(status, note, register_id, user_id) {
    let url = env.MANAGE_API_URL + '/coworking-space/save-call?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "register_id": register_id,
        "listener_id": user_id,
        "note": note,
        "call_status": status,
    });
}

export function savePaymentApi(money, note, register_id, user_id) {
    let url = env.MANAGE_API_URL + '/company/payment/create?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, {
        "register_id": register_id,
        "user_id": user_id,
        "money_value": money,
        "description": note,
    });
}

export function updateOfficialTimeApi(register) {
    let url = env.MANAGE_API_URL + '/coworking-space/room-booking/' + register.id + '/assign-time?';
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url, {
        "start_time": register.official_start_time,
        "end_time": register.official_end_time,
    });
}

