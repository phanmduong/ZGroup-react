import axios    from 'axios';
import * as env from '../../constants/env';

export function loadTeacher(genId) {
    //http://api.keetool.xyz/apiv2/gens/teachers?gen_id=21&token=
    let url     = env.API_URL + "/apiv2/gens/teachers?gen_id=" + genId;
    let token   = localStorage.getItem('token');
    if (token) {
        url +=  "&token="   + token ;
    }
    return axios.get(url);
}