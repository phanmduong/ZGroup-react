import axios from "axios";
import * as env from "../../constants/env";
import * as helper from "../../helpers/helper";




export function loadRegisters(filter) {

    let {
        page = 1,
        limit = 16,
        search = '',
        saler_id = '',
        campaign_id = '',
        class_id = '',
        pay_status = '',
        class_type = '',
        start_time = '',
        end_time = '',
        base_id = '',
        appointment_payment = '',
        search_coupon = '',
        search_note = '',
        tele_call_status = '',
        bookmark = '',
        register_status_id = '',
        register_source_id = '',
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
        "&class_type=" + class_type +
        "&search_coupon=" + search_coupon +
        "&search_note=" + search_note +
        "&bookmark=" + bookmark +
        "&register_status_id =" + register_status_id +
        "&register_source_id=" + register_source_id +
        "&tele_call_status=" + tele_call_status
    ;
    if (!helper.isEmptyInput(start_time) && !helper.isEmptyInput(end_time)) {
        url += `&start_time=${start_time}&end_time=${end_time}`;
    }
    url += "&token=" + token;
    return axios.get(url);
}
