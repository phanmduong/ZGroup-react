import axios from "axios";
import * as env from "../../../constants/env";


export function loadPostsApis(page = 1, search = "", category_id, kind = '') {
    let url = env.MANAGE_API_URL + "/posts?search=" + search + "&page=" + page + "&kind=" + kind + "&limit=" + 5;
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

export const savePostV2 = (post, status) => {
    let url = env.MANAGE_API_URL + "/post";
    let token = localStorage.getItem("token");

    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        ...post,
        status,
        product_content: post.content
    });
};


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
        categories: JSON.stringify(post.categories.map((category) => { return { "id": category.value }; })),
        image_url: post.imageUrl,
        slug: post.slug,
        meta_title: post.meta_title,
        keyword: post.keyword,
        meta_description: post.meta_description,
        title: post.title,
        status: status,
        id: post.id,
        language_id: post.language_id,
        kind: post.kind,
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
        encoding: language.encoding,
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

export function loadFacebookStatistic(data) {
    //https://graph.facebook.com/?fields=og_object%7Blikes.summary(total_count).limit(0)%7D,share&id=https://colorme.vn/blog/ui-va-ux-khac-nhau-the-nao-49508
    //https://graph.facebook.com/v3.2/?access_token=EAADr6ZCeqhv8BANJgxvrej0MkuhE51nvpdZBy4IsF8fi7vvMBl3oaqjBw2vstFyjLO2xbxQ0qs9HZCGxmlQFY11oZCUxZCUzqL2Wyoz4p6AYy0dbezZBivcxaSuRvbJo7Xz0sghJGMIgUVT9XevZAuyc9T22dxFqTNIqywxp9E21jBIh1nNfsNRTMl282uSN70ZD&debug=all&fields=engagement&format=json&method=get&pretty=0&suppress_http_code=1&ids=
    // let url = "https://graph.facebook.com/?fields=og_object%7Blikes.summary(total_count).limit(0)%7D,share&ids=";
    // let access_token = "EAADr6ZCeqhv8BALmhiC3ck3bJO8ZAjlOXNAs4DQSI7206QwHFtZBFZC0KFI4mZBTbxM2v8n7AJldDaZAZA9nJ601iHjsG4rP9HQv92uPtIcMCHP3ehZBKdZA8g0vCyvnAI8MmBylMwgKoERWoZBWgeYV70glvt2dT2k5IZD";
    // let access_token = "259398704989951|OqAhnC6jKJZTYHN-6NzmPa_b2RM";
    let access_token = "259398704989951|OqAhnC6jKJZTYHN-6NzmPa_b2RM";
    let url = "https://graph.facebook.com/v3.2/?access_token="+ access_token +"&debug=all&fields=engagement&format=json&method=get&pretty=0&suppress_http_code=1&ids=";
    for(let i = 0; i < data.length ; i++){
        url += data[i].url + (i == data.length - 1 ? "": ",");
    }
    // console.log(url);
    return axios.get(url);
}
