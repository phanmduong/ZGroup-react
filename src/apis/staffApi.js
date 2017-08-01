import axios from 'axios';
import * as env from '../constants/env';

export function getStaffs() {
  let url = env.MANAGE_API_URL + "/get-staffs";
  let token = localStorage.getItem('token');
  if (token) {
    url += "?token=" + token;
  }

  return axios.get(url);
}
