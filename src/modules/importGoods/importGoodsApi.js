import axios from 'axios';
import * as env from '../../constants/env';
import {isEmptyInput} from "../../helpers/helper";

export function loadImportOrders(page = 1, search = '', startTime = '', endTime = '', status = '', staff = '') {
    let url = env.MANAGE_API_URL + '/order/import-orders';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += `&page=${page}`;
    if (startTime && endTime) {
        url += `&start_time=${startTime}&end_time=${endTime}`;
    }
    if (search) {
        url += `&search=${search}`;
    }
    if (status) {
        url += `&status=${status}`;
    }
    if (staff) {
        url += `&staff_id=${staff}`;
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
    let url = env.MANAGE_API_URL + `/good/import?limit=-1&search=${search}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function createImportGoods(formImportGood, status, importGoodsId) {
    let url = env.MANAGE_API_URL + (importGoodsId ? `/order/import-order/edit/${importGoodsId}` :
        `/order/add-import-order-goods`)

    ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    let importGoods = formImportGood.imported_goods.map((good) => {
        return {
            good_id: good.id ? good.id : 0,
            barcode: good.barcode,
            code: good.code,
            name: good.name,
            quantity: Number(good.quantity.toString().replace(/\./g, "")),
            import_price: Number(good.import_price.toString().replace(/\./g, "")),
            price: !isEmptyInput(good.price) ? Number(good.price.toString().replace(/\./g, "")) : 0,
        };
    });

    return axios.post(url, {
        code: formImportGood.code,
        id: formImportGood.id ? formImportGood.id : "",
        note: formImportGood.note,
        status: status,
        paid_money: Number(formImportGood.paid_money.toString().replace(/\./g, "")),
        imported_goods: importGoods,
        payment: formImportGood.payment,
        note_paid_money: formImportGood.note_paid_money,
        warehouse_id: formImportGood.warehouse.id,
        user_id: formImportGood.supplier ? formImportGood.supplier.id : ''
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

export function loadSupplier(search) {
    let url = env.MANAGE_API_URL + `/order/all-suppliers?limit=-1&search=` + search;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function searchStaffs(search) {
    let url = env.MANAGE_API_URL + `/order/staffs?search=` + search;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function storeSupplier(supplier) {
    let url = env.MANAGE_API_URL + `/order/add-supplier`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
        address: supplier.address,
        code: supplier.code,
    });
}

export function loadHistoryPaid(orderId) {
    let url = env.MANAGE_API_URL + `/order/all-order-paid-money`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    if (orderId) {
        url += "&order_id=" + orderId;
    }

    return axios.get(url);
}

export function checkGoods(goods) {
    let url = env.MANAGE_API_URL + '/order/check-goods';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        goods: goods
    });

}

export function deleteImportOrder(importOrderId) {
    let url = env.MANAGE_API_URL + '/order/import-order/delete/' + importOrderId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.delete(url);

}

export function addPaidMoney(paidMoney, orderId) {
    let url = env.MANAGE_API_URL + '/order/pay-import-order/' + orderId;
    let token = localStorage.getItem('token');

    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        money: Number(paidMoney.money.toString().replace(/\./g, "")),
        note: paidMoney.note,
        payment: paidMoney.payment,
    });

}

