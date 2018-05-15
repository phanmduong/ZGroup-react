import axios from 'axios';
import * as env from '../../constants/env';
import * as helper from '../../helpers/helper';
import {TIME_FORMAT_H_M, FULLTIME_FORMAT} from '../../constants/constants';

export function loadShiftSessions() {
    let url = env.MANAGE_API_URL + `/shift-registers/shift-sessions`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.get(url);
}

export function storeShiftSession(shiftSession) {
    let url = env.MANAGE_API_URL + `/shift-registers/store-shift-session`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        id: shiftSession.id,
        name: shiftSession.name,
        active: Number(shiftSession.active),
        start_time: helper.formatTime(shiftSession.start_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], FULLTIME_FORMAT),
        end_time: helper.formatTime(shiftSession.end_time, [TIME_FORMAT_H_M, FULLTIME_FORMAT], FULLTIME_FORMAT)
    });
}

export function deleteShiftSession(shiftSessionId) {
    let url = env.MANAGE_API_URL + `/shift-registers/shift-session/${shiftSessionId}/delete`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}