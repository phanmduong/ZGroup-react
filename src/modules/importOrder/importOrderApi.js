import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllOrder(){
    let url = env.MANAGE_API_URL + '/company/order/all' ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
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

export function loadAllImportOrder(page){
    let url = env.MANAGE_API_URL + '/company/import-order/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=20";
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
    let url     = env.MANAGE_API_URL +"/company/share?limit=-1";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token=" + token;
    }
    return axios.get(url);
}

export function loadHistoryImportOrder(page,id){
    let url = env.MANAGE_API_URL + '/company/import-order/' +id + '/history-import-order';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page;
    }
    return axios.get(url);
}