import axios from 'axios';
import * as env from '../../constants/env';
import * as helper from '../../helpers/helper';
import {TIME_FORMAT_H_M, FULLTIME_FORMAT} from '../../constants/constants';

export function loadWorkShiftSessions() {
    let url = env.MANAGE_API_URL + `/work-shift/work-shift-session/all`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function createWorkWorkShiftSession(shiftSession) {
    let url = env.MANAGE_API_URL + `/work-shift/work-shift-session/create`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: shiftSession.name,
        active: Number(shiftSession.active),
        start_time: helper.formatTime(shiftSession.start_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], FULLTIME_FORMAT),
        end_time: helper.formatTime(shiftSession.end_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], FULLTIME_FORMAT)
    });
}

export function editWorkWorkShiftSession(shiftSession) {
    let url = env.MANAGE_API_URL + `/work-shift/work-shift-session/${shiftSession.id}/edit`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        name: shiftSession.name,
        active: Number(shiftSession.active),
        start_time: helper.formatTime(shiftSession.start_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], FULLTIME_FORMAT),
        end_time: helper.formatTime(shiftSession.end_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], FULLTIME_FORMAT)
    });
}

export function deleteWorkShiftSession(shiftSessionId) {
    let url = env.MANAGE_API_URL + `/work-shift/work-shift-session/${shiftSessionId}/delete`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}