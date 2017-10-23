import axios from 'axios';
import * as env from '../../constants/env';

export function loadCategoriesDataAPI() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/category/all' ;
    if (token){
        url += '?token=' + token;
    }
    return axios.get(url);
}