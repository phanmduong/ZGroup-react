import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllMembersApi(clusterId, page, search) {
	let url = env.MANAGE_API_URL + '/group/group-list/' + clusterId;
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

export function getMembersModal(
	clusterId,
	page = 1,
	gens,
	classes,
	start_time,
	end_time,
	top,
	carer_id,
	rate,
	limit = 10,
	paid_course_quantity
) {
	let url = env.MANAGE_API_URL + '/group/user-list/' + clusterId;
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	if (limit) {
		url += '&limit=' + limit;
	}
	if (page) {
		url += '&page=' + page;
	}
	if (gens) {
		url += '&gens=' + JSON.stringify(gens);
	}
	if (classes) {
		url += '&classes=' + JSON.stringify(classes);
	}
	if (start_time && end_time) {
		url += '&start_time=' + start_time + '&end_time=' + end_time;
	}
	if (top) {
		url += '&top=' + top;
	}
	if (carer_id) {
		url += '&carer_id=' + carer_id;
	}
	if (rate) {
		url += '&rate=' + rate;
	}
	if (paid_course_quantity) {
		url += '&paid_course_quantity=' + paid_course_quantity;
	}
	return axios.get(url);
}

export function searchStaffs(search) {
	let url = env.MANAGE_API_URL + `/get-staffs?search=` + search;
	let token = localStorage.getItem('token');
	if (token) {
		url += '&token=' + token;
	}
	return axios.get(url);
}

export function chooseMembers(clusterId, users) {
	let url = env.MANAGE_API_URL + '/group/user-list/' + clusterId;
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	return axios.post(url, {
		users: JSON.stringify(users)
	});
}

export function loadAllGens() {
	let url = env.MANAGE_API_URL + '/gen/all';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	return axios.get(url);
}

export function loadAllClasses() {
	let url = env.MANAGE_API_URL + '/v2/class';
	let token = localStorage.getItem('token');
	if (token) {
		url += '?token=' + token;
	}
	return axios.get(url);
}