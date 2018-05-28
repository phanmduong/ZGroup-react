import axios from "axios";
import * as env from "../../constants/env";

export function clients(page = 1, campaigId = 0, type = -1) {
    let url = env.MANAGE_API_URL + "/crm/clients";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    url += '&page=' + page;
    url += '&campaign_id=' + campaigId;
    url += '&type=' + type;

    return axios.get(url);
}

export function allCampagins() {
    let url = env.MANAGE_API_URL + "/marketing-campaign/all?limit=-1";
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

