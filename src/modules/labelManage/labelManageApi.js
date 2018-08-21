import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllLabelsApi() {
    let url = env.MANAGE_API_URL + '/course/category';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function saveCategoryModal(category) {
    let edit = category.id ? ('/' + category.id) : '';
    let url = env.MANAGE_API_URL + '/course/category' + edit;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if (category.id)
        return axios.put(url, {
            name: category.name,
            short_description: category.short_description || ''
        });
    return axios.post(url, {
        name: category.name,
        short_description: category.short_description || ''
    });
}

export function deleteCategory(category) {
    let url = env.MANAGE_API_URL + '/course/category/' + category.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}
