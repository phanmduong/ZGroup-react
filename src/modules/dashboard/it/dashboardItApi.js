import axios from 'axios';
import * as env from '../../../constants/env';

export function loadCards(staffId, from, to) {
    let url = env.MANAGE_API_URL + `/staff/${staffId}/chart/card?from=${from}&to=${to}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}



