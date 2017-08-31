import axios from 'axios';
import * as env from '../../constants/env';

export function loadGens(page = 1) {
    let url = env.MANAGE_API_URL + "/gens?page=" + page;
    let token = localStorage.getItem('token');
    if (token) {
        url += "&token=" + token;
    }

    return axios.get(url);
}

export function addGen(gen) {
    let url = env.MANAGE_API_URL + '/gen/add';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            name: gen.name,
            description: gen.description,
            start_time: gen.start_time,
            end_time: gen.end_time,
        });
}

export function editGen(gen) {
    let url = env.MANAGE_API_URL + `/gen/${gen.id}/edit`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url,
        {
            id: gen.id,
            name: gen.name,
            description: gen.description,
            start_time: gen.start_time,
            end_time: gen.end_time,
        });
}

export function deleteGen(genId) {
    let url = env.MANAGE_API_URL + '/delete-gen';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,
        {
            id: genId,
        });
}

export function changeStatus(genId) {
    let url = env.MANAGE_API_URL + '/gen/change-status';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,
        {
            id: genId,
        });
}

export function changeTeachStatus(genId) {
    let url = env.MANAGE_API_URL + '/gen/change-teach-status';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,
        {
            id: genId,
        });
}