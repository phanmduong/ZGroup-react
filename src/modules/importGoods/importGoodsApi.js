import axios from 'axios';
import * as env from '../../constants/env';

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
            price: good.price,
        };
    });

    return axios.post(url, {
        code: formImportGood.code,
        note: formImportGood.note,
        paid_money: formImportGood.paid_money,
        imported_goods: importGoods,
        warehouse_id: formImportGood.warehouse_id,
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
