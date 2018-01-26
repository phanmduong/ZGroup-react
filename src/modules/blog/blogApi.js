import axios from 'axios';
import * as env from '../../constants/env';

export function uploadImage(file, completeHandler, error) {
    let url = env.API_URL + '/upload-image-froala';
    let formdata = new FormData();
    formdata.append('image', file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
    ajax.addEventListener("error", error, false);
}

export function savePost(post, status) {
    let url = env.MANAGE_API_URL + "/save-post";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        description: post.description,
        product_content: post.content,
        tags_string: post.tags,
        category_id: post.category,
        image_url: post.imageUrl,
        title: post.title,
        status: status,
        id: post.id
    });
}

export function loadCategories() {
    let url = env.API_URL + "/product-categories";
    return axios.get(url);
}

export function createCategory(catogory) {
    let url = env.MANAGE_API_URL + '/create-category';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: catogory.name
    });
}

export function getPosts(page = 1, search = '',category_id) {
    let url = env.MANAGE_API_URL + "/posts?search=" + search + "&page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if(category_id){
        url += "&category_id=" + category_id;
    }
    return axios.get(url);
}
export function getCategoriesApi() {
    let url = env.MANAGE_API_URL + "/post/categories?" ;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deletePost(postId) {
    let url = env.MANAGE_API_URL + `/post/${postId}/delete`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function getPost(postId) {
    let url = env.MANAGE_API_URL + `/post/${postId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeStatusApi(id) {
    let url = env.MANAGE_API_URL + "/post/"+id+"/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}