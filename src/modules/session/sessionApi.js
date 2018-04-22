import axios from 'axios';
import * as env from '../../constants/env';



//http://keetool.xyz/manageapi/v3/sessions?token=
export function loadAllSessionsApi() {
    let url = env.MANAGE_API_URL + "/sessions";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


// session dang chieu
//keetoolclient.test/api/v3/films/showing
export function loadShowingSessionApi() {
    let url = env.API_URL + "/films/showing";
    return axios.get(url);
}

//session sap chieu
//keetoolclient.test/api/v3/films/coming
export function loadComingSessionApi() {
    let url = env.API_URL + "/films/coming";
    return axios.get(url);
}

//sesion theo ngay
//keetoolclient.test/api/v3/films/date
export function loadDaySessionApi(start_date) {
    let url = env.API_URL + "/films/date";
    return axios.post(url, start_date);
}


