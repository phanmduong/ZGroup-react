import axios from "axios";
import * as env from "../../constants/env";

export function analytics() {
    let url = env.MANAGE_API_URL + "/crm/analytics";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

