import axios from 'axios';
import * as env from '../../constants/env';

export function getGroupListApi(page, search) {
	let url = env.MANAGE_API_URL + '/group/group-list';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	if (page) {
		url += '&page=' + page;
	}
	if (search) {
		url += '&search=' + search;
	}
	return axios.get(url);
}

export function saveGroupModal(group) {
	let edit = group.id ? '/' + group.id : '';
	let url = env.MANAGE_API_URL + '/group/group-list' + edit;
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	if (group.id) return axios.put(url, group);
	return axios.post(url, group);
}
