import { MANAGE_API_URL_V3 } from "../../../constants/env";
import axios from "axios";

export default {
    saveEvent: event => {
        let url = MANAGE_API_URL_V3 + "/event";
        let token = localStorage.getItem("token");
        if (token) {
            url += "?token=" + token;
        }
        return axios.post(url, event);
    },
};
