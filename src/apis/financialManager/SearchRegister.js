import axios from 'axios';
import * as env from '../../constants/env';

export function loadSearchRegisterData(search) {
  let url = env.API_URL + "/v2/search-registers?search=" + search;
  let token = localStorage.getItem('token');
  if (token) {
    url += "&token=" + token;
  }
  return axios.get(url);
}
