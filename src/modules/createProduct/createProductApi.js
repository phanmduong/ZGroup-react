import axios from 'axios';
import * as env from '../../constants/env';

export function getCategoriesApi() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/order/category/all?token=" + token;
    return axios.get(url);
}

export function getManufacturesApi() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + "/good/manufactures?token=" + token;
    return axios.get(url);
}

export function changeAvatarApi(file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + '/file/upload';
    const token = localStorage.getItem('token');
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