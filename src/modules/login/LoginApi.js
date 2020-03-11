import axios from "axios";

export function loadLoginApi(login, tokenBrowser) {
    let url = "http://" + window.location.hostname + "/login";
    return axios.post(url, {
        email: login.email,
        password: login.password,
        token_browser: tokenBrowser,
    });
}
