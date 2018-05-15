import axios from 'axios';
import * as env from '../../constants/env';

export function loadSummaryStaffWork(year){
    let url = env.MANAGE_API_URL + "/work/summary-staffs";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&year=" + year;
    }
    return axios.get(url);
}

export function loadSummaryStaffDepartment(){
    let url = env.MANAGE_API_URL + "/department/summary-employees";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}