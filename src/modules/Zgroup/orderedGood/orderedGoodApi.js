import axios    from 'axios';
import * as env from '../../../constants/env';

export function loadAllGoods() {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/good/all/no-paging";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function loadAllCompanies() {
    //http://manageapi.keetool.xyz/company/provided?token=
    let url     = env.MANAGE_API_URL +"/company/share?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function createOrderedGood(data) {
    //http://manageapi.keetool.xyz/company/provided?token=
    let url     = env.MANAGE_API_URL +"/company/be-ordered/create?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "token=" + token;
    }
    return axios.post(url, data);
}

export function editOrderedGood(data) {
    //http://manageapi.keetool.xyz/company/provided?token=
    let url     = env.MANAGE_API_URL +"/company/be-ordered/" + data.id + "?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "token=" + token;
    }
    return axios.put(url, data);
}

export function loadAllOrderedGood(page=1) {
    let url     = env.MANAGE_API_URL +"/company/be-ordered/all?page=" +page;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadOrderedGood(id) {
    
    let url     = env.MANAGE_API_URL +"/company/be-ordered/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}
