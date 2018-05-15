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

export function editStaff(staff) {
    let url = env.MANAGE_API_URL + '/staff/' + staff.id + '/edit';
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
        phone: staff.phone,
        color: staff.color
    });
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

export function editProfile(profile) {
    let url = env.MANAGE_API_URL + '/edit-profile';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: profile.name,
        email: profile.email,
        username: profile.username,
        marital: profile.marital,
        homeland: profile.homeland,
        literacy: profile.literacy,
        start_company: profile.start_company,
        age: profile.age,
        address: profile.address,
        phone: profile.phone,
        color: profile.color
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

