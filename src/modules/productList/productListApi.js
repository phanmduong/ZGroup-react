import axios from 'axios';

export function getProductsApi() {
    let token = localStorage.getItem('token');
    let url = "http://manageapi.graphics.vn/goods/good-all?token=" + token;
    return axios.get(url);
}

export function updatePriceApi(productEditing) {
    let token = localStorage.getItem('token');
    let url = "http://manageapi.graphics.vn/good/" + productEditing.id + "/update-price?token=" + token;
    return axios.put(url, {
        price: productEditing.price
    });
}