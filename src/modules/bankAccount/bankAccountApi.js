import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllBankAccountsApi() {
    let url = env.MANAGE_API_URL + '/finance/bank-transfer/bank-accounts';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}