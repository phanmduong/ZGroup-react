import axios    from 'axios';
import * as env from '../../constants/env';

export function loadLessonDetail(lessonId) {
    //manageapi.keetool.xyz/v2/lesson/get-detail-lesson/34?token=
    let url     = env.MANAGE_API_URL + "/v2/lesson/get-detail-lesson/";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  lessonId + "?token=" + token;
    }
    return axios.get(url);
}


export function commitLesson(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.MANAGE_API_URL + "/v2/lesson/create-lesson/";
    let token = localStorage.getItem('token');
    if (token) {
        url += data.course_id + "?token=" + token;
    }
    return axios.post(url, data);
}

