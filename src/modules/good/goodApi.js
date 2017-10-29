/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';

export function loadGoods(type = null) {
    let url = env.MANAGE_API_URL + "/good/all/no-paging?type=" + type;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if (type) {
        url += "&type=" + type;
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

export function saveGood(good) {
    let url = env.MANAGE_API_URL + "/good/create";
    const token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, good);
}

export function loadGood(goodId) {
    let url = env.MANAGE_API_URL + `/good/${goodId}`;

    const token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function addUrl(fileUrl) {
    let url = env.MANAGE_API_URL + "/file/url";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        url: fileUrl
    });
}

export function loadGoodPropertyItems(page = 1, query = null, type = "") {
    let url = env.MANAGE_API_URL + "/good/all-property-items?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }

    if (type) {
        url += "&type=" + type;
    }

    return axios.get(url);
}

export function deletePropertyItem(id) {
    let url = env.MANAGE_API_URL + `/good/delete-property-item/${id}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function saveGoodProperty(property) {
    let url = env.MANAGE_API_URL + "/good/create-property-item";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, property);
}

export function addPropertyItemsToTask(goodPropertyItems, taskId, currentBoard, targetBoard) {
    let url = env.MANAGE_API_URL + `/good/add-property-item-task/${taskId}`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        good_property_items: JSON.stringify(goodPropertyItems),
        current_board_id: currentBoard ? currentBoard.id : 0,
        target_board_id: targetBoard ? targetBoard.id : 0
    });
}

export function loadGoodPropertyItem(id) {
    let url = env.MANAGE_API_URL + `/good/property-item/${id}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}


export function loadAllGoodPropertyItems(type) {
    let url = env.MANAGE_API_URL + `/good/task-setting?type=${type}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function saveGoodProperties(goodId, goodProperties) {
    let url = env.MANAGE_API_URL + `/good/${goodId}/save-good-properties`;
    const token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {good_properties: JSON.stringify(goodProperties)});
}
