import * as env from "../../../../constants/env";
import axios from "axios/index";

export const setPoint = (cardId, point) => {
    let url = env.MANAGE_API_URL + `/card/${cardId}/point/${point}`;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url);
};