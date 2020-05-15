import axios from "axios";
import * as env from "../../constants/env";
import * as helper from "../../helpers/helper";
import {NEW_MANAGE_API_URL} from "../../constants/env";




export function loadRegisters(filter) {

    let {
        page = 1,
        limit = 16,
        search = '',
        saler_id = '',
        campaign_id = '',
        class_id = '',
        pay_status = '',
        class_status = '',
        start_time = '',
        end_time = '',
        base_id = '',
        appointment_payment = '',
        search_coupon = '',
        search_note = '',
        tele_call_status = '',
        bookmark = '',
        register_status_id = '',
        source_id = '',
        date_test = '',
    } = filter;
    console.log('api',filter);

    let baseUrl = env.NEW_MANAGE_API_URL + "/register/register-list?";
    let includes = '&include=saler,studyClass,source,register_status,student,gen,coupons,tele_call,course,marketing_campaign';
    let token = localStorage.getItem('token');
    let url =
        baseUrl +
        includes +
        "&page=" + page +
        "&limit=" + limit +
        "&search=" + search +
        "&saler_id=" + saler_id +
        '&campaign_id=' + campaign_id +
        "&class_id=" + class_id +
        "&pay_status=" + pay_status +
        "&base_id=" + base_id +
        "&appointment_payment=" + appointment_payment +
        "&date_test=" + date_test +
        "&class_status=" + class_status +
        "&search_coupon=" + search_coupon +
        "&search_note=" + search_note +
        "&bookmark=" + bookmark +
        "&register_status_id =" + register_status_id +
        "&source_id=" + source_id +
        "&tele_call_status=" + tele_call_status
    ;
    if (!helper.isEmptyInput(start_time) && !helper.isEmptyInput(end_time)) {
        url += `&start_time=${start_time}&end_time=${end_time}`;
    }
    url += "&token=" + token;
    return axios.get(url);
}




export function findUser(search,is_staff) {
    let url = env.NEW_MANAGE_API_URL + "/user/find-by-name";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&search=' +search;
    url += '&is_staff=' +(is_staff || '');
    return axios.get(url,);
}


export const getCourseActiveApi = () => {
    let url = `${NEW_MANAGE_API_URL}/course/all-active?token=${localStorage.getItem('token')}`;
    return axios.get(url);
}
export const getSourcesApi = () => {
    let url = `${NEW_MANAGE_API_URL}/source/all?token=${localStorage.getItem('token')}`;
    return axios.get(url);
}
export const getMarketingCampaignsApi = () => {
    let url = `${NEW_MANAGE_API_URL}/marketing-campaign/all?token=${localStorage.getItem('token')}`;
    return axios.get(url);
}

export function loadStatuses(statusRef) {
    let url = env.NEW_MANAGE_API_URL + `/statuses/all`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&ref=' + statusRef;

    return axios.get(url);
}

export function loadSources() {
    let url = env.MANAGE_API_URL + `/source/all`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}


export function findClass(search) {
    let url = env.NEW_MANAGE_API_URL + "/class/find-by-name";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&search=' +search;
    url += '&include=course';
    return axios.get(url);
}