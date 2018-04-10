import axios from 'axios';
import * as env from '../../../constants/env';

//http://manageapi.domain.com/company/reports/all?token=
export function loadAllReportsApi(page, search) {
    let url = env.MANAGE_API_URL + '/company/reports/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    return axios.get(url);
}
//http://manageapi.domain.com/company/report/{report_id}?token=
export function loadReportById(i) {
    let url = env.MANAGE_API_URL + '/company/report/'+i;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

//http://manageapi.domain.com/company/report/{staff_id}/create?token=
export function saveReportApi(report, index) {
    let url = env.MANAGE_API_URL + "/company/report/" + index.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "/create?token=" + token;
    }
    return axios.post(url,report);
}

//http://manageapi.domain.com/company/report/{id}?token=
//Sua status 0 -> 1
export function checkApi(i) {
    let url = env.MANAGE_API_URL + "/company/report/" + i.id;
    let token = localStorage.getItem('token');
    if(token){
        url += "?token=" + token;
    }
    return axios.put(url,1);
}

//http://manageapi.domain.com/company/report/{staff_id}/edit/{id}?token=
// Api sua report
export function editReportApi(index,id,report) {
    let url = env.MANAGE_API_URL + "/company/report/" + index.id +"/edit/" +id;
    let token = localStorage.getItem('token');
    if(token){
        url += "?token=" + token;
    }
    return axios.put(url,report);
}