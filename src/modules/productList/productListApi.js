import axios from 'axios';
import * as env from '../../constants/env';

export function getProductsApi() {
    let token = localStorage.getItem('token');
    let url = "http://manageapi.graphics.vn/good/all?token=" + token;
    return axios.get(url);
}

export function updatePriceApi(productPresent) {
    let token = localStorage.getItem('token');
    let url = "http://manageapi.graphics.vn/good/" + productPresent.id + "/update-price?token=" + token;
    return axios.put(url, {
        price: productPresent.price
    });
}

export function changeAvatarApi(file, completeHandler, progressHandler, error) {
    let url = env.API_URL + "/upload-image-froala";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append('image', file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}

export function getCategoriesApi() {
    let token = localStorage.getItem("token");
    let url = "http://manageapi.graphics.vn/order/category/all?token=" + token;
    return axios.get(url);
}

export function uploadEditProductApi(productPresent) {
    let token = localStorage.getItem("token");
    let url = "http://manageapi.graphics.vn/good/edit/" + productPresent.id + "?token=" + token;
    return axios.put(url, {
        avatar_url: productPresent.avatar_url,
        price: productPresent.price,
        name: productPresent.name,
        manufacture_id: productPresent.manufacture_id,
        category_id: productPresent.category_id
    });
}

export function getManufacturesApi() {
    let token = localStorage.getItem("token");
    let url = "http://manageapi.graphics.vn/good/manufactures?token=" + token;
    return axios.get(url);
}

