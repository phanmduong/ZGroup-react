/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';

export function loadGoods(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/good/all?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}