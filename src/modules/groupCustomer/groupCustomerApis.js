import axios from 'axios';
import * as env from '../../constants/env';

export function loadCustomersInOverlayApi(limit , page , query ) {
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

export function loadCustomersInModal(page , limit, query, idModal ) {
    let url = env.MANAGE_API_URL + "/order/customer-group/"+ idModal+ "/customers?";
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



export function addGroupCustomerApi(groupCustomerForm) {
    let url = env.MANAGE_API_URL + "/order/customer-group/add?" ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "token=" + token;
    }
    return axios.post(url,{
        'name' :  groupCustomerForm.name,
        'description' : groupCustomerForm.description,
        'stringId' : groupCustomerForm.stringId.join(";"),
        'color': groupCustomerForm.color,
    });
}


export function editGroupCustomerApi(groupCustomerForm, groupId) {
    let url = env.MANAGE_API_URL + "/order/customer-group/" + groupId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,{
        'name' :  groupCustomerForm.name,
        'description' : groupCustomerForm.description,
        'stringId' : groupCustomerForm.stringId.join(";"),
        'color': groupCustomerForm.color,
    });
}
export function deleteGroupCustomerApi(id) {
    let url = env.MANAGE_API_URL + "/order/customer-group/" + id ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}
