
import axios    from 'axios';
import * as env from '../../../constants/env';


export function loadExportOrders(page,search) {
    //http://manageapi.keetool.xyz/company/export-order/all?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/all?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "page=" + page + "&search=" + search + "&token=" + token;
    }
    return axios.get(url);
}


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
    let url     = env.MANAGE_API_URL +"/company/provided?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllWarehourses() {
    //http://manageapi.keetool.xyz/order/all-warehouses?token=
    let url     = env.MANAGE_API_URL +"/order/all-warehouses?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function createExportOrder(data) {
    //http://manageapi.keetool.xyz/company/export-order?token=
    let url     = env.MANAGE_API_URL +"/company/export-order?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.post(url,data);
}

export function loadExportOrder(id) {
    //http://manageapi.keetool.xyz/company/export-order?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function editExportOrder(data) {
    //http://manageapi.keetool.xyz/company/export-order?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/" + data.id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.put(url, data);
}
