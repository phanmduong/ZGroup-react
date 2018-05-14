import axios from 'axios';
import * as env from '../../constants/env';

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
        role_id: staff.role_id,
        base_id: staff.base_id,
        department_id: staff.department_id,
        homeland: staff.homeland,
        literacy: staff.literacy,
        start_company: staff.start_company,
        age: staff.age,
        address: staff.address,
        phone: staff.phone,
        avatar_url: staff.avatar_url,
        color: staff.color
    });
}

export function getStaffs(page = 1, search = null) {
    let url = env.MANAGE_API_URL + "/get-staffs?page=" + page;
    let token = localStorage.getItem('token');
    if (search) {
        url += "&search=" + search;
    }
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function getAllStaffs( search = null) {
    let url = env.MANAGE_API_URL + "/get-staffs?limit=-1";
    let token = localStorage.getItem('token');
    if (search) {
        url += "&search=" + search;
    }
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function getUsers(page = 1, search = null) {
    let url = env.MANAGE_API_URL + "/staff/get-all-user?page=" + page;
    let token = localStorage.getItem('token');
    if (search) {
        url += "&search=" + search;
    }
    if (token) {
        url += "&token=" + token;
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
        base_id: staff.base_id,
        department_id: staff.department_id,
        homeland: staff.homeland,
        literacy: staff.literacy,
        start_company: staff.start_company,
        age: staff.age,
        address: staff.address,
        phone: staff.phone,
        color: staff.color
    });
}

export function deleteStaff(staff) {
    let url = env.MANAGE_API_URL + '/delete-staff';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: staff.id
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


export function createAvatar(file, completeHandler) {
    let url = env.API_URL + "/create-avatar";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formdata = new FormData();
    formdata.append("avatar", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
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

export function resetPassword(staffId) {
    let url = env.MANAGE_API_URL + "/reset-password";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        staff_id: staffId
    });
}


export function loadDepartments(){

    //http://manageapi.keetool.xyz/department/get-all-departments?token=
    let url = env.MANAGE_API_URL + "/department/get-all-departments";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeDepartmentStaff(staffId, departId){

    //http://manageapi.keetool.xyz/department/add-employees/8?token=
    let url = env.MANAGE_API_URL + "/department/add-employees/" + departId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let data = JSON.stringify([{"id":staffId}]);
    return axios.post(url, {employees: data} );

}