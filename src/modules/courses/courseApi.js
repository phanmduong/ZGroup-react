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
    let categories = JSON.stringify(data.categories.map(obj => { return ({id: obj.id});}));
    data = {
        ...data,
        categories,
    };
    return axios.post(url, data);
    //http://manageapi.keetool.tk/v2/course/create-edit?token=
}

export function deleteCourse(courseId) {
    //http://manageapi.keetool.tk/v2/course/delete/{course_id}?token=
    let url = env.MANAGE_API_URL + "/v2/course/delete/";
    let token = localStorage.getItem('token');
    if (token) {
        url += courseId + "?token=" + token;
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

export function createPixel(courseId, data) {
    let url = env.MANAGE_API_URL + "/course/" + courseId + "/pixel";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}

export function createTerm(data) {
    //http://manageapi.keetool.xyz/v2/lesson/term/create?token=
    let url = env.MANAGE_API_URL + "/v2/lesson/term/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}

export function editPixel(pixelId, data) {
    let url = env.MANAGE_API_URL + "/course/pixel/" + pixelId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, data);
}
export function editTerm( data) {
    //http://manageapi.keetool.xyz/v2/lesson/term/1/edit?token=
    let url = env.MANAGE_API_URL + "/v2/lesson/term/" + data.id +"/edit";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, data);
}

export function deletePixel(pixelId) {
    let url = env.MANAGE_API_URL + "/course/pixel/" + pixelId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}
export function deleteTerm(termId) {
    let url = env.MANAGE_API_URL + "/v2/lesson/term/" + termId + "/delete";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function changeStatusCourse(course) {
    //http://manageapi.keetool.xyz/v2/course/1/change-status?token=
    let url = env.MANAGE_API_URL + "/v2/course/"+ course.id +"/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {status: !course.status});
}
export function loadAllTypes() {
    //manageapi.keetool.xyz/course/type?token=
    let url = env.MANAGE_API_URL + "/course/type";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    return axios.get(url);
}
export function loadAllCategories() {
    //manageapi.keetool.xyz/course/category?&limit=&page=&token=
    let url = env.MANAGE_API_URL + "/course/category";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token + "&limit=-1";
    }
    return axios.get(url);
}


export function duplicateCourse(id) {
    let url = env.MANAGE_API_URL + "/v2/course/" + id + "/duplicate";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function duplicateLesson(id) {
    let url = env.MANAGE_API_URL + "/v2/lesson/" + id + "/duplicate";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function duplicateTerm(id) {
    let url = env.MANAGE_API_URL + "/v2/lesson/term/" + id + "/duplicate";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function changeOrderCourse(course,order_number) {
    let url = env.MANAGE_API_URL + "/v2/course/"+ course.id +"/change-order";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {order_number});
}

export function changeTermLesson(lessonId,termId){
    let url = env.MANAGE_API_URL + "/v2/course/lesson/edit-term/"+lessonId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        "term_id": termId,
    });
}