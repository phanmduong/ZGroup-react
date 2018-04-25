/**
 * Created by Kiyoshitaro on 15/04/2018.
 */
import axios from "axios";
import * as env from "../../../constants/env";


export function loadPostsApis(page = 1, search = "", category_id) {
    let url = env.MANAGE_API_URL + "/posts?search=" + search + "&page=" + page;
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }
    if (category_id) {
        url += "&category_id=" + category_id;
    }
    return axios.get(url);
}



export function uploadImage(file, completeHandler, error) {
    let url = env.API_URL + "/upload-image-froala";
    let formdata = new FormData();
    formdata.append("image", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.open("POST", url);
    ajax.send(formdata);
    ajax.addEventListener("error", error, false);
}

export function savePost(post, status) {
    let url = env.MANAGE_API_URL + "/save-post";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        description: post.description,
        product_content: post.content,
        tags_string: post.tags,
        categories: JSON.stringify(post.categories.map((category) => {return {"id" : category.value};} )),
        image_url: post.imageUrl,
        slug: post.slug,
        meta_title: post.meta_title,
        keyword: post.keyword,
        meta_description: post.meta_description,
        title: post.title,
        status: status,
        id: post.id,
        language_id : post.language_id,
    });
}


export function createCategory(catogory) {
    let url = env.MANAGE_API_URL + "/create-category";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: catogory.name,
    });
}
export function createLanguageApi(language) {
    let url = env.MANAGE_API_URL + "/language";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: language.name,
        encoding : language.encoding,
    });
}


export function loadCategoriesApi() {
    let url = env.MANAGE_API_URL + "/post/categories?";
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadLanguagesApi() {
    let url = env.MANAGE_API_URL + "/language/all?";
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deletePostApi(postId) {
    let url = env.MANAGE_API_URL + `/post/${postId}/delete`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

export function getPostApi(postId) {
    let url = env.MANAGE_API_URL + `/post/${postId}`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function changeStatusApi(id) {
    let url = env.MANAGE_API_URL + "/post/" + id + "/change-status";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}
