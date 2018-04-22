import axios from "axios";
import * as env from "../../constants/env";

export function loadGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadDashboard(genId = "", baseId = "") {
    let url = env.MANAGE_API_URL + `/detail-profile`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    url += "&gen_id=" + genId + "&base_id=" + baseId;

    return axios.get(url);
}
export function loadTeachingSchedule(startTime = "", endTime = "") {
    let url = env.MANAGE_API_URL + `/detail-profile/class-lesson`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    url += "&start_time=" + startTime + "&end_time=" + endTime;

    return axios.get(url);
}

export function loadWorkShifts(startTime = "", endTime = "") {
    let url = env.MANAGE_API_URL + `/detail-profile/work-shift`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    url += "&start_time=" + startTime + "&end_time=" + endTime;

    return axios.get(url);
}
export function loadShifts(startTime = "", endTime = "") {
    let url = env.MANAGE_API_URL + `/detail-profile/shift`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    url += "&start_time=" + startTime + "&end_time=" + endTime;

    return axios.get(url);
}
