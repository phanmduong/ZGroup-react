import axios from 'axios';
import * as env from '../../constants/env';

export function loadRule() {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/rule?token=" + token;
    return axios.get(url);
}

