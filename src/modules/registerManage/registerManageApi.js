import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllRegistersApi(page = 1, search, user_id, staff_id, status) {
    let url = env.MANAGE_API_URL + '/coworking-space/register?page=' + page;
    if (search) {
        url += `&search=${search}`;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (user_id) {
        url += "&user_id=" + user_id;
    }
    if (staff_id) {
        url += `&staff_id=${staff_id}`;
    }
    if (status) {
        url += `&status=` + status;
    }
    return axios.get(url);
}

