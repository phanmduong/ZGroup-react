import * as env from "../../constants/env";
import axios from "axios/index";



export function loadChartApi(baseId = "", roomTypeId = "", roomId = "", start_time = "" ) {
    let clone_start_time = start_time.clone();
    let url = env.MANAGE_API_URL + "/trongdong/summary";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    url += `&base_id=${baseId}&room_type_id=${roomTypeId}&room_id=${roomId}&start_time=${clone_start_time.format("YYYY-MM-DD")}&end_time=${clone_start_time.add(6, 'days').format("YYYY-MM-DD")}`;
    return axios.get(url);
}

export function loadBasesApi() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadRoomsApi() {
    let url = env.MANAGE_API_URL + "/trongdong/room/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadRoomTypesApi() {
    let url = env.MANAGE_API_URL + "/trongdong/room-type/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
