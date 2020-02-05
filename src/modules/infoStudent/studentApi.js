import axios from 'axios';
import * as env from '../../constants/env';


export function createSource(source) {
    let url = env.MANAGE_API_URL + `/source/create`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,source);
}
export function loadSources() {
    let url = env.MANAGE_API_URL + `/source/all`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
export function deleteSource(source) {
    let url = env.MANAGE_API_URL + `/source/delete`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {id: source.id});
}
export function assignSource(source, student) {
    let url = env.MANAGE_API_URL + `/source/assign`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {source_id: source.id, user_id:student.id});
}

export function loadRegisters(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/registers`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
export function createStatuses(status) {
    let url = env.NEW_MANAGE_API_URL + '/statuses/create';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        ...status
    });
}
export function assignStatuses(status, refId, statusRef) {
    let url = env.NEW_MANAGE_API_URL + '/statuses/assign';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: refId,
        statusRef,
        status_id: status.id,
    });
}

export function deleteStatuses() {

}

export function loadStatuses(statusRef) {
    let url = env.NEW_MANAGE_API_URL + `/statuses/all`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    url += '&ref=' + statusRef;

    return axios.get(url);
}

export function loadInfoStudent(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function historyCalls(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/history-calls`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function historyCollectMoney(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/history-collect-money`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadLogs(studentId, page = 1) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/logs?page=${page}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}
export function loadStudentCareHistory(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/history-cares`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function loadProgress(studentId) {
    let url = env.MANAGE_API_URL + `/student/${studentId}/progress`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function editStudent(student) {
    let url = env.MANAGE_API_URL + `/student/${student.id}/edit`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: student.id,
        name: student.name,
        email: student.email,
        phone: student.phone,
        gender: student.gender,
        dob: student.dob,
        university: student.university,
        work: student.work,
        how_know: student.how_know,
        facebook: student.facebook,
        description: student.description,
        address: student.address,
    });
}
export function changePassword(studentId, newPassword) {
    let url = env.MANAGE_API_URL + '/change-password-student';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: studentId,
        new_password: newPassword,
    });
}
export function refundStudent(data) {
    let url = env.MANAGE_API_URL + `/student/${data.student_id}/refund`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}
export function createHistoryCareRegister(data) {
    let url = env.MANAGE_API_URL + `/student/${data.student_id}/create-history-care`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, data);
}

export function uploadImage(file, completeHandler, id, imageField) {
    let url = env.MANAGE_API_URL + "/upload-image-user";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    let formdata = new FormData();
    formdata.append(imageField, file);
    formdata.append("id", id);
    formdata.append("image", imageField);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
}