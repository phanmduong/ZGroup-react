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
    if (status) {
        url += `&status=` + status;
    }
    return axios.get(url);
}

export function loadOrderInfo(page = 1, search, startTime, endTime, staff, status) {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + '/order/statistic?token=' + token + '&page=' + page;
    if (search) {
        url += `&search=${search}`;
    }
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    if (staff) {
        url += `&staff_id=${staff}`;
    }
    if (status) {
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

export function changeStatusOrder(status, orderId) {
    let url = env.MANAGE_API_URL + "/order/" + orderId + "/status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        status: status
    });
}

export function sendShipOrder(shippingGood) {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/ghtk/services/shipment/order?token=" + token;
    return axios.post(url, {data: JSON.stringify(shippingGood)});
}

export function cancelShipOrder(labelId) {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/ghtk/services/shipment/cancel/" + labelId + "?token=" + token;
    return axios.delete(url);
}

export function editNote(order) {
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/order/" + order.id + "/note?token=" + token;
    return axios.put(url, {
        note: order.note
    });
}

export function editOrderApi(order, orderId) {
    let url = env.MANAGE_API_URL + '/order/' + orderId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    let tmp = order.order.good_orders.map((good_order) => {
        return {'id': good_order.id, 'quantity': good_order.quantity};
    });

    return axios.put(url,
        {
            'note': order.order.note,
            'code': order.order.code,
            'status': order.order.status,
            'good_orders': JSON.stringify(tmp),

        }
    );
}
