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
        money: ""+register.money,
        code: register.code,
        received_id_card: ""+Number(register.received_id_card),
        note: register.note
    });
}


