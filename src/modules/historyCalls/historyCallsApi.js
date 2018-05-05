import axios from 'axios';
import * as env from '../../constants/env';

export function historyCalls(page = 1, callerId = '', search) {
	let url = env.MANAGE_API_URL + '/history-calls?caller_id=' + callerId + '&page=' + page;
	let token = localStorage.getItem('token');
	if (token) {
		url += '&token=' + token;
	}
	if (search) {
		url += '&search=' + search;
	}
	return axios.get(url);
}
