import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllPasswordsApi(page) {
    let url = env.MANAGE_API_URL + '/v2/password/passwords';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    if(page){
        url += "&page="+page;
    }
    return axios.get(url);
}

// export function savePasswordApi(passwordAccount) {
//     let url = env.MANAGE_API_URL + '/v2/password/store';
//     let token = localStorage.getItem('token');
//     if(token) {
//         url += "?token=" + token;
//     }
//     return axios.post(url, passwordAccount);
// }

export function editPasswordApi(passwordAccount) {
    let url = env.MANAGE_API_URL + '/v2/password/edit/' + passwordAccount.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, passwordAccount);
}


