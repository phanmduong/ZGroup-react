
import axios    from 'axios';
import * as env from '../../../constants/env';


export function loadExportOrders(page,search) {
    //http://manageapi.keetool.xyz/company/export-order/all?token=
    let url     = env.MANAGE_API_URL +"/company/export-order/all?";
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "page=" + page + "&search=" + search + "&token=" + token;
    }
    return axios.get(url);
}
