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

//sesion theo ngay
//keetoolclient.test/api/v3/films/date
export function loadDaySessionApi(start_date) {
    let url = env.API_URL + "/films/date";
    return axios.post(url, start_date);
}

// them session
//keetoolclient.test/manageapi/v3/session?token=
export function saveSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, session);
}

//Edit session
//keetoolclient.test/manageapi/v3/session/update/{id}?token=
export function editSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session/update/" + session.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, session);
}

//del session
// /keetoolclient.test/manageapi/v3/session/{id}?token=
export function deleteSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session/"+session.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

//keetoolclient.test/manageapi/v3/films?token=
export function loadAllFilmsApi() {
    let url = env.MANAGE_API_URL + "/films";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "?limit=-1";
    }
    return axios.get(url);
}

