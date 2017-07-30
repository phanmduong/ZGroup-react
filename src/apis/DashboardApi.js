import axios from 'axios';
import * as env from '../constants/env';

export function loadDashboardData(genId) {
  let url = env.API_URL + "/v2/gens/" + genId + "/dashboard";
  let token = localStorage.getItem('token');
  if (token) {
    url += "?token=" + token;
  }
  return axios.get(url);
}

