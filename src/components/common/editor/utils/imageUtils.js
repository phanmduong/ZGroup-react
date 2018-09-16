import imageExtensions from "image-extensions";
import { MANAGE_API_URL } from "../../../../constants/env";
/*
    * A function to determine whether a URL has an image extension.
    *
    * @param {String} url
    * @return {Boolean}
    */
export const isImage = url => {
    return !!imageExtensions.find(url.endsWith);
};
/**
 * A change function to standardize inserting images.
 *
 * @param {Change} change
 * @param {String} src
 * @param {Range} target
 */

export const insertImage = (change, src, target) => {
    if (target) {
        change.select(target);
    }

    change.insertBlock({
        type: "image",
        isVoid: true,
        data: { src },
    });
};

export const uploadImage = (file, completeHandler, progressHandler, error) => {
    let url = MANAGE_API_URL + "/file/upload";
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
};
