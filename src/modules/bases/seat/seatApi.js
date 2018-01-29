/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../../constants/env';

export const getSeats = (roomId) => {
    let url = env.MANAGE_API_URL + `/v2/room/${roomId}/seats`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
};

export const createSeat = (roomId, seat) => {
    let url = env.MANAGE_API_URL + `/v2/room/${roomId}/seat`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, seat);
};

export const updateSeat = (seat) => {
    let url = env.MANAGE_API_URL + `/v2/room/seat/${seat.id}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, seat);
};
