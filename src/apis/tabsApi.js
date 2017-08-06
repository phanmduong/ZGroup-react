import axios from 'axios';
import * as env from '../constants/env';

export function loadTabsApi() {
  let url = env.MANAGE_API_URL + "/tabs";
  let token = localStorage.getItem('token');
  if (token) {
    url += "?token=" + token;
  }

  return axios.get(url);
}

export function loadAllTabsApi() {
  let url = env.MANAGE_API_URL + "/all-tabs";
  let token = localStorage.getItem('token');
  if (token) {
    url += "?token=" + token;
  }

  return axios.get(url);
}
