import axios from 'axios';
import * as env from '../../constants/env';

// Api get all http://keetool3.xyz/manageapi/v3/v2/product-category?page=1&token=
export function loadAllBlogTypeApi(page) {
    let url = env.MANAGE_API_URL + '/v2/product-category';
    let token = localStorage.getItem('token');
    if (page) {
        url += "?page=" + page;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

// Api Post http://keetool3.xyz/manageapi/v3/v2/product-category?token=
export function saveBlogTypeApi(blogType) {
    let url = env.MANAGE_API_URL + "/v2/product-category";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, blogType);
}

//  API EDIT http://keetool3.xyz/manageapi/v3/v2/product-category/{id}?token=
export function editBlogTypeApi(blogType) {
    let url = env.MANAGE_API_URL + "/v2/product-category/" + blogType.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, blogType);
}

// API DEL http://keetool3.xyz/manageapi/v3/v2/product-category/{id}?&token=
export function delBlogTypeApi(blogType) {
    let url = env.MANAGE_API_URL + "/v2/product-category/" + blogType.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url, blogType);
}
