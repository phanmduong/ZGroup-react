import axios from "axios";
import * as env from "../../constants/env";

export function getRooms(page, search, baseId, limit) {
    let url = env.MANAGE_API_URL + "/base/rooms?page=" + page;
    let token = localStorage.getItem("token");
    if (search) {
        url += "&search=" + search;
    }
    if (token) {
        url += "&token=" + token;
    }

    if (baseId && baseId !== 0) {
        url += "&base_id=" + baseId;
    }
    if (limit && limit !== 0) {
        url += "&limit=" + limit;
    }

    return axios.get(url);
}

export function getBases() {
    let url = env.MANAGE_API_URL + "/base/all";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.get(url);
}

export function getTypesApi(search) {
    let url = env.MANAGE_API_URL + "/v2/base/room-type?limit=-1";
    let token = localStorage.getItem("token");
    if (token) {
        url += "&token=" + token;
    }
    if (search) {
        url += "&search=" + search;
    }
    return axios.get(url);
}

export function createRoomTypeApi(roomType) {
    const request = {
        name: roomType.name,
        description: roomType.description,
        type_name : roomType.type_name,
        price : roomType.price,
        member_price : roomType.member_price,
    };
    let url = env.MANAGE_API_URL + "/v2/base/room-type";
    if (roomType.id) {
        url += "/" + roomType.id;
    }
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    if (roomType.id) {
        return axios.put(url, request);
    }
    return axios.post(url, request);
}

export function changeAvatarApi(file, completeHandler, progressHandler, error) {
    let url = env.MANAGE_API_URL + "/file/upload";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append("file", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}

export function storeRoom(room) {
    let url = env.MANAGE_API_URL + "/v2/base/" + room.base_id + "/room";
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        name: room.name ? room.name : "",
        type: room.room_type ? room.room_type.id : room.room_type_id,
        seats_count: room.seats_count,
        room_type_id: room.room_type ? room.room_type.id : room.room_type_id,
        images_url: room.images_url ? room.images_url : "[]",
        avatar_url: room.avatar_url ? room.avatar_url : "",
        cover_url: room.cover_url ? room.cover_url : "",
        cover_type: room.cover_type ? room.cover_type : "",
        description: room.description ? room.description : "",
        detail: room.detail ? room.detail : "",
        // basic_info: room.basic_info ? room.basic_info : "",
    });
}

export function editRoom(room) {
    let url =
        env.MANAGE_API_URL + "/v2/base/" + room.base_id + "/room/" + room.id;
    let token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.put(url, {
        type: room.type ? room.type : "",
        seats_count: room.seats_count ? room.seats_count : 0,
        name: room.name ? room.name : "",
        images_url: room.images_url ? room.images_url : "[]",
        avatar_url: room.avatar_url ? room.avatar_url : "",
        room_type_id: room.room_type ? room.room_type.id : room.room_type_id,
        cover_url: room.cover_url ? room.cover_url : "",
        cover_type: room.cover_type ? room.cover_type : "",
        description: room.description ? room.description : "",
        detail: room.detail ? room.detail : "",
        // basic_info: room.basic_info ? room.basic_info : "",
    });
}

export function uploadRoomLayout({
    roomId,
    file,
    completeHandler,
    progressHandler,
    error,
}) {
    let url = env.MANAGE_API_URL + "/v2/room/" + roomId + "/layout";
    const token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    let formData = new FormData();
    formData.append("image", file);
    let ajax = new XMLHttpRequest();
    ajax.addEventListener("load", completeHandler, false);
    ajax.upload.onprogress = progressHandler;
    ajax.addEventListener("error", error, false);
    ajax.open("POST", url);
    ajax.send(formData);
}
