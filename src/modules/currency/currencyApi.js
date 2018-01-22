import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllCurrenciesApi() {
    let url = env.MANAGE_API_URL + '/v2/currency';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function saveCurrencyApi(currency) {
    let url = env.MANAGE_API_URL + "/v2/currency";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, currency);
}

export function editCurrencyApi(currency) {
    let url = env.MANAGE_API_URL + "/v2/currency/" + currency.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, currency);
}

export function deleteCurrencyApi(currency) {
    let url = env.MANAGE_API_URL + "fuck";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url, currency);
}


