/**
 * Created by phanmduong on 4/6/17.
 */
// import axios from 'axios';
import * as env from '../../constants/env';


export function uploadFile(index = 0, file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + '/file/upload';
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append('file', file);
    formData.append('index', index);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}