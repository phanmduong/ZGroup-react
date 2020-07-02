import {NEW_MANAGE_API_URL} from '../../../constants/env';
import axios from 'axios';
import * as env from "../../../constants/env";
import {STATUS_REFS} from "../../../constants/constants";

export const loadClassesApi = (filter) => {
    let fields = ['start_date', 'end_date', 'staff_id', 'base_id', "enroll_start_date", "enroll_end_date", "course_id", "source_id", "campaign_id",'status_id','teaching_assistant_id','teacher_id'];
    let url = `${NEW_MANAGE_API_URL}/class/all?token=${localStorage.getItem('token')}`;
    fields.forEach(field => {
        url += `&${field}=${filter[field] || ''}`;
    });
    url += "&include=course,base,teaching_progress,target,exam_progress,lesson_event_comment_progress,teaching_replace_count,class_status,teacher,teacher_assistant";
    return axios.get(url);
};


export const getCourseActiveApi = () => {
    let url = `${NEW_MANAGE_API_URL}/course/all-active?token=${localStorage.getItem('token')}`;
    return axios.get(url);
};


export function getAllStatusesClass() {
    let url = `${env.NEW_MANAGE_API_URL}/statuses/all?ref=${STATUS_REFS["classes"]}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function analyticsClasses() {
    // let fields = [];
    let url = `${NEW_MANAGE_API_URL}/dashboard/analytic-by-teaching-status?token=${localStorage.getItem('token')}`;
    // fields.forEach(field => {
    //     url += `&${field}=${filter[field] || ''}`;
    // });
    return axios.get(url);
}


export function getAnalyticExam(course_id, classId = '', startDate = '', endDate = '') {
    //manageapi.keetool.xyz/course/category?&limit=&page=&token=
    let url = env.NEW_MANAGE_API_URL + `/exam/analytic?course_id=${course_id}&class_id=${classId}&include=group_exam,class,user_exams.user&start_time=${startDate}&end_time=${endDate}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function getAnalyticClassLessonEvent(course_id, classId = '', startDate = '', endDate = '') {
    //manageapi.keetool.xyz/course/category?&limit=&page=&token=
    let url = env.NEW_MANAGE_API_URL + `/class/analytic/event?course_id=${course_id}&class_id=${classId}&include=target,class_lesson.class_lesson_event.student_class_lesson_event,class_lesson.class_lesson_event.lesson_event,class_lesson.lesson.lesson_event,course&start_time=${startDate}&end_time=${endDate}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
