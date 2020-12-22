import axios from 'axios';
import * as env from '../../constants/env';


export function changeLinkDriver(classId, link) {
    //manageapi.keetool.xyz/class/1076/link-drive?token=
    let token = localStorage.getItem('token');
    let url = env.MANAGE_API_URL + "/class/" + classId + "/link-drive?token=" + token;
    return axios.put(url, {link_drive: link});
}

export function loadExcelData(genid) {
    //http://api.keetool.xyz/apiv2/gens/10/classes?token=
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/apiv2/gens/" + genid + "/classes?token=" + token;
    return axios.get(url);
}

export function loadGens() {
    let token = localStorage.getItem('token');
    // let url = env.API_URL + "/gens?token=" + token;
    let url = env.MANAGE_API_URL + "/gen/all?token=" + token;
    return axios.get(url);
}
export function loadCoursesApi() {
    let url = env.MANAGE_API_URL + "/course/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadClasses(filter) {
    let {search = '',
        page = '',
        teacherId = '',
        selectGenId = '',
        selectedBaseId = '',
        courseId = '',
        status = '',
        class_status = '',
        enroll_start_time = '',
        enroll_end_time = '',
        // lesson_start_time = '',
        // lesson_end_time = '',
        start_time = '',
        end_time = '',
        type = '',
        province_id = '',
    } = filter;

    let url = env.MANAGE_API_URL;
    switch (env.TYPE_API) {
        case 'alibaba':
            url += '/alibaba/class/all';
            break;
        default:
            url += "/class/all";
            break;
    }
    url += "?search=" + search +
        "&enroll_start_time=" + enroll_start_time +
        "&enroll_end_time=" + enroll_end_time +
        // "&lesson_start_time=" + lesson_start_time +
        // "&lesson_end_time=" + lesson_end_time +
        "&start_time=" + start_time +
        "&end_time=" + end_time +
        "&teacher_id=" + teacherId +
        "&course_id=" + courseId +
        "&province_id=" + province_id +
        "&page=" + page +
        "&type=" + type +
        "&status=" + status +
        "&class_status=" + class_status +
        "&gen_id=" + (selectGenId === 0 ? '' : selectGenId) +
        "&base_id=" + ((!selectedBaseId || selectedBaseId === 0) ? '' : selectedBaseId);
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteClass(classId) {
    let url = env.MANAGE_API_URL;
    switch (env.TYPE_API) {
        case 'alibaba':
            url += '/alibaba/class/delete';
            break;
        default:
            url += "/class/delete";
            break;
    }
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
        // 'date_end': classData.date_end,
        'enroll_start_date': classData.enroll_start_date,
        'enroll_end_date': classData.enroll_end_date,
        'name': classData.name,
        'schedule_id': classData.schedule_id,
        'room_id': classData.room_id,
        'description': classData.description,
        'link_drive': classData.link_drive,
        'gen_id': classData.gen_id,
        'target': classData.target,
        'regis_target': classData.regis_target,
        'course_id': classData.course_id,
        'teaching_assistant_id': classData.teacher_assis_id,
        'teacher_id': classData.teacher_id,
        'study_time': classData.study_time,
        'type': classData.type,
        'status': classData.status,
        'teachers': classData.teachers,
        'teaching_assistants': classData.teaching_assistants,

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

export function loadTeachers(classId) {
    let url = env.MANAGE_API_URL + `/class/teachers/${classId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadTeachingLessons(classLessonId, type) {
    let url;

    if (type === 1) {
        url = env.MANAGE_API_URL + `/class/teachers-lesson/${classLessonId}`;
    } else {
        url = env.MANAGE_API_URL + `/class/teaching-assistants-lesson/${classLessonId}`;
    }
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
export function saveStudentLessonEvent(lessonEventStudent) {
    let url = env.MANAGE_API_URL + `/class/save-student-lesson-event`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.post(url, {lessonEventStudent});
}
export function changeClassLessons(classLessons) {
    let url = env.MANAGE_API_URL + `/class/change-class-lessons`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, {classLessons});
}

export function changeTeachMultiLesson(data) {
    let url = env.MANAGE_API_URL + `/class/change-teach-multi-lesson`;

    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }


    return axios.put(url, data);
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
        'is_teacher_replace': classLesson.is_teacher_replace,
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
        'is_teaching_assistant_replace': classLesson.is_teaching_assistant_replace,
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

export function changeTeachingLesson(classLessonId, oldTeachingId, newTeachingId, note) {
    let url = env.MANAGE_API_URL + `/class/change-teaching-lesson`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            class_lesson_id: classLessonId,
            old_teaching_id: oldTeachingId,
            new_teaching_id: newTeachingId,
            note: note,
        });
}

export function updateClassLesson(classId) {
    let url = env.MANAGE_API_URL + `/class/generate-class-lesson/` + classId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function addCheckinCheckout(type, typeUser, userId, classLessonID, time, comment) {
    let url = env.MANAGE_API_URL + `/checkincheckout/add-check-in-checkout`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            type: type,
            type_user: typeUser,
            user_id: userId,
            class_lesson_id: classLessonID,
            time: time,
            comment: comment,
        });
}


export function inputExamScore(classId, data) {
    let url = env.MANAGE_API_URL + `/class/${classId}/score-input-exam`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, data);
}
