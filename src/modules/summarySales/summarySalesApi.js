import axios from "axios";
import * as env from "../../constants/env";
import * as helper from "../../helpers/helper";

export function loadSummarySales(
    genId = "",
    baseId = "",
    startTime = "",
    endTime = "",
) {
    let url = env.MANAGE_API_URL + "/sales/summary?";
    let token = localStorage.getItem("token");
    url += `&gen_id=${genId}&base_id=${baseId}`;

    if (!helper.isEmptyInput(startTime) && !helper.isEmptyInput(endTime)) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

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
