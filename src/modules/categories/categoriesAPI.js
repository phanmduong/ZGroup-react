import axios from 'axios';
import * as env from '../../constants/env';


export function loadCategoriesDataAPI() {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/category/all';
    if (token) {
        url += '?token=' + token;
    }
    return axios.get(url);
}

export function addCategoryAPI(name, parent_id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/category/add';
    if (token) {
        url += '?token=' + token;
    }
    return axios.post(url, {
        'name': name,
        'parent_id': parent_id,
    });
}

export function deleteCategoryAPI(id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/category/' + id + '/delete';
    if (token) {
        url += '?token=' + token;
    }
    return axios.delete(url);
}

export function editCategoryAPI(id, name) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/category/edit-category';
    if (token) {
        url += '?token=' + token;
    }
    return axios.put(url,
        {
            'id': id,
            'name': name,
        }
    );
}
