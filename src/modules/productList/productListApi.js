import axios from 'axios';
import * as env from '../../constants/env';

const token = localStorage.getItem('token');

export function getInformationProductsApi(page, search, start_time, end_time, manufacture_id, good_category_id, status) {
    let url = env.MANAGE_API_URL + "/good/information?token=" + token;
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (start_time && end_time) {
        url += "&start_time=" + start_time + "&end_time=" + end_time;
    }
    if (manufacture_id) {
        url += "&manufacture_id=" + manufacture_id;
    }
    if (good_category_id) {
        url += "&good_category_id=" + good_category_id;
    }
    if (status) {
        if (status.sale) {
            url += "&sale_status=" + status.sale;
        }
        if (status.display) {
            url += "&display_status=" + status.display;
        }
        if (status.highlight) {
            url += "&highlight_status=" + status.highlight;
        }
    }
    return axios.get(url);
}

export function getProductsApi(page, search, start_time, end_time, manufacture_id, good_category_id, status) {
    let url = env.MANAGE_API_URL + "/good/all?token=" + token;
    if (page) {
        url += "&page=" + page;
    }
    if (search) {
        url += "&search=" + search;
    }
    if (start_time && end_time) {
        url += "&start_time=" + start_time + "&end_time=" + end_time;
    }
    if (manufacture_id) {
        url += "&manufacture_id=" + manufacture_id;
    }
    if (good_category_id) {
        url += "&good_category_id=" + good_category_id;
    }
    if (status) {
        if (status.sale) {
            url += "&sale_status=" + status.sale;
        }
        if (status.display) {
            url += "&display_status=" + status.display;
        }
        if (status.highlight) {
            url += "&highlight_status=" + status.highlight;
        }
    }

    return axios.get(url);
}

export function getProductsStatusApi(status) {
    let url = env.MANAGE_API_URL + "/good/get-by-status?token=" + token + "&status=" + status;
    return axios.get(url);
}

export function updatePriceApi(productPresent) {
    let url = env.MANAGE_API_URL + "/good/" + productPresent.id + "/update-price?token=" + token;
    return axios.put(url, {
        price: productPresent.price
    });
}

export function changeAvatarApi(file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + '/file/upload';
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append('file', file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}

export function getCategoriesApi() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/order/category/all?token=" + token;
    return axios.get(url);
}

export function uploadEditProductApi(productPresent, manufacture_id, category_id) {
    let url = env.MANAGE_API_URL + "/good/edit/" + productPresent.id + "?token=" + token;
    return axios.put(url, {
        avatar_url: productPresent.avatar_url,
        price: productPresent.price,
        name: productPresent.name,
        manufacture_id: manufacture_id,
        good_category_id: category_id,
        sale_status: productPresent.sale_status,
        display_status: productPresent.display_status,
        highlight_status: productPresent.highlight_status
    });
}

export function getManufacturesApi() {
    let url = env.MANAGE_API_URL + "/v2/manufacture?token=" + token + "&limit=-1";
    return axios.get(url);
}

export function deleteProductApi(product) {
    let url = env.MANAGE_API_URL + "/good/" + product.id + "/delete?token=" + token;
    return axios.delete(url);
}


