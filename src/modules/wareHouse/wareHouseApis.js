import axios from 'axios';
import * as env from '../../constants/env';

export function loadWareHouseApi(limit , page , query) {
    let url = env.MANAGE_API_URL + "/order/warehouses/all?";
    let token = localStorage.getItem('token');
    if (limit){
        url += "&limit=" + limit;
    }
    if (page) {
        url += "&page=" + page;
    }
    if (query) {
        url += "&search=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}
export function loadBasesApi(){
    let url = env.MANAGE_API_URL + "/order/bases/all";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function addWareHouseApi(name, location,  id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/warehouse/add';
    if (token) {
        url += '?token=' + token;
    }
    if (id) {
        return axios.post(url, {
            'name': name,
            'location': location,
            'base_id' : id,
        });
    }
    else{
        return axios.post(url, {
            'name': name,
            'location': location,
        });
    }

}
export function editWareHouseApi(wareHouse) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/warehouse/'+wareHouse.id+'/edit';
    if (token){
        url += '?token=' + token;
    }
    if (wareHouse.base.id) {
        return axios.put(url, {
            'name': wareHouse.name,
            'location': wareHouse.location,
            'base_id' : wareHouse.base.id,
        });
    }
    else {
        return axios.put(url, {
            'name': wareHouse.name,
            'location': wareHouse.location,
        });
    }
}

export function deleteWareHouseApi(id) {
    let token = localStorage.getItem("token");
    let url = env.MANAGE_API_URL + '/order/warehouse/'+id+'/delete';
    if (token){
        url += '?token=' + token;
    }
    return axios.delete(url);
}
