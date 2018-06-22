import axios from "axios/index";
import * as env from "../../../constants/env";

export function getBookingHistoryApi(limit,page) {
    let url = env.MANAGE_API_URL + "/booking/history";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if(limit) {
        url += "&limit=" + limit;
    }
    if(page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}
