
import axios from 'axios';
import * as env from '../../../constants/env';


export function changeStatusContract(id, status) {

    let url = env.MANAGE_API_URL + "/company/contract/change-status/" + id + "?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url, { status });
}

export function createContract(data) {

    let url = env.MANAGE_API_URL + "/company/contract/create?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    let res = {
        ...data,
        company_a_id: data.company_a.id,
        company_b_id: data.company_b.id,
        staff_id: data.staff.id,
        sign_staff_id: data.sign_staff.id,
        type: data.type.id,
        contract_number: data.contract_number,
        due_date: data.due_date,
        value: data.value,
        note: data.note,

    };

    return axios.post(url, res);
}

export function editContract(data) {

    let url = env.MANAGE_API_URL + "/company/contract/edit/" + data.id + "?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    let res = {
        ...data,
        company_a_id: data.company_a.id,
        company_b_id: data.company_b.id,
        staff_id: data.staff.id,
        sign_staff_id: data.sign_staff.id,
        type: data.type.id,
        contract_number: data.contract_number,
        due_date: data.due_date,
        value: data.value,
        status: data.status,
        note: data.note,

    };
    return axios.put(url, res);
}
export function getContractDetail(id) {

    let url = env.MANAGE_API_URL + "/company/contract/" + id + "?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadAllContract(filter) {
    filter = {
        ...filter,
        limit: filter.limit || "20",
        page: filter.page || "1",
        start_time: filter.start_time || "",
        end_time: filter.end_time || "",
        staff_id: filter.staff_id || "",
        sign_staff_id: filter.sign_staff_id || "",
        company_a_id: filter.company_a_id || "",
        company_b_id: filter.company_b_id || "",
        contract_number: filter.contract_number || "",
        status: filter.status || "",
        type: filter.type || "",
    };
    let url = env.MANAGE_API_URL + "/company/contract/all?";
    let token = localStorage.getItem('token');
    if (token) {
        url +=
            "&token=" + token +
            "&page=" + filter.page +
            "&limit=" + filter.limit +
            "&start_time=" + filter.start_time +
            "&end_time=" + filter.end_time +
            "&staff_id=" + filter.staff_id +
            "&sign_staff_id=" + filter.sign_staff_id +
            "&company_a_id=" + filter.company_a_id +
            "&company_b_id=" + filter.company_b_id +
            "&contract_number=" + filter.contract_number +
            "&status=" + filter.status +
            "&type=" + filter.type +
            "";
    }
    return axios.get(url);
}


export function loadAllCompanies() {
    let url = env.MANAGE_API_URL + "/company/all?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadStaffs() {
    let url = env.MANAGE_API_URL + "/staff?limit=-1";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}