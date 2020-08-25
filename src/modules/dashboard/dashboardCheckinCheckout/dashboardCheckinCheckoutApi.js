import {NEW_MANAGE_API_URL} from '../../../constants/env';
import axios from 'axios';


export function historyCheckinoutClassApi(filter) {
    let fields = ['start_time', 'end_time', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/checkin-checkout/class/history?token=${localStorage.getItem('token')}&include=base,room,course`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}

export function historyCheckinoutWorkShiftApi(filter) {
    let fields = ['start_time', 'end_time', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/checkin-checkout/work-shift/history?token=${localStorage.getItem('token')}&include=base,room,course`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}

export function historyCheckinoutShiftApi(filter) {
    let fields = ['start_time', 'end_time', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/checkin-checkout/shift/history?token=${localStorage.getItem('token')}&include=base,room,course`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}
