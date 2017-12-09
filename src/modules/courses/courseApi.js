import axios    from 'axios';
import * as env from '../../constants/env';

export function loadCoursesData(page=1,query='') {

    let url     = env.MANAGE_API_URL + "/v2/course/get-all";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token="   + token +
                "&page="    + page  +
                '&search='  + query +
                '&limit=10';
    }
    return axios.get(url);
}


export function loadCourse(id) {
    let url = env.MANAGE_API_URL + "/v2/course/get-detailed/" + id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
    //http://manageapi.keetool.tk/v2/course/get-detailed/1?token=
}

export function createLink(data) {
    let url = env.MANAGE_API_URL + "/v2/course/create-link";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
    //http://manageapi.keetool.tk/v2/course/create-link?token=
}
export function editLink(data) {
    let url = env.MANAGE_API_URL + "/v2/course/edit-link/" + data.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, data);
    //http://manageapi.keetool.tk/v2/course/create-link?token=
}

export function deleteLesson(id) {
    let url = env.MANAGE_API_URL + "/v2/lesson/delete-lesson/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id+"?token=" + token;
    }
    return axios.delete(url);
    //manageapi.keetool.tk/v2/lesson/delete-lesson/{lessonId}?token=
}
export function deleteLink(id) {
    let url = env.MANAGE_API_URL + "/v2/course/delete-link/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id+"?token=" + token;
    }
    return axios.delete(url);
    //http://manageapi.keetool.tk/v2/course/delete-link/{link_id}?token=
}

export function createEditCourse(data) {
    let url = env.MANAGE_API_URL + "/v2/course/create-edit";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
    //http://manageapi.keetool.tk/v2/course/create-edit?token=
}

export function deleteCourse(courseId) {
    //http://manageapi.keetool.tk/v2/course/delete/{course_id}?token=
    let url = env.MANAGE_API_URL + "/v2/course/delete/";
    let token = localStorage.getItem('token');
    if (token) {
        url += +courseId + "?token=" + token;
    }
    return axios.delete(url);
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

