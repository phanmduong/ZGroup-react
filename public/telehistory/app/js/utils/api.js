import axios from 'axios';
import {BASE_URL} from '../const';

export default {
    getTelecalls(page = 1){
        let user_id = "";
        if (window.user_id) {
            user_id = window.user_id;
        }
        return axios.get(BASE_URL + "/manage/get_telecalls_list?user_id=" + user_id + "&page=" + page);
    },
    call(studentId){
        return axios.get(BASE_URL + "/manage/call_student?id=" + studentId);
    },
    callSuccess(studentId, telecall_id, note){
        const data = {
            status: 1,
            id: studentId,
            telecall_id,
            note,
            _token: window.csrfToken
        };
        return axios.post(BASE_URL + '/manage/ajaxchangecallstatus', data);
    },
    callFail(studentId, telecall_id, note){
        const data = {
            status: 0,
            id: studentId,
            telecall_id,
            note,
            _token: window.csrfToken
        };
        return axios.post(BASE_URL + '/manage/ajaxchangecallstatus', data);
    }
}