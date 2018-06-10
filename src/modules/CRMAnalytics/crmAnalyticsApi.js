import axios from "axios";
import * as env from "../../constants/env";

export function analytics(campaigId = 0) {
    let url = env.MANAGE_API_URL + "/crm/analytics";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    url += '&campaign_id=' + campaigId;

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

