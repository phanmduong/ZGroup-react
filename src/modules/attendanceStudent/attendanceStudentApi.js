import axios from 'axios';
import * as env from '../../constants/env';

export function loadGens() {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/gen/all?token=" + token;
    return axios.get(url);
}