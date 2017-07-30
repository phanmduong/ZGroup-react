import axios from 'axios';
import * as env from '../constants/env';

export function loadGensApi() {
  let url = env.API_URL + "gens";
  let token = localStorage.getItem('token');
  if (token) {
    url += "?token=" + token;
  }
  return axios.get(url);
}
