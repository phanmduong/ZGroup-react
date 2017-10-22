import axios from 'axios';
import * as env from '../../constants/env';

export function loadCoursesData(page=1) {

    let url = env.MANAGE_API_URL + "/v2/course/get-all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page;
    }
    return axios.get(url);
}