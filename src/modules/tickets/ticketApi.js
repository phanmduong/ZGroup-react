import * as env from "../../constants/env";
import axios from 'axios';
import {isEmptyInput} from "../../helpers/helper";

export function findUser(search,is_staff) {
    let url = env.NEW_MANAGE_API_URL + "/user/find-by-name";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&search=' +search;
    url += '&is_staff=' +(is_staff || '');
    return axios.get(url,);
}
export function findClass(search) {
    let url = env.NEW_MANAGE_API_URL + "/class/find-by-name";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&search=' +search;
    url += '&include=course';
    return axios.get(url);
}
export function loadTickets(filter,includes ='') {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/ticket/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if(!isEmptyInput(filter.search)) url += '&search=' + filter.search;
    [
        'search',
        'pic_id',
        'class_id',
        'status_id',
        'register_id',
        'ticket_type_id',
        'priority_id',
        'assigner_id',
        'stared_by',
    ].forEach(field=>{
        if(!isEmptyInput(filter[field])){
            url += `&${field}=${filter[field]}`;
        }
    });
    url+='&include=' +includes;
    return axios.get(url);
}
export function loadTicketTypes() {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/type/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function createTicketType(data) {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/type/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,data);
}
export function archiveTicket(ticket_id) {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/ticket/archive/" + ticket_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}
export function starTicket(ticket_id) {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/ticket/star/" + ticket_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}
export function createTicketPriority(data) {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/priority/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,data);
}
export function loadTicketPriorities() {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/priority/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function loadUserRegisters(user_id) {
    let url = env.NEW_MANAGE_API_URL + "/user/registers";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&include=studyClass.course&user_id=' + user_id;
    return axios.get(url);
}
export function createTicket(data) {
    let url = env.NEW_MANAGE_API_URL + "/customer-service/ticket/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,data);
}