import axios from 'axios';
import * as env from '../../constants/env';

export function loadCoursesData(page = 1, query = '', only_children = false, is_parent = '') {

    let url = env.MANAGE_API_URL + "/v2/course/get-all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token +
            "&page=" + page +
            '&search=' + query +
            '&only_children=' + only_children +
            '&is_parent=' + is_parent +
            '&limit=20';
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
        url += id + "?token=" + token;
    }
    return axios.delete(url);
    //manageapi.keetool.tk/v2/lesson/delete-lesson/{lessonId}?token=
}

export function createLessonEvent(lesson_id, type) {
    let url = env.MANAGE_API_URL + "/v2/lesson/create-lesson-event";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {lesson_id, type});
}

export function deleteLink(id) {
    let url = env.MANAGE_API_URL + "/v2/course/delete-link/";
    let token = localStorage.getItem('token');
    if (token) {
        url += id + "?token=" + token;
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
    // let categories = JSON.stringify(data.categories.map(obj => { return ({id: obj.id});}));
    let categories = JSON.stringify(data.categories ? [{id: data.categories.id}] : []);
    data = {
        ...data,
        categories,
        exam_templates: [],
        group_exams: [],
        lessons: [],
        terms: [],
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

export function storeParentCourse(data) {
    //http://manageapi.keetool.xyz/v2/lesson/term/create?token=
    let url = env.NEW_MANAGE_API_URL + "/course/parent-course";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}

export function getParentCourses() {
    //manageapi.keetool.xyz/course/type?token=
    let url = env.NEW_MANAGE_API_URL + "/course/parent-courses";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function createMultiLesson(data) {
    //http://manageapi.keetool.xyz/v2/lesson/term/create?token=
    let url = env.NEW_MANAGE_API_URL + "/lesson/create-multi";
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

export function editTerm(data) {
    //http://manageapi.keetool.xyz/v2/lesson/term/1/edit?token=
    let url = env.MANAGE_API_URL + "/v2/lesson/term/" + data.id + "/edit";
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
    let url = env.MANAGE_API_URL + "/v2/course/" + course.id + "/change-status";
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


export function createCategory(data) {
    //manageapi.keetool.xyz/course/category?&limit=&page=&token=
    let url = env.MANAGE_API_URL + "/course/category";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}

export function editCategory(data) {
    //manageapi.keetool.xyz/course/category?&limit=&page=&token=
    let url = env.MANAGE_API_URL + "/course/category/" + data.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, data);
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

export function changeOrderCourse(course, order_number) {
    let url = env.MANAGE_API_URL + "/v2/course/" + course.id + "/change-order";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {order_number});
}

export function changeTermLesson(lessonId, termId) {
    let url = env.MANAGE_API_URL + "/v2/course/lesson/edit-term/" + lessonId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        "term_id": termId,
    });
}

export function createLesson(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.MANAGE_API_URL + "/v2/lesson/create-lesson/";
    let token = localStorage.getItem('token');
    if (token) {
        url += data.course_id + "?token=" + token;
    }
    return axios.post(url, {
        name: data.name,
        description: data.description,
        course_id: data.course_id,
        detail: data.detail,
        order: data.order,
        term_id: data.term_id,
        detail_content: data.detail_content,
        detail_teacher: data.detail_teacher,
        image_url: data.image_url,
        audio_url: data.audio_url,
        video_url: data.video_url,

    });
}

export function createExamTemplate(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.NEW_MANAGE_API_URL + "/exam/template/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: data.name,
        title: data.title,
        description: data.description,
        avatar_url: data.avatar_url,
        course_id: data.course_id,
        lesson_id: data.lesson_id,
        deadline: data.deadline,
        order: data.order,
        weight: data.weight,
        group_exam_id: data.group_exam_id

    });
}

export function editExamTemplate(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.NEW_MANAGE_API_URL + "/exam/template/" + data.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        name: data.name,
        title: data.title,
        description: data.description,
        avatar_url: data.avatar_url,
        lesson_id: data.lesson_id,
        deadline: data.deadline,
        order: data.order,
        weight: data.weight,
        group_exam_id: data.group_exam_id

    });
}

export function deleteExamTemplate(template_id) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.NEW_MANAGE_API_URL + "/exam/template/" + template_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function createGroupExam(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.NEW_MANAGE_API_URL + "/exam/group/create";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: data.name,
        description: data.description,
        course_id: data.course_id,
        order: data.order,
    });
}

export function editGroupExam(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.NEW_MANAGE_API_URL + "/exam/group/" + data.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        name: data.name,
        description: data.description,
        order: data.order,
    });
}

export function duplicateExamTemplate(data) {
    //manageapi.homestead.app/v2/lesson/create-lesson/{courseId}?token=
    let url = env.NEW_MANAGE_API_URL + "/exam/template/" + data.id + "/duplicate";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
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

export function getClassesByCourse(course_id) {
    //manageapi.keetool.xyz/course/category?&limit=&page=&token=
    let url = env.NEW_MANAGE_API_URL + `/class/by-course/${course_id}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}