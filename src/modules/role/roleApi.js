import axios from 'axios';
import * as env from '../../constants/env';

export function getRoles() {
    let url = env.MANAGE_API_URL + "/get-roles";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function createRole(tabs, role) {
    let url = env.MANAGE_API_URL + "/create-role";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        tabs: tabs,
        role: {
            id: -1,
            role_title: role.role_title
        }
    });
}

export function deleteRole(roleId) {
    let url = env.MANAGE_API_URL + "/delete-role";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        role_id: roleId
    });
}

export function getRole(roleId) {
    let url = env.MANAGE_API_URL + "/role/" + roleId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function editRole(tabs, role) {
    let url = env.MANAGE_API_URL + "/edit-role";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        tabs: tabs,
        role: role
    });
}


export function loadAllTabsApi() {
    let url = env.MANAGE_API_URL + "/all-tabs";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
