import axios from "axios";
import * as env from "../../constants/env";
import moment from "moment/moment";
import {
    DATETIME_FORMAT,
    DATETIME_FORMAT_SQL, KIND_REGISTER_ROOM, STATUS_REGISTER_ROOM
} from "../../constants/constants";

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

    var account_type = KIND_REGISTER_ROOM.filter((item) => item.value == register.kind)[0];
    var relation = STATUS_REGISTER_ROOM.filter((item) => item.value == register.status)[0];


    return axios.put(url, {
        id: register.id ? register.id : "",
        name: register.name,
        email: register.email,
        phone: register.phone,
        address: register.address,
        status: register.status,
        relation_id: relation.getfly_id,
        base_id: register.base_id,
        kind: register.kind,
        account_type: account_type.getfly_id,
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

export function loadUsers(search) {
    let url = env.MANAGE_API_URL + `/trongdong/find-users?search=` + search;
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }
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
        startTime,
        endTime
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
