import axios from "axios";
import * as env from "../../constants/env";

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
export function loadDashboard(baseId = "", roomTypeId = "", roomId = "") {
    let url = env.MANAGE_API_URL + "/trongdong/dashboard";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    url += `&base_id=${baseId}&room_type_id=${roomTypeId}&room_id=${roomId}`;
    return axios.get(url);
}
export function changeTime(registerRoomId = "", startTime = "", endTime = "") {
    let url = env.MANAGE_API_URL + "/trongdong/register-room/change-time";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        id: registerRoomId,
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
