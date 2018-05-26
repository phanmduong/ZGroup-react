import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllOrder(){
    let url = env.MANAGE_API_URL + '/company/order/all' ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1"  + "&filter=1";
    }
    return axios.get(url);
}

export function loadImportOrder(id){
    let url = env.MANAGE_API_URL + '/company/import-order/' + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function createImportOrder(data){
    let url = env.MANAGE_API_URL + '/company/import-order/item-order/' + data.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,data);
}

export function editImportOrder(data){
    let url = env.MANAGE_API_URL + '/company/import-order/item-order' + data.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,data);
}

export function loadAllImportOrder(filter){
    let {page,companyId} = filter;
    let url = env.MANAGE_API_URL + '/company/import-order/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=20" ;
    }
    if(companyId) {
        url += "&company_id=" + companyId;
    }
    return axios.get(url);
}
export function loadAllImportOrderNoPaging(){
    let url = env.MANAGE_API_URL + '/company/import-order/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    
    return axios.get(url);
}

export function loadAllWarehourses() {
    let url     = env.MANAGE_API_URL +"/order/all-warehouses?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllGoods() {
    let url     = env.MANAGE_API_URL +"/good/all/no-paging";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}

export function loadAllCompanies() {
    let url     = env.MANAGE_API_URL +"/company/provided?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function changeStatusImportOrder(id){
    let url = env.MANAGE_API_URL + '/company/item-order/' +id + '/change-status';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&status=3";
    }
    return axios.post(url);
}

