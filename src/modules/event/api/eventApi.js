import { MANAGE_API_URL } from "../../../constants/env";
import axios from "axios";

export default {
    saveEvent: event => {
        let url = MANAGE_API_URL + "/event";
        let token = localStorage.getItem("token");
        if (token) {
            url += "?token=" + token;
        }
        return axios.post(url, event);
    },
};
