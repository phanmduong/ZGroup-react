import axios from "axios/index";
import * as env from "../../../constants/env";



//Get Seat-types theo Rooms
///v3/v2/room/{roomId}/seat-types
export function loadAllSeatTypesApi(id) {
    let url = env.MANAGE_API_URL + "/v2/room/";
    if(id){
        url += id +"/seat-types";
    }
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}
//Edit Seat-Types
//http://keetoolclient.test/manageapi/v3/v2/room/seat-type/{seatTypeId}
export function EditSeatTypesApi(seatType) {
    let url = env.MANAGE_API_URL + "/v2/room/seat-type/";
    url += seatType.id;
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url,seatType);
}