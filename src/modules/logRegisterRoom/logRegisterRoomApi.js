import axios from "axios";
import * as env from "../../constants/env";

export function loadLogs(page = 1) {
  let url = env.MANAGE_API_URL + "/trongdong/logs-register-room";
  let token = localStorage.getItem("token");
  if (token) {
    url += "?token=" + token;
  }

  url += "&page=" + page;

  return axios.get(url);
}
