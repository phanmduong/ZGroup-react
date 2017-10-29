/**
 * Created by phanmduong on 4/6/17.
 */
import axios from 'axios';
import * as env from '../../../constants/env';


export function archiveBoard(boardId) {
    let url = env.MANAGE_API_URL + `/board/${boardId}/archive`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}

export function unarchiveBoard(boardId) {
    let url = env.MANAGE_API_URL + `/board/${boardId}/unarchive`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
}

export function loadArchiveBoards(projectId) {
    let url = env.MANAGE_API_URL + `/boards/${projectId}/archive`;
    const token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}



