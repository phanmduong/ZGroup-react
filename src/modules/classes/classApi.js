import axios from 'axios';
import * as env from '../../constants/env';

export function loadClasses(search, page = 1, teacherId = '') {
    let url = env.MANAGE_API_URL + "/class/all?search=" + search + "&teacher_id=" + teacherId + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteClass(classId) {
    let url = env.MANAGE_API_URL + "/class/delete";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        'class_id': classId
    });
}

export function duplicateClass(classId) {
    let url = env.MANAGE_API_URL + "/class/duplicate/" + classId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeClassStatus(classId) {
    let url = env.MANAGE_API_URL + `/class/change-status`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'class_id': classId
    });
}

export function infoCreateClass() {
    let url = env.MANAGE_API_URL + "/class/info-create-class";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function addClass(classData) {
    let url = env.MANAGE_API_URL + `/class/store-class`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        'id': classData.id,
        'datestart': classData.datestart,
        'name': classData.name,
        'schedule_id': classData.schedule_id,
        'room_id': classData.room_id,
        'description': classData.description,
        'gen_id': classData.gen_id,
        'target': classData.target,
        'regis_target': classData.regis_target,
        'course_id': classData.course_id,
        'teaching_assistant_id': classData.teacher_assis_id,
        'teacher_id': classData.teacher_id,
        'study_time': classData.study_time,

    });
}

export function loadClass(classId) {
    let url = env.MANAGE_API_URL + `/class/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function changeClassLesson(classLesson) {
    let url = env.MANAGE_API_URL + `/class/change-class-lesson`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {
        'id': classLesson.id,
        'note': classLesson.note,
        'time': classLesson.time,
    });
}

export function changeTeacher(classLesson) {
    let url = env.MANAGE_API_URL + `/class/change-teacher`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {
        'id': classLesson.id,
        'staff_id': classLesson.staffId,
        'note': classLesson.note,
    });
}

export function changeTeachingAssistant(classLesson) {
    let url = env.MANAGE_API_URL + `/class/change-teaching-assistant`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {
        'id': classLesson.id,
        'staff_id': classLesson.staffId,
        'note': classLesson.note,
    });
}

export function loadStaffs() {
    let url = env.MANAGE_API_URL + `/class/staffs`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}