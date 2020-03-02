import {NEW_MANAGE_API_URL} from '../../../constants/env';
import axios from 'axios';


export function analyticsLead(filter) {
    let fields = ['start_time', 'end_time', 'carer_id', 'base_id', 'imported_by','source_id','campaign_id','status_id','choice_province_id',];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytics-lead?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    return axios.get(url);
}
export function analyticsSourceCampaign(filter) {
    let fields = ['start_time', 'end_time', 'carer_id', 'base_id'];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytics-source-campaign?token=${localStorage.getItem('token')}`;
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