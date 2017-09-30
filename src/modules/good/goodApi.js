/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';

export function loadGoods(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/good/all?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function uploadAvatar(file, completeHandler, progressHandler, error) {
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