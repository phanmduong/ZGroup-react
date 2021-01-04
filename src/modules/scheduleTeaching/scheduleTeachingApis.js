/**
 * Created by Kiyoshitaro on 04/05/18.
 */


import axios from "axios";
import * as env from "../../constants/env";
import {NEW_MANAGE_API_URL} from "../../constants/env";
export function findUser(search,is_staff) {
    let url = NEW_MANAGE_API_URL + "/user/find-by-name";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&search=' +search;
    url += '&is_staff=' +(is_staff || '');
    return axios.get(url,);
}
export  function loadClassesApi({
                                    // gen_id,
                                    base_id,
                                    course_id,
                                    teacher_id,
                                    province_id,
                                    type,
                                    // lesson_start_time,
                                    // lesson_end_time,
                                    room_id,
}){
    let url = env.MANAGE_API_URL + "/class/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    // url += `&gen_id=${gen_id|| ''}`;
    url += `&base_id=${base_id|| ''}`;
    url += `&course_id=${course_id|| ''}`;
    url += `&teacher_id=${teacher_id|| ''}`;
    url += `&province_id=${province_id|| ''}`;
    url += `&room_id=${room_id|| ''}`;
    url += `&type=${type|| ''}`;
    // url += `&lesson_start_time=${lesson_start_time|| ''}`;
    // url += `&lesson_end_time=${lesson_end_time|| ''}`;
    url += `&limit=-1`;
// &teacher_id=${localStorage.getItem("user").id}
    return axios.get(url);
}
export function loadClass(classId) {
    let url = env.MANAGE_API_URL + `/class/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}


export function loadGens() {
    let url = env.MANAGE_API_URL + "/gen/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
export function loadBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}