import axios from "axios";
import * as env from "../../constants/env";

export function loadLoginApi(login, tokenBrowser) {
    // const domain = process.env.NODE_ENV === "production" ? "http://" + window.location.hostname : env.BASE_URL;
    const domain = process.env.NODE_ENV === "production" ? ((window.location.hostname != 'demo.edutoclient.test') ? "http://" + window.location.hostname : "http://demo.edutoclient.test:8888") : env.BASE_URL;
    // const domain = env.DOMAIN;
    // let url = env.DOMAIN + "/login";
    let url = domain + "/login";
    return axios.post(url, {
        email: login.email,
        password: login.password,
        token_browser: tokenBrowser,
    });
}
