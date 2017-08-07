import axios from 'axios';
import * as env from '../constants/env';

export function addStaff(staff) {
    let url = env.MANAGE_API_URL + "/add-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: staff.name,
        email: staff.email,
        username: staff.username,
        marital: staff.marital,
        role_id: staff.role,
        homeland: staff.homeland,
        literacy: staff.literacy,
        start_company: staff.start_company,
        age: staff.age,
        address: staff.address,
        phone: staff.phone
    });
}

export function getStaffs() {
    let url = env.MANAGE_API_URL + "/get-staffs";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function changeRoleStaff(staffId, roleId) {
    let url = env.MANAGE_API_URL + "/change-role-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        staff_id: staffId,
        role_id: roleId
    });
}

export function changeBaseStaff(staffId, baseId) {
    let url = env.MANAGE_API_URL + "/change-base-staff";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        staff_id: staffId,
        base_id: baseId
    });
}

export function getStaff(staffId) {
    let url = env.MANAGE_API_URL + "/staff/" + staffId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function editStaff(staff) {
    let url = env.MANAGE_API_URL + '/staff/'+staff.id+'/edit';
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
        homeland: staff.homeland,
        literacy: staff.literacy,
        start_company: staff.start_company,
        age: staff.age,
        address: staff.address,
        phone: staff.phone
    });
}

export function deleteStaff(staff) {
    let url = env.MANAGE_API_URL + '/delete-staff';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        username: staff.username
    });
}
