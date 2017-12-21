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

export function changeStatusOrder(status,orderId, labelId = "") {
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
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/ghtk/services/shipment/order?token=" + token;
    return axios.post(url, {data: JSON.stringify(shippingGood)});
}

export function editOrderApi(order, orderId) {
    let url = env.MANAGE_API_URL + '/order/' + orderId + '/edit';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let data =  {
        info_order: {
            code: order.infoOrder.code,
            created_at: order.infoOrder.created_at,
            // staff:
            //     {
            //         id: 1
            //         name: haha
            //     },
            note: order.infoOrder.note,
        }
        ,
        info_user: {
            id: order.infoUser.id,
            name: order.infoUser.name,
            email: order.infoUser.email,
        }
    }
    return axios.put(url,JSON.stringify(data));
}
