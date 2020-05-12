import axios from "axios";
import * as env from "../../constants/env";
import * as helper from "../../helpers/helper";




export function loadRegisters(filter) {

    let {
        page = 1,
        limit = 16,
        query = '',
        saler_id = '',
        campaignId = '',
        selectedClassId = '',
        selectedMoneyFilter = '',
        selectedClassStatus = '',
        start_time = '',
        end_time = '',
        selectedBaseId = '',
        appointmentPayment = '',
        query_coupon = '',
        query_note = '',
        selectedTeleCallStatus = '',
        selectedBookmarkStatus = '',
        registerStatusId = '',
        registerSourceId = '',
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
        "&search=" + query +
        "&saler_id=" + saler_id +
        '&campaign_id=' + campaignId +
        "&class_id=" + selectedClassId +
        "&status=" + selectedMoneyFilter +
        "&base_id=" + selectedBaseId +
        "&appointment_payment=" + appointmentPayment +
        "&date_test=" + date_test +
        "&type=" + selectedClassStatus +
        "&search_coupon=" + query_coupon +
        "&query_note=" + query_note +
        "&bookmark=" + selectedBookmarkStatus +
        "&registerStatusId=" + registerStatusId +
        "&registerSourceId=" + registerSourceId +
        "&tele_call_status=" + selectedTeleCallStatus
    ;
    if (!helper.isEmptyInput(start_time) && !helper.isEmptyInput(end_time)) {
        url += `&start_time=${start_time}&end_time=${end_time}`;
    }
    url += "&token=" + token;
    return axios.get(url);
}
