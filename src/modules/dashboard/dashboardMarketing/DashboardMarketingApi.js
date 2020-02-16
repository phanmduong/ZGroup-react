import {MANAGE_API_URL} from '../../../constants/env';
import axios from 'axios';


export function analyticsLead(filter) {
    let fields = ['start_time', 'end_time', 'carer_id', 'base_id'];
    let url = `${MANAGE_API_URL}/v4/dashboard/analytics-lead?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}
