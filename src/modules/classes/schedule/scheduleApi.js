import axios from 'axios';
import {NEW_MANAGE_API_URL} from "../../../constants/env";


export function createScheduleApi(name, study_sessions = []) {
    let token = localStorage.getItem('token');
    let url = NEW_MANAGE_API_URL + "/schedule/create?token=" + token;
    return axios.post(url, {
        name: name,
        study_sessions: study_sessions
    });
}