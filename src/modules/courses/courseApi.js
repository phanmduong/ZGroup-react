import axios from 'axios';
import * as env from '../../constants/env';

export function loadCoursesData() {
    let url = env.API_URL + "/courses";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}