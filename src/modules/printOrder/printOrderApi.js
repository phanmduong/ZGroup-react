import axios    from 'axios';
import * as env from '../../constants/env';


export function loadPrintOrders(page,search) {
    //http://manageapi.keetool.xyz/company/print-order/all?token=
    let url     = env.MANAGE_API_URL +"/company/print-order/all?";
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

export function createPrintOrder(data) {
    //http://manageapi.keetool.xyz/company/print-order?token=
    let url     = env.MANAGE_API_URL +"/company/print-order";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }

    return axios.post(url, data);
}

export function editPrintOrder(data) {
    //http://manageapi.keetool.xyz/company/print-order?token=
    let url     = env.MANAGE_API_URL +"/company/print-order/" + data.id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.put(url, data);
}

export function loadPrintOrderInfo(id) {
    //http://manageapi.keetool.xyz/company/print-order/21?token=
    let url     = env.MANAGE_API_URL +"/company/print-order/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }

    return axios.get(url);
}
export function confirmOrder(id) {
    //http://manageapi.keetool.xyz/company/print-order/21?token=
    let url     = env.MANAGE_API_URL +"/company/print-order/" + id + "/change-status";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }

    return axios.post(url);
}

