import axios from 'axios';
import * as env from '../../constants/env';



export function getRooms(page, search, baseId) {
    let url = env.MANAGE_API_URL + "/base/rooms?page=" + page;
    let token = localStorage.getItem('token');
    if (search) {
        url += '&search=' + search;
    }
    if (token) {
        url += "&token=" + token;
    }

    if (baseId && baseId != 0) {
        url += "&base_id=" + baseId;
    }

    return axios.get(url);
}

export function getBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function storeRoom(room) {
    let url = env.MANAGE_API_URL + "/base/room";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {room});
}