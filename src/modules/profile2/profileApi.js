import axios from 'axios';
import * as env from '../../constants/env';

export function getProfile() {
    let url = env.MANAGE_API_URL + '/profile';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeAvatar(file, completeHandler, id) {
    let url = env.MANAGE_API_URL + "/change-avatar";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formdata = new FormData();
    formdata.append("avatar", file);
    formdata.append("id", id);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
}

export function editProfile(staff) {
    let url = env.MANAGE_API_URL + '/edit-profile';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: staff.name,
        email: staff.email,
        username: staff.username,
        marital: staff.marital,
        role_id: staff.role_id,
        base_id: staff.base_id,
        department_id: staff.department_id,
        homeland: staff.homeland,
        literacy: staff.literacy,
        start_company: staff.start_company,
        age: staff.age,
        address: staff.address,
        phone: staff.phone,
        color: staff.color,
        kpis: staff.kpis,
        revenue: staff.salary,
        allowance: staff.salary_allowance,
        weekly_working_hours: staff.weekly_working_hours,
        bank_number: staff.bank_number,
        bank_name_account: staff.bank_name_account
    });
}

export function changePassword(oldPassword, newPassword) {
    let url = env.MANAGE_API_URL + '/change-password';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        old_password: oldPassword,
        new_password: newPassword,
    });
}

export function getRoles() {
    let url = env.MANAGE_API_URL + "/get-roles";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadBaseApi() {
    let url = env.API_URL + "/bases";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadDepartments() {

    let url = env.MANAGE_API_URL + "/department/get-all-departments";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    return axios.get(url);
}

export function classesByDateApi(filter) {
    let fields = ['start_time', 'end_time'];
    let url = env.NEW_MANAGE_API_URL + "/personal/classes/by-date";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    url += '&include=base,room';
    return axios.get(url);
}
