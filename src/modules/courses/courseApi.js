import axios from 'axios';
import * as env from '../../constants/env';

export function loadCoursesData(page=1) {

    let url = env.MANAGE_API_URL + "/v2/course/get-all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&page=" + page;
    }
    return axios.get(url);
}
//http://manageapi.keetool.tk/v2/course/get-detailed/1?token=
export function loadCourse(id) {
    let url = env.MANAGE_API_URL + "/v2/course/get-detailed/" + id;
    let token = localStorage.getItem('token');
    if(token){
        url += "?token=" +token;
    }
    return axios.get(url);
}

export function uploadImage(file, completeHandler, error) {
    let url = env.API_URL + '/upload-image-froala';
    let formdata = new FormData();
    formdata.append('image', file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
    ajax.addEventListener("error", error, false);
}

