import axios from 'axios';
import * as env from '../constants/env';

export function getRoles() {
  let url = env.MANAGE_API_URL + "/get-roles";
  let token = localStorage.getItem('token');
  if (token) {
    url += "?token=" + token;
  }

  return axios.get(url);
}
