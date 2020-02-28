import {NEW_MANAGE_API_URL} from '../../../constants/env';
import axios from 'axios';


export function analyticsRevenueApi(filter) {
    let fields = ['start_time', 'end_time', 'staff_id', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytics-revenue?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}

export function analyticsRegisterApi(filter) {
    let fields = ['start_time', 'end_time', 'staff_id', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytics-register?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}


export const loadStaffs = () => {
    let url = NEW_MANAGE_API_URL + `/staff?limit=-1`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
};

export const loadClassesApi = (filter) => {
    let fields = ['start_date', 'end_date', 'staff_id', 'base_id', "enroll_start_date", "enroll_end_date"];
    let url = `${NEW_MANAGE_API_URL}/class/all?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    url += "&include=course,base,target,register_target,schedule";
    return axios.get(url);
};

export const loadCoursesApi = (filter) => {
    let fields = ['start_time', 'end_time', 'staff_id', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytics-register-by-course?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    // url += "&include=course,base,target,register_target,schedule";
    return axios.get(url);
};

export const analyticsKpiApi = (filter) => {
    let fields = ['start_time', 'end_time', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytics-kpi?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    url += "&include=base,base.district.province";
    return axios.get(url);
};
export const setKpiApi = (kpi) => {
    let url = `${NEW_MANAGE_API_URL}/sale-kpi/create?token=${localStorage.getItem('token')}`;
    return axios.post(url, kpi);
};

export const getHistoryKpiApi = (filter) => {
    let fields = ['start_time', 'end_time', 'base_id', "user_ids"];
    let url = `${NEW_MANAGE_API_URL}/sale-kpi/by-dates?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
};