import axios from "axios/index";
import * as env from "../../../constants/env";

export function getBookingHistoryApi(limit, page, search, film_name, roomId, time) {
    let url = env.MANAGE_API_URL + "/booking/history";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (limit) {
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (film_name) {
        url += "&film_name=" + film_name;
    }
    if (roomId) {
        url += "&session_id=" + roomId;
    }
    if (time) {
        url += "&time=" + time;
    }
    return axios.get(url);
}
