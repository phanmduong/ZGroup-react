import axios from 'axios';
import * as env from '../../constants/env';

export function searchStudentRegister(search, page = 1) {
    let url = env.MANAGE_API_URL + "/collect-money/search-registers?search=" + search + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function payMoney(register) {
    let url = env.MANAGE_API_URL + "/collect-money/pay-money";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        register_id: register.id,
        money: "" + register.money,
        code: register.code,
        note: register.note,
        payment_method: register.payment_method,
        received_book_at: register.received_book_at,
        actual_input_at: register.actual_input_at,
    });
}
export function editPayment(studentId,payment) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/edit-payment`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        id: payment.id,
        money: "" + payment.money,
        code: payment.code,
        note: payment.note,
        payment_method: payment.payment_method,
        received_book_at: payment.received_book_at,
        actual_input_at: payment.actual_input_at,
    });
}


