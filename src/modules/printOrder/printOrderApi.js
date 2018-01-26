import axios    from 'axios';
import * as env from '../../constants/env';


export function loadPrintOrders() {
    //http://manageapi.keetool.xyz/company/print-order/all?token=
    let url     = env.MANAGE_API_URL +"/company/print-order/all";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "?token=" + token;
    }
    return axios.get(url);
}