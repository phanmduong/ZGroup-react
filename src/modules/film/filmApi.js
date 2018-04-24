import axios from 'axios';
import * as env from '../../constants/env';

//keetoolclient.test/manageapi/v3/films?token=
export function loadAllFilmsApi() {
    let url = env.MANAGE_API_URL + "/films";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

//keetoolclient.test/manageapi/v3/film/update/{id}?token=
export function deleteFilmApi(id) {
    let url = env.MANAGE_API_URL + "/film/";
    if (id) {
        url += id;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url);
}

//keetoolclient.test/manageapi/v3/film?token=
export function postFilmApi(film) {
    let url = env.MANAGE_API_URL + "/film";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,film);
}

//keetoolclient.test/manageapi/v3/film/update/{id}?token=
  export function editFilmApi(film) {
      let url = env.MANAGE_API_URL + "/film/update/"+film.id;
      let token = localStorage.getItem('token');
      if (token) {
          url += "?token=" + token;
      }
      return axios.post(url,film);
  }