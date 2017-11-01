import axios from 'axios';
import * as env from '../../constants/env';

export function loadImportOrders(startTime = '', endTime = '') {
    let url = env.MANAGE_API_URL + '/order/import-orders';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }

    return axios.get(url);
}

export function loadImportGoodsOrder(orderId) {
    let url = env.MANAGE_API_URL + '/order/detailed-import-order/' + orderId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function searchGoods(search) {
    let url = env.MANAGE_API_URL + `/good/all?limit=-1&search=${search}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function createImportGoods(formImportGood) {
    let url = env.MANAGE_API_URL + `/order/add-import-order-goods`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    let importGoods = formImportGood.importGoods.map((good) => {
        return {
            good_id: good.id,
            quantity: good.quantity,
            import_price: good.import_price,
        };
    });

    return axios.post(url, {
        code: formImportGood.code,
        note: formImportGood.note,
        paid_money: formImportGood.paid_money,
        imported_goods: importGoods,
        warehouse_id: formImportGood.warehouse_id
    });
}

export function allWarehouses() {
    let url = env.MANAGE_API_URL + `/order/all-warehouses`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
