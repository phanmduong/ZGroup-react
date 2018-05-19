import axios from 'axios';
import * as env from '../../constants/env';

//Load All Film
export function loadAllFilmsApi(search, start_date) {
    let url = env.API_URL + "/films?limit=-1";
    if (search) {
        url += "&search=" + search;
    }
    if (start_date) {
        url += "&start_date=" + start_date;
    }
    return axios.get(url);
}

//Load All Film Co Paginator
export function loadAllFilmsHavePaginationApi(page, search) {
    let url = env.API_URL + "/films";
    url += "?limit=" + 12;
    if (search) {
        url += "&search=" + search;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}

//Xoa Film
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

//Post Film
export function postFilmApi(film) {
    let url = env.MANAGE_API_URL + "/film";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url,film);
}

// Sua Film
  export function editFilmApi(film) {
      let url = env.MANAGE_API_URL + "/film/"+film.id;
      let token = localStorage.getItem('token');
      if (token) {
          url += "?token=" + token;
      }
      return axios.put(url,film);
  }

// Sua Status Film
// 0 chưa dùng, 1 đang chiếu, 2 sắp chiếu
export function editStatusApi(film_id, film_status) {
    let url = env.MANAGE_API_URL + "/film/";

    let token = localStorage.getItem('token');
    if (film_id) {
        url += film_id +"/change";
    }
    url += "?film_status="+film_status;
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url);
}

//Sua Film Yeu Thich
export function changeFavoriteFilmApi(film) {
    let url = env.MANAGE_API_URL + "/film/";

    let token = localStorage.getItem('token');
    if (film) {
        url += film.id +"/change";
    }
    url += "?is_favorite="+(1-film.is_favorite);
    if (token) {
        url += "&token=" + token;
    }
    return axios.put(url);
}



//Load All Session
export function loadAllSessionsApi(page, search, from_date, to_date, start_date, film_id) {
    let url = env.API_URL + "/sessions";
    url += "?limit=20";
    if (search) {
        url += "&search=" + search;
    }
    if (page) {
        url += "&page=" + page;
    }
    if(from_date){
        if(to_date){
            url += "&from_date=" + from_date +"&to_date=" + to_date;
        }
    }
    if (start_date) {
        url += "&start_date=" + start_date;
    }
    if (film_id) {
        url += "&film_id=" + film_id;
    }
    return axios.get(url);
}


//Load Session Dang Chieu
export function loadShowingSessionApi(page, search) {
    let url = env.API_URL + "/sessions/showing?limit=20";
    if (search) {
        url += "&search=" + search;
    }
    if (page) {
        url += "&page=" + page;
    }
    return axios.get(url);
}


// Them Session
export function saveSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, session);
}

//Edit Session
export function editSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session/" + session.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, session);
}

//Delete Session
export function deleteSessionApi(session) {
    let url = env.MANAGE_API_URL + "/session/"+session.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}

//Get all bookingRegisterSession
//http://keetool3.xyz/manageapi/v3/?&token=
export function loadAllRoomsApi() {
    let url = env.MANAGE_API_URL + "/base/rooms";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}