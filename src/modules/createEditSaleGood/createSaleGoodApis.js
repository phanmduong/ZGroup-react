import axios from 'axios';
import * as env from '../../constants/env';

export function loadGoodsInModalApi(limit, page, query, warehouse) {
    let url = env.MANAGE_API_URL + "/good/inventories/all?";
    let token = localStorage.getItem('token');
    if (limit) {
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    if (warehouse) {
        url += "&warehouse_id=" + warehouse;
    }
    return axios.get(url);
}

export function loadWareHouseApi() {
    let url = env.MANAGE_API_URL + "/order/warehouses/all?";
    let token = localStorage.getItem('token');

    if (token) {
        url += "&token=" + token;
    }
    url += "&limit=" + -1;

    return axios.get(url);
}

export function createSaleGoodApi(createSaleGood) {
    let url = env.MANAGE_API_URL + "/order/store-order?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    let good_orders = createSaleGood.goodsShowInTable.map((good) => {
        return {"good_id": good.id, "quantity": good.tmpQuantity};
    });
    return axios.post(url, {
        "note": createSaleGood.infoOrder.note,
        // "user_id": JSON.parse(localStorage.getItem('user')).id,
        "payment": createSaleGood.infoOrder.payment,
        // "status": createSaleGood.infoOrder.status,
        "good_orders": JSON.stringify(good_orders),
        "warehouse_id" : createSaleGood.warehouse,
        "name" : createSaleGood.customer.name,
        "address" : createSaleGood.customer.address,
        "phone" : createSaleGood.customer.phone,
        "email" : createSaleGood.customer.email,
    });
}