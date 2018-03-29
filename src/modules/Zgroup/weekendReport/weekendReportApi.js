import axios from 'axios';
import * as env from '../../../constants/env';

export function loadAllReportsApi() {
    let url = env.MANAGE_API_URL + '/company/reports/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
// http://manageapi.domain.com/company/reports/{staff_id}?token=
export function loadAllReportsById(report) {
    let url = env.MANAGE_API_URL + '/company/reports/'+report.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);

}

//http://manageapi.domain.com/company/report/{staff_id}/create?token=
export function saveReportApi(report) {
    let url = env.MANAGE_API_URL + "/company/report/" + report.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "/create?token=" + token;
    }
    return axios.post(url, report);
}

