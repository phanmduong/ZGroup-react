import {MANAGE_API_URL} from "../../../constants/env";
import axios from "axios";
import moment from "moment";
import {
    TIME_FORMAT_H_M,
    DATE_VN_FORMAT,
    DATETIME_FORMAT_SQL,
} from "../../../constants/constants";

export default {
    saveEvent: (event, isEditEvent) => {
        let url = MANAGE_API_URL + "/event";
        let token = localStorage.getItem("token");
        if (token) {
            url += "?token=" + token;
        }
        if (!isEditEvent) {
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
        }
        else {
            return axios.put(url, {
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
        }
    },

    loadEventsApi: (page, limit, query) => {
        let url = MANAGE_API_URL + "/event";
        let token = localStorage.getItem("token");
        if (token) {
            url += "?token=" + token;
        }
        url += `&page=${page}&limit=${limit}`;
        if (query) {
            url += "&search=" + query;
        }
        return axios.get(url);
    },

    changeStatusApi: (id, status) => {
        let tmp = (status === "PUBLISHED") ? "UNPUBLISHED" : "PUBLISHED";
        let url = MANAGE_API_URL + "/event/" + id + "/change-status";
        let token = localStorage.getItem("token");
        if (token) {
            url += "?token=" + token;
        }
        return axios.put(url, {
            'status': tmp,
        });
    }

};
