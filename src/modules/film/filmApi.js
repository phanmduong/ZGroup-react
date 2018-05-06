import axios from 'axios';
import * as env from '../../constants/env';

//keetoolclient.test/manageapi/v3/films?token=
export function loadAllFilmsApi() {
    let url = env.API_URL + "/films?limit=-1";
    return axios.get(url);
}

export function loadAllFilmsHavePaginationApi(page, search) {
    let url = env.API_URL + "/films";
    url += "?limit=12";
    if (search) {
        url += "&search=" + search;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}

//keetoolclient.test/manageapi/v3/film/{id}?token=
export function deleteFilmApi(id) {
    let url = env.MANAGE_API_URL + "/film/";
    if (id) {
        url += id;
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
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
      let url = env.MANAGE_API_URL + "/film/"+film.id;
      let token = localStorage.getItem('token');
      if (token) {
          url += "?token=" + token;
      }
      return axios.put(url,film);
  }

//film/{id}/status
// 0 chưa dùng, 1 đang chiếu, 2 sắp chiếu
export function editStatusApi(film_id, film_status) {
    let url = env.MANAGE_API_URL + "/film/";

    let token = localStorage.getItem('token');
    if (film_id) {
        url += film_id +"/status";
    }
    url += "?film_status="+film_status;
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url);
}