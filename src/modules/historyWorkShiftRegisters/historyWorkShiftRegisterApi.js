import axios from 'axios';
import * as env from '../../constants/env';

export function getHistoryShiftRegisters(page) {
    let url = env.MANAGE_API_URL + `/work-shift/history-shift-registers?page=${page}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}