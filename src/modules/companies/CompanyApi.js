import axios from 'axios';
import * as env from '../../constants/env';

export function loadCompanies(page = 1, type, search) {
    let url = env.MANAGE_API_URL + "/company/all";
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token + "&page=" + page + "&type=" + type + "&search=" + search;
    return axios.get(url);

}

export function loadCompany(id) {
    let url = env.MANAGE_API_URL + "/company/";
    let token = localStorage.getItem('token');
    if (token)
        url += id + "?token=" + token;
    return axios.get(url);
}

export function loadFields() {
    let url = env.MANAGE_API_URL + "/company/field/all";
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token;
    return axios.get(url);
}

export function addCompany(object) {
    let url = env.MANAGE_API_URL + "/company/create";
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token;
    return axios.post(url, {
        "name": object.name,
        "registered_business_address": object.registered_business_address,
        "office_address": object.office_address,
        "phone_company": object.phone_company,
        "tax_code": object.tax_code,
        "account_name": object.account_name,
        "account_number": object.account_number,
        "bank_name": object.bank_name,
        "bank_branch": object.bank_branch,
        "field_id": object.field.id,
        "user_contact": object.user_contact,
        "user_contact_phone": object.user_contact_phone,
        "type": object.type,
    });
}
export function editCompany(id,object){
    let url = env.MANAGE_API_URL + "/company/";
    let token = localStorage.getItem('token');
    if (token)
        url += id + "?token=" + token;
    return axios.put(url, {
        "name": object.name,
        "registered_business_address": object.registered_business_address,
        "office_address": object.office_address,
        "phone_company": object.phone_company,
        "tax_code": object.tax_code,
        "account_name": object.account_name,
        "account_number": object.account_number,
        "bank_name": object.bank_name,
        "bank_branch": object.bank_branch,
        "field_id": object.field.id,
        "user_contact": object.user_contact,
        "user_contact_phone": object.user_contact_phone,
        "type": object.type,
    });
}
export function addField(name){
    let url = env.MANAGE_API_URL + "/company/field/create";
    let token = localStorage.getItem('token');
    if (token)
        url += "?token=" + token;
    return axios.post(url,{
       "name" : name,
    });
}