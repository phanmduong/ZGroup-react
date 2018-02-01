import axios from 'axios';
import * as env from '../../constants/env';

export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}


export function loadRoomBase(baseId) {
    let url = env.MANAGE_API_URL + '/base/rooms';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    if (baseId)
        url += "&base_id=" + baseId;
    return axios.get(url);

}

export function loadSeats(from, to,roomId) {
    let url = env.MANAGE_API_URL + '/v2/seat/available';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&from=" + from + "&to=" + to + "&limit=-1";
    }
    if(roomId)
        url += "&room_id=" +roomId;
    return axios.get(url);
}