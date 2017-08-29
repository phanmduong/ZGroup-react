import axios from 'axios';
import * as env from '../../constants/env';


export function getRegisterStudent(page = 1, genId, search = '', salerId = '') {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/register-list?page=" + page + "&gen_id=" + genId + "&search=" + search + "&saler_id=" + salerId + "&token=" + token;
    return axios.get(url);
}

export function loadGens() {
    let token = localStorage.getItem('token');
    let url = env.API_URL + "/gens?token=" + token;
    return axios.get(url);
}

export function historyCallStudent(studentId, registerId) {
    let token = localStorage.getItem('token');
    let url = `${env.MANAGE_API_URL}/history-call-student?id=${studentId}&register_id=${registerId}&token=${token}`;
    return axios.get(url);
}

export function changeCallStatusStudent(callStatus, studentId, telecallId, genId = '', note = '', callerId = '') {
    let url = env.MANAGE_API_URL + "/change-call-status-student";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
            student_id: studentId,
            telecall_id: telecallId,
            gen_id: genId,
            caller_id: callerId,
            note: note,
            status: callStatus
        }
    );
}

export function deleteRegisterStudent(registerId) {
    let url = env.MANAGE_API_URL + "/delete-register-student";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
            register_id: registerId
        }
    );
}