import axios from 'axios';
import * as env from '../../constants/env';



export function loadDepartment() {
    // http://manageapi.keetool.xyz/department/get-all-departments?token=
    let url = env.MANAGE_API_URL + "/department/get-all-departments?" ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function addDepartment(data) {
    //http://manageapi.keetool.xyz/department/add-department?token=
    let url = env.MANAGE_API_URL + "/department/add-department?" ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, data);
}
export function editDepartment(data) {
    //manageapi.keetool.xyz/department/edit-department?token=
    let url = env.MANAGE_API_URL + "/department/edit-department?" ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url, data);
}
export function deleteDepartment(data) {
    //manageapi.keetool.xyz/department/delete-department?token=
    let url = env.MANAGE_API_URL + "/department/delete-department/" + data.id ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let res = {id: data.id};
    return axios.delete(url, res);
}

