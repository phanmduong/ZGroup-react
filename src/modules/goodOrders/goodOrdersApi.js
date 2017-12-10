import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllOrders(page = 1, search, startTime, endTime, staff, status) {
    let url = env.MANAGE_API_URL + '/order/all-orders?page=' + page;
    if (search) {
        url += `&search=${search}`;
    }
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (staff) {
        url += `&staff_id=${staff}`;
    }
    if (search) {
        url += `&status=` + status;
    }
    return axios.get(url);
}

export function loadDetailOrder(orderId) {
    let url = env.MANAGE_API_URL + `/order/${orderId}/info`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadStaffs() {
    let url = env.MANAGE_API_URL + `/class/staffs`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function getAllStaffs() {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + `/order/staffs`;
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeStatusOrder(orderId, status) {
    let url = env.MANAGE_API_URL + `/order/change-status-order`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.put(url, {
        order_id: orderId,
        status: status,
    });
}

export function sendShipOrder() {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/order/test?token=" + token;
    let data = {
        "products": [{
            "name": "bút",
            "weight": 0.1
        }, {
            "name": "tẩy",
            "weight": 0.2
        }],
        "order": {
            "id": "hihi", //code order cua minh (required)
            "pick_name": "HCM-nội thành", //(required)
            "pick_address": "590 CMT8 P.11", //(required)
            "pick_province": "TP. Hồ Chí Minh", //(required)
            "pick_district": "Quận 3", //(required)
            "pick_tel": "0911222333", //(required)
            "tel": "0911222333", //(required)
            "name": "GHTK - HCM - Noi Thanh", //(required)
            "address": "123 nguyễn chí thanh", //(required)
            "province": "TP. Hồ Chí Minh", //(required)
            "district": "Quận 1", //(required)
            "is_freeship": "1",
            "pick_date": "2016-09-30",
            "pick_money": 47000, //(required)
            "note": "Khối lượng tính cước tối đa: 1.00 kg",
            "value": 3000000
        }
    };

    return axios.post(url, {data: JSON.stringify(data)});
}