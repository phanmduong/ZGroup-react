import axios from 'axios';
import * as env from '../constants/env';

export function loadRegisterListData(page) {
  let url = env.API_URL + "/register-list?page=" + page;
  let token = localStorage.getItem('token');
  if (token) {
    url += "&token=" + token;
  }
  return axios.get(url);
}
