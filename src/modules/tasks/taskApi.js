/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';


export function loadProjects(page = 1, query = null) {
    let url = env.MANAGE_API_URL + "/projects?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function loadProject(projectId) {
    let url = env.MANAGE_API_URL + "/project/" + projectId;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function createProject(project) {
    let url = env.MANAGE_API_URL + "/project/create";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, project);
}

export function deleteProject(project) {
    let url = env.MANAGE_API_URL + "/project/delete/" + project.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

export function changeProjectStatus(project, status) {
    let url = env.MANAGE_API_URL + "/project/status/" + project.id;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {status});
}