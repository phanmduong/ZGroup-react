import axios from 'axios';
import * as env from '../constants/env';

export function loadLoginApi(login) {
  let url = env.API_URL + "/login";
  return axios.post(url, {
    email: login.email,
    password: login.password
  });
}
