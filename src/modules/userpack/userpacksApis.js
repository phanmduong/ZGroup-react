import axios from 'axios';
import * as env from '../../constants/env';


export function loadUserpacksApi(page, limit , query) {
        let url = env.MANAGE_API_URL + "/coworking-space/user-pack?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    if(query){
        url += "&search=" + query;
    }
    if(limit){
        url += "&limit=" + limit;
    }
    if(page){
        url += "&page=" + page;
    }
    return axios.get(url);
}
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

export function addUserpackApi(userpack) {
    let url = env.MANAGE_API_URL + "/coworking-space/user-pack?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url,{
        "name" : userpack.name,
        "avatar_url" : userpack.avatar_url,
    });
}
export function changeStatusApi(id) {
    let url = env.MANAGE_API_URL + "/coworking-space/user-pack/"+id+"/change-status";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}
export function loadSubscriptionsKindApi() {
    let url = env.MANAGE_API_URL + "/coworking-space/subscription-kind?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadDetailUserpackApi(id) {
    let url = env.MANAGE_API_URL + "/coworking-space/user-pack/"+id+"/subscription?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}


export function editUserpackApi(userpack) {
    let url = env.MANAGE_API_URL + "/coworking-space/user-pack/"+userpack.id+"?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url,{
        "name" : userpack.name,
        "avatar_url" : userpack.avatar_url,
        "detail" : userpack.detail || "",
    });
}




export function addSubscriptionApi(id ,subscription) {
    let url = env.MANAGE_API_URL + "/coworking-space/user-pack/"+id+"/subscription?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url,{
        "description" : subscription.description,
        "price" : subscription.price,
        "subscription_kind_id" : subscription.subscriptionKind ,
    });
}


export function addSubscriptionKindApi(subscriptionKind) {
    let url = env.MANAGE_API_URL + "/coworking-space/subscription-kind?";
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }
    return axios.post(url,{
        "name" : subscriptionKind.name,
        "hours" : subscriptionKind.hours,
    });
}