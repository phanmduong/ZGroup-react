import axios from 'axios';

export function getProductsApi() {
    let token = localStorage.getItem('token');
    let url = "http://manageapi.graphics.vn/goods/good-all?token=" + token;
    return axios.get(url);
}