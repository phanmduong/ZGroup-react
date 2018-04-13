/**
 * Created by phanmduong on 4/6/17.
 */
import axios from "axios";
import * as env from "../../../constants/env";

export function createBarcode(barcode) {
    let url = env.MANAGE_API_URL + "/book/barcode";
    const token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, barcode);
}

export function loadBarcodes(page = 1, type = "book") {
    let url = env.MANAGE_API_URL + `/book/barcodes?type=${type}page=` + page;
    const token = localStorage.getItem("token");

    if (token) {
        url += "&token=" + token;
    }
    return axios.get(url);
}

export function deleteBarcode(barcodeId) {
    let url = env.MANAGE_API_URL + `/book/barcode/${barcodeId}`;
    const token = localStorage.getItem("token");
    if (token) {
        url += "?token=" + token;
    }
    return axios.delete(url);
}
