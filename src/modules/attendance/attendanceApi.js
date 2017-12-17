import axios from 'axios';
import * as env from '../../constants/env';

export function loadClasses(search='', page = 1, teacherId = '', baseid='' , genid='') {
    // &base_id=&gen_id=
    let url = env.MANAGE_API_URL + "/class/all?search=" + search
        + "&teacher_id=" + teacherId
        + "&page=" + page
        + "&base_id="+ baseid
        + "&gen_id=" + genid;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadClassLessonModal(id) {
    //http://api.keetool.xyz/apiv2/class/555/attendance/lessons?token=
    let url = env.API_URL + "/apiv2/class/" + id + "/attendance/lessons";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadClassInfo(id) {
    //http://manageapi.keetool.xyz/class/914?token=
    let url = env.MANAGE_API_URL + "/class/" + id ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function loadLessonDetailModal(classid , lessonid) {
    //http://manageapi.keetool.xyz/v2/course/get-attendance-lesson/120/1?token=
    let url = env.MANAGE_API_URL + "/v2/course/get-attendance-lesson/" + classid + "/" + lessonid;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function takeAttendance(data) {
    //http://manageapi.keetool.xyz/v2/course/change-attendances?token=
    let res = data.map((obj)=>{
        return {
            "attendance_id" : obj.attendance_id,
            "attendance_lesson_status" : obj.attendance_lesson_status,
            "attendance_homework_status" : obj.attendance_homework_status,
            "note" : obj.note ? obj.note : ''
        };
    });
    let url = env.MANAGE_API_URL + "/v2/course/change-attendances";
    let token = localStorage.getItem('token');

    if (token) {
        url += "?token=" + token;
    }
    res = JSON.stringify(res);
    return axios.post(url, {attendances : res});
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