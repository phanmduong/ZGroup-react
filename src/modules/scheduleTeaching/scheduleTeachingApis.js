/**
 * Created by Kiyoshitaro on 04/05/18.
 */


import axios from "axios";
import * as env from "../../constants/env";

export  function loadClassesApi(genId,baseId){
    let url = env.MANAGE_API_URL + "/class/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    url += `&gen_id=${genId}`;
    url += `&base_id=${baseId}`;
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