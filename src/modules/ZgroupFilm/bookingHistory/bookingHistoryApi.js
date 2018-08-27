import axios from "axios/index";
import * as env from "../../../constants/env";

export function getBookingHistoryApi(limit, page, search, film_name, roomId, time,payment_method) {
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
    if(payment_method===true){
        url += "&payment_method=" + (payment_method === false ? "offline" : "online");
    }
    if(payment_method===false){
        url += "&payment_method=" + (payment_method === false ? "offline" : "online");
    }
    return axios.get(url);
}
