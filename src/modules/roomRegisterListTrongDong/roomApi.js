import axios from 'axios';
import * as env from '../../constants/env';
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL } from '../../constants/constants';


export function submitBooking(register, filter) {
    let url = env.MANAGE_API_URL;

    if (register.id) {
        url += "/trongdong/register-room/edit";
    } else {
        url += "/trongdong/register-room/create";
    }

    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        register_id: register.id ? register.id : "",
        name: register.name,
        email: register.email,
        phone: register.phone,
        address: register.address,
        status: register.status,
        base_id: filter.base_id,
        kind: register.kind,
        number_person: register.number_person,
        start_time: moment(register.start_time, [
            DATETIME_FORMAT,
            DATETIME_FORMAT_SQL
        ]).format(DATETIME_FORMAT_SQL),
        end_time: moment(register.end_time, [
            DATETIME_FORMAT,
            DATETIME_FORMAT_SQL
        ]).format(DATETIME_FORMAT_SQL),
        note: register.note,
        campaign_id: register.campaign_id,
        similar_room: register.similar_room
    });
}


export function loadRooms() {
    let url = env.MANAGE_API_URL + "/trongdong/room/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadCampaigns() {
    //http://manageapi.keetool.xyz/marketing-campaign/all?token=
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/marketing-campaign/all?limit=-1&token=" + token;
    return axios.get(url);
}


export function loadRegisters(filter) {
    filter = filter ? filter : {};
    let {
        limit,
        page = 1,
        search,
        saler_id,
        base_id,
        time,
        campaign_id,
    } = filter;
    let url = env.MANAGE_API_URL + '/trongdong/register-room/all?page=' + page;
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
    if (time) {
        url += "&start_time=" + time.start_time + "&end_time=" + time.end_time;
    }
    if (base_id) {
        url += "&base_id=" + (base_id == -1 ? '' : base_id);
    }
    if (campaign_id) {
        url += "&campaign_id=" + (campaign_id == -1 ? '' : campaign_id);
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

export function loadUsers(search) {
    let url = env.MANAGE_API_URL + `/trongdong/find-users?search=` + search;
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}
