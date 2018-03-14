import axios from "axios";
import * as env from "../../../constants/env";
// import { register } from "../../workShiftRegisters/workShiftRegisterApi";

export function getRooms(baseId) {
    let url = `${env.MANAGE_API_URL_V3}/base/${baseId}/rooms`;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function getSeats(roomId, from, to) {
    let token = localStorage.getItem("token");
    let url = `${
        env.MANAGE_API_URL_V3
    }/seat/available?token=${token}&from=${from}&to=${to}&limit=-1&room_id=${roomId}`;
    return axios.get(url);
}

export const postBookSeat = ({ registerId, seatId, startTime, endTime }) => {
    const token = localStorage.getItem("token");
    const url = `${env.MANAGE_API_URL_V3}/seat/${seatId}/book?token=${token}`;
    return axios.post(url, {
        start_time: startTime,
        end_time: endTime,
        register_id: registerId,
    });
};

export const getChooseSeatHistory = registerId => {
    const token = localStorage.getItem("token");
    const url = `${
        env.MANAGE_API_URL_V3
    }/seat/register/${registerId}?token=${token}`;
    return axios.get(url);
};

export function loadHistoryChooseSeatApi(page,limit) {
    const token = localStorage.getItem("token");
    const url = `${
        env.MANAGE_API_URL_V3
        }/seat/all?token=${token}&page=${page}&limit=${limit}`;
    return axios.get(url);
}
