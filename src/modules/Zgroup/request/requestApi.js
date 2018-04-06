import axios    from 'axios';
import * as env from '../../../constants/env';

export function createRequestVacation(data) {
    //http://manageapi.keetool.xyz/good/all/no-paging?token=
    let url     = env.MANAGE_API_URL +"/administration/request-vacation";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    let res = {
        staff_id: data.staff.id,
        start_time: data.start_time,
        end_time: data.end_time,
        request_date: data.request_date,
        type: data.type,
        reason: data.reason,
    };
    return axios.post(url, res);
}