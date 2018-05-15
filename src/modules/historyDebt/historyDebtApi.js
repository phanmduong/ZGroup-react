import axios from "axios/index";
import * as env from "../../constants/env";

export function loadCompanies(page = 1) {
    let url = env.MANAGE_API_URL + "/company/all";
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token + "&page=" + page + "&limit=" + 20;
    return axios.get(url);

}

export function loadHistoryDebt(id,page) {
    let url = env.MANAGE_API_URL + "/company/history-debt/" + id;
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token + "&page=" + page  + "&limit=" + 15 ;
    return axios.get(url);
}

export function loadAllHistoryDebt() {
    let url = env.MANAGE_API_URL + "/company/history-debt/all";
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token ;
    return axios.get(url);
}
