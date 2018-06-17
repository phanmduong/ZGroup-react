import axios from "axios/index";
import * as env from "../../../constants/env";

export function getBookingHistoryApi() {
    let url = env.MANAGE_API_URL + "/booking/history";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
