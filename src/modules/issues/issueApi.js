/**
 * Created by phanmduong on 4/6/17.
 */
import axios from "axios";
import { MANAGE_API_URL } from "../../constants/env";

export function loadIssues(search = "", status = "") {
    let url = MANAGE_API_URL + "/issue/get-all-issues";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    url += `&search=${search}&status=${status}`;

    return axios.get(url);
}
export function createIssue(title = "", description = "", content = "") {
    let url = MANAGE_API_URL + "/issue/create-issue";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }

    return axios.post(url, {
        title: title,
        description: description,
        content: content
    });
}
