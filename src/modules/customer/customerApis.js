import axios from 'axios';
import * as env from '../../constants/env';

export function loadCustomersApi(page , limit, query,status) {
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
    if (status){
        url += "&status=" + status;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function loadOrdersCustomerApi(id , page , limit ) {
    let url = env.MANAGE_API_URL + "/order/all-orders?";
    let token = localStorage.getItem('token');
    if (limit){
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (id){
        url += "&user_id=" + id;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function loadTotalAndDebtMoneyApi() {
    let url = env.MANAGE_API_URL + "/order/total-and-debt-money?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.get(url);
}
export function loadInfoCustomersApi(id) {
    let url = env.MANAGE_API_URL + "/order/info-customer/";
    let token = localStorage.getItem('token');
    if (id){
        url += id;
    }
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function addCustomerApi(customer) {
    let url = env.MANAGE_API_URL + "/order/add-customer?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.post(url,{
        'name' :  customer.name,
        'gender' : customer.gender,
        'address' : customer.address,
        'email' : customer.email,
        'phone' : customer.phone,
        'dob' : customer.birthday,
    });
}

export function editCustomerApi(customer ) {
    let url = env.MANAGE_API_URL + "/order/edit-customer/" + customer.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        'name': customer.name,
        'email': customer.email,
        'phone': customer.phone,
        'address': customer.address,
        'gender' : customer.gender,
        'dob' : customer.birthday,
        'stringId' : customer.stringId.join(";"),
    });
}


export function loadGroupCustomerApi(page , limit , query ) {
    let url = env.MANAGE_API_URL + "/order/customer-groups?";
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



