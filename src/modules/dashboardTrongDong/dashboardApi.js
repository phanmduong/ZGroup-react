import axios from "axios";
import * as env from "../../constants/env";
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../constants/constants";

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadRooms() {
    let url = env.MANAGE_API_URL + "/trongdong/room/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadRoomTypes() {
    let url = env.MANAGE_API_URL + "/trongdong/room-type/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadCampaigns() {
    let url = env.MANAGE_API_URL + "/marketing-campaign/all?limit=-1";
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function loadDashboard(baseId = "", roomTypeId = "", roomId = "") {
    let url = env.MANAGE_API_URL + "/trongdong/dashboard";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    url += `&base_id=${baseId}&room_type_id=${roomTypeId}&room_id=${roomId}`;
    return axios.get(url);
}

export function changeTime(registerId = "", startTime = "", endTime = "") {
    let url = env.MANAGE_API_URL + "/trongdong/register-room/change-time";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        id: registerId,
        start_time: startTime,
        end_time: endTime
    });
}

export function changeStatus(registerId = "", status) {
    let url = env.MANAGE_API_URL + "/trongdong/register-room/change-status";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        id: registerId,
        status: status
    });
}

export function storeRegister(register) {
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
        id: register.id ? register.id : '',
        name: register.name,
        email: register.email,
        phone: register.phone,
        address: register.address,
        status: register.status,
        base_id: register.base_id,
        start_time: moment(register.start_time, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT_SQL),
        end_time: moment(register.end_time, [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(DATETIME_FORMAT_SQL),
        note: register.note,
        campaign_id: register.campaign_id,
        similar_room: register.similar_room
    });
}


