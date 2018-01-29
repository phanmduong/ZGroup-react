import axios from 'axios';
import * as env from '../../constants/env';

const token = localStorage.getItem("token");

export function getCategoriesApi() {
    let url = env.MANAGE_API_URL + "/order/category/all?token=" + token;
    return axios.get(url);
}

export function getManufacturesApi() {
    let url = env.MANAGE_API_URL + "/v2/manufacture?token=" + token + "&limit=-1";
    return axios.get(url);
}

export function getWarehouseListApi() {
    let url = env.MANAGE_API_URL + "/order/all-warehouses" + "?token=" + token;
    return axios.get(url);
}

export function getPropertiesApi() {
    let url = env.MANAGE_API_URL + "/good/all-property-items?token=" + token + "&limit=-1";
    return axios.get(url);
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

export function saveProductApi(product) {
    let url = env.MANAGE_API_URL + "/good/create-good?token=" + token;
    let children;
    if (product.children.filter(child => child.check).length === 0) {
        children = null;
    } else children = JSON.stringify(product.children.filter(child => child.check));
    return axios.post(url, {
        name: product.name,
        code: product.code,
        description: product.description,
        price: product.price,
        avatar_url: product.avatar_url,
        sale_status: product.sale_status,
        highlight_status: product.highlight_status,
        display_status: product.display_status,
        manufacture_id: product.manufacture_id,
        good_category_id: product.good_category_id,
        images_url: JSON.stringify(product.images_url),
        children: children
    });
}

export function editProductApi(product) {
    let url = env.MANAGE_API_URL + "/good/" + product.id + "/edit?token=" + token;
    let children;
    if (product.children.filter(child => child.check).length === 0) {
        children = null;
    } else children = JSON.stringify(product.children.filter(child => child.check));
    return axios.put(url, {
        name: product.name,
        code: product.code,
        description: product.description,
        price: product.price,
        avatar_url: product.avatar_url,
        sale_status: product.sale_status,
        highlight_status: product.highlight_status,
        display_status: product.display_status,
        manufacture_id: product.manufacture_id,
        good_category_id: product.good_category_id,
        images_url: JSON.stringify(product.images_url),
        children: children
    });
}

export function importOrderApi(product) {
    let url = env.MANAGE_API_URL + "/order/delivery/" + product.id + "/import?token=" + token;
    return axios.post(url, {
        name: product.name,
        code: product.code,
        description: product.description,
        price: product.price,
        avatar_url: product.avatar_url,
        sale_status: product.sale_status,
        highlight_status: product.highlight_status,
        display_status: product.display_status,
        manufacture_id: product.manufacture_id,
        good_category_id: product.good_category_id,
        images_url: JSON.stringify(product.images_url),
        warehouse_id: product.warehouse_id
    });
}

export function loadProductApi(goodId) {
    let url = env.MANAGE_API_URL + `/good/${goodId}` + "?token=" + token;
    return axios.get(url);
}

export function deletePropertyApi(property) {
    let url = env.MANAGE_API_URL + "/good/delete-property-item/" + property.id + "?token=" + token;
    return axios.delete(url);
}

export function createPropertyApi(name) {
    let url = env.MANAGE_API_URL + "/good/create-property-item?token=" + token;
    return axios.post(url, {
        name: name
    });
}

export function deleteManufactureApi(manufacture) {
    let url = env.MANAGE_API_URL + "/v2/manufacture/" + manufacture.id + "?token=" + token;
    return axios.delete(url);
}

export function createManufactureApi(name) {
    let url = env.MANAGE_API_URL + "/v2/manufacture?token=" + token;
    return axios.post(url, {
        name: name
    });
}