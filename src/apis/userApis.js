import axios from 'axios';
import * as env from '../constants/env';

export function editChoiceProvinceApi(provinceId) {
    let url = env.NEW_MANAGE_API_URL + "/user/staff/choice-province";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        choice_province_id: provinceId
    });
}