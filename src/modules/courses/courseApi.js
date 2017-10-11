import axios from 'axios';
import * as env from '../../constants/env';

export function loadCoursesData() {
    let url = env.MANAGE_API_URL + "/course";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}