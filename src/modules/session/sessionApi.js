import axios from 'axios';
import * as env from '../../constants/env';



//keetoolclient.test/api/v3/sessions
export function loadAllSessionsApi(page, search) {
    let url = env.API_URL + "/sessions";
    url += "?limit=20";
    if (search) {
        url += "&search=" + search;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}


// session dang chieu
//keetoolclient.test/api/v3/sessions/showing
export function loadShowingSessionApi(page, search) {
    let url = env.API_URL + "/sessions/showing?limit=20";
    if (search) {
        url += "&search=" + search;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
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
//keetoolclient.test/manageapi/v3/session/{id}?token=
export function editSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session/" + session.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, session);
}

//del session
//keetoolclient.test/manageapi/v3/session/{id}?token=
export function deleteSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session/"+session.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

//keetoolclient.test/manageapi/v3/films?token=
export function loadAllFilmsApi() {
    let url = env.API_URL + "/films?limit=-1";
    return axios.get(url);
}

