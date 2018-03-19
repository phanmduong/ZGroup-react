import axios from 'axios';
import * as env from '../../constants/env';

export function loadAllBankAccountsApi() {
    let url = env.MANAGE_API_URL + '/finance/bank-accounts';
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function saveBankAccountApi(bankAccount) {
    let url = env.MANAGE_API_URL + "/finance/bank-accounts";
    let token = localStorage.getItem('token');
    if(token) {
        url += "?token=" + token;
    }
    return axios.post(url, bankAccount);
}



export function editBankAccountApi(bankAccount) {
    let url = env.MANAGE_API_URL + "/finance/bank-accounts/" + bankAccount.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, bankAccount);
}


