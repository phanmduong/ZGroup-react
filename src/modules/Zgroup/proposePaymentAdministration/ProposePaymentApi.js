import axios from 'axios';
import * as env from '../../../constants/env';
import {DATE_FORMAT, DATETIME_FORMAT_SQL} from "../../../constants/constants";
import moment from "moment/moment";

export function createPayment(object){
    let url = env.MANAGE_API_URL + '/company/payment/create';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,{
        'payer_id': object.payer.id,
        'receiver_id': object.receiver.id,
        'money_value': object.money_value,
        'staff_id': object.staff_id,
        'description': object.description,
        'deadline': moment(object.deadline, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATETIME_FORMAT_SQL),
        'type': "propose_payment",
    });

}
export function editPayment(id,object){
    let url = env.MANAGE_API_URL + '/company/payment/edit/' + id ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,{
        'payer_id': object.payer.id,
        'receiver_id': object.receiver.id,
        'money_value': object.money_value,
        'description': object.description,
        'staff_id': object.staff.id,
        'deadline': moment(object.deadline, [DATETIME_FORMAT_SQL, DATE_FORMAT]).format(DATETIME_FORMAT_SQL),
        'type': "propose_payment",
    });

}
export function loadPayments(page,receiver_id, payer_id,startTime,endTime){
    let url = env.MANAGE_API_URL + '/company/payment/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page + "&limit=15" + "&type=propose_payment";
    }
    if(receiver_id){
        url += "&receiver_id=" + receiver_id;
    }

    if(payer_id){
        url += "&payer_id=" + payer_id;
    }
    if(startTime){
        url += "&start_time=" + startTime + "&end_time=" + endTime;
    }


    return axios.get(url);
}

export function loadPayment(id){
    let url = env.MANAGE_API_URL + '/company/payment/' + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token ;
    }
    return axios.get(url);
}
export function loadCompanies(){
    let url = env.MANAGE_API_URL + '/company/all';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    return axios.get(url);
}
export function uploadImage(file,completeHandler, progressHandler, error){
    let url = env.API_URL + '/upload-image-froala';
    let formdata = new FormData();
    formdata.append("image", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formdata);
}

export function changeStatus(id,status){
    let url = env.MANAGE_API_URL + '/company/payment/' + id + '/change-status';
    let token = localStorage.getItem('token');
    url += "?token=" + token;
    return axios.post(url, {
        'status': status
    });

}