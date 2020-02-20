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
    let fields = ['start_time', 'end_time', 'staff_id', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/class/all?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    url += "&include=course,base,target,register_target,schedule";
    return axios.get(url);
};