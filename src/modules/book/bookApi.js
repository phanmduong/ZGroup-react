/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../constants/env';


export function loadTaskListTemplates(page = 1, query = null, type = null) {
    let url = env.MANAGE_API_URL + "/book/task-list-templates?page=" + page;
    let token = localStorage.getItem('token');
    if (query) {
        url += "&q=" + query;
    }
    if (token) {
        url += "&token=" + token;
    }

    if (type) {
        url += "&type=" + type;
    }

    return axios.get(url);
}


export function loadAllTaskListTemplates() {
    let url = env.MANAGE_API_URL + "/book/all-task-list-templates";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function loadTaskListTemplate(taskListId) {
    let url = env.MANAGE_API_URL + `/tasklist/${taskListId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function storeTaskListTemplates(taskList) {
    let url = env.MANAGE_API_URL + "/book/store-task-list-templates";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, taskList);
}

export function saveTaskSpan(task) {
    let url = env.MANAGE_API_URL + "/task/" + task.id + "/span";
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, task);
}


export function loadBoards(type = "book") {
    let url = env.MANAGE_API_URL + `/book/${type}/project/v2`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadBoardDetail(board_id) {
    let url = env.MANAGE_API_URL + `/book/book/project/v2/board/`+ board_id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function loadTaskListTemplateSetting(taskListTemplateId) {
    let url = env.MANAGE_API_URL + `/book/task-list-template/${taskListTemplateId}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}


export function loadFashionBoards() {
    let url = env.MANAGE_API_URL + "/book/fashion-project";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function storeTaskListTemplateSetting(taskListTemplateId, boards) {
    let url = env.MANAGE_API_URL + `/book/task-list-template/${taskListTemplateId}/tasks`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {boards: JSON.stringify(boards)});
}




