import axios from 'axios';
import * as env from '../../constants/env';

export function loadCustomersApi(limit , page , query ) {
    let url = env.MANAGE_API_URL + "/order/all-customers?";
    let token = localStorage.getItem('token');
    if (limit){
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadGroupCustomerApi(page , limit , query ) {
    let url = env.MANAGE_API_URL + "/order/all-customer-group?";
    let token = localStorage.getItem('token');
    if (limit){
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}



export function addGroupCustomerApi(groupCustomer) {
    let url = env.MANAGE_API_URL + "/order/create-customer-group?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.post(url,{
        'name' :  groupCustomer.name,
        'description' : groupCustomer.description,
        'stringId' : groupCustomer.stringId.join(";"),
    });
}


export function editGroupCustomerApi(groupCustomer) {
    let url = env.MANAGE_API_URL + "/order/change-customer-group?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.put(url,{
        'name' :  groupCustomer.name,
        'description' : groupCustomer.description,
        'stringId' : groupCustomer.stringId.join(";"),
        'customer_group_id' : groupCustomer.id,
    });
}
