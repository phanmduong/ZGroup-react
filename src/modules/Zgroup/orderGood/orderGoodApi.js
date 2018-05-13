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
    let url     = env.MANAGE_API_URL +"/company/provided?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllOrderGood(page = 1, companyId='') {
    let url     = env.MANAGE_API_URL +"/company/order/all?page="+page+"&company_id=" + companyId;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}


export function createOrderGood(data) {
    //http://manageapi.keetool.xyz/company/provided?token=
    let url     = env.MANAGE_API_URL +"/company/order/create?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "token=" + token;
    }
    return axios.post(url, data);
}

export function loadOrderGood(id) {
    //http://manageapi.keetool.xyz/company/be-ordered/{orderId}
    let url     = env.MANAGE_API_URL +"/company/order/" + id;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}
export function editOrderGood(data) {
    //http://manageapi.keetool.xyz/company/provided?token=
    let url     = env.MANAGE_API_URL +"/company/order/" + data.id + "?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "token=" + token;
    }
    return axios.put(url, data);
}

export function confirmOrder(id) {
    //http://manageapi.keetool.xyz/company/print-order/21?token=
    let url     = env.MANAGE_API_URL +"/company/item-order/" + id + "/change-status?status=1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }

    return axios.post(url);
}