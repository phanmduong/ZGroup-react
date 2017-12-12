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

export function changeStatusOrder(orderId, status, labelId = "") {
    let url = env.MANAGE_API_URL + `/order/change-status-order`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.put(url, {
        order_id: orderId,
        label_id: labelId,
        status: status,
    });
}


export function sendShipOrder(shippingGood) {
    const token = localStorage.getItem('token');
    const data = JSON.stringify(shippingGood);
    let url = env.MANAGE_API_URL + "/ghtk/services/shipment/order?token=" + token;
    return axios.post(url, {data});
}

export function updateShipOrder(shippingGood) {
    const token = localStorage.getItem('token');
    const data = JSON.stringify(shippingGood);
    let url = env.MANAGE_API_URL + "/ghtk/services/shipment/order?token=" + token;
    return axios.post(url, {data});
}

