import { MANAGE_API_URL_V3 } from "../../../constants/env";
import axios from "axios";
import moment from "moment";
import {
    TIME_FORMAT_H_M,
    DATE_VN_FORMAT,
    DATETIME_FORMAT_SQL,
} from "../../../constants/constants";

export default {
    saveEvent: event => {
        let url = MANAGE_API_URL_V3 + "/event";
        let token = localStorage.getItem("token");
        if (token) {
            url += "?token=" + token;
        }
        return axios.post(url, {
            ...event,
            start_time: moment(event.start_time, TIME_FORMAT_H_M).format(
                DATETIME_FORMAT_SQL,
            ),
            end_time: moment(event.start_time, TIME_FORMAT_H_M).format(
                DATETIME_FORMAT_SQL,
            ),
            start_date: moment(event.start_date, DATE_VN_FORMAT).format(
                DATETIME_FORMAT_SQL,
            ),
            end_date: moment(event.end_date, DATE_VN_FORMAT).format(
                DATETIME_FORMAT_SQL,
            ),
        });
    },
};
