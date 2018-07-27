/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';

export function deleteBase(base) {
    let url = env.MANAGE_API_URL + "/base/delete/" + base.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function loadBases(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/v2/base?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadBase(baseId) {
    let url = env.MANAGE_API_URL + "/v2/base/" + baseId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function setDefaultBase(baseId) {
    let url = env.MANAGE_API_URL + "/set-default-base/" + baseId;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function createBase(base) {
    let url = env.MANAGE_API_URL + "/v2/base";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: base.name,
        address: base.address,
        district_id: base.district.id,
        latitude: base.latitude,
        images_url: base.images_url,
        avatar_url: base.avatar_url,
        description: base.description ? base.description : "",
        center: base.center,
        longtitude: base.longitude,
        display_status: base.display_status,
        basic_info: base.basic_info,
    });
}

export function editBase(base) {
    let url = env.MANAGE_API_URL + "/v2/base/" + base.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        name: base.name,
        address: base.address,
        district_id: base.district.id,
        latitude: base.latitude,
        images_url: base.images_url,
        avatar_url: base.avatar_url,
        description: base.description ? base.description : "",
        center: base.center,
        longtitude: base.longitude,
        display_status: base.display_status,
        basic_info: base.basic_info,
    });
}

export function getAllProvinces() {
    let url = env.MANAGE_API_URL + "/province/all";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function uploadImage(file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + "/file/upload-image";
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

export function changeAvatarApi(file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + '/file/upload';
    let token = localStorage.getItem('token');
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