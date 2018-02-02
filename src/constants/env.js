/*eslint-disable */
import * as helper from '../helpers/helper';

let URL = env.DOMAIN;
let MANAGE_URL;
export const PROTOCOL = env.PROTOCOL;
export const TYPE_API = env.TYPE_API;

export const API_URL = PROTOCOL + "api." + URL;
export const MANAGE_API_URL = PROTOCOL + "manageapi." + URL;
export const BASE_URL = PROTOCOL + URL;
export const DOMAIN = PROTOCOL + 'manage.' + URL;

if (process.env.NODE_ENV === 'production') {
    MANAGE_URL = PROTOCOL + 'manage.' + URL;

}
else {
    MANAGE_URL = 'http://localhost:3000';
}

export const MANAGE_BASE_URL = MANAGE_URL;

export const NAME_COMPANY = env.NAME_COMPANY;
export const LOGO_LOGIN = PROTOCOL + env.LOGO_LOGIN;
export const LOGO_SIDEBAR = PROTOCOL + env.LOGO_SIDEBAR;
export const LOGO_MAIN = PROTOCOL + env.LOGO_MAIN;
export const SECRET_TOKEN = "KEEeducation";
export const EXPIRES_IN = "6d";
export const NAME_DATA_LOGIN_SAVE_LOCAL = "zgroup-token";
export const NO_AVATAR = PROTOCOL + 'd2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png';
export const NO_IMAGE = PROTOCOL + 'd255zuevr6tr8p.cloudfront.net/no_photo.png';
export const CHANNEL = env.CHANNEL;
export const SOCKET_HOST = env.SOCKET_HOST;
export const SOCKET_PORT = env.SOCKET_PORT;


var OneSignal = window.OneSignal || [];
OneSignal.push(["init", {
    appId: "ceea18e8-322a-4748-b18b-fdf066d9a5ff",
    autoRegister: true, /* Set to true to automatically prompt visitors */
    persistNotification: false,
    subdomainName: 'colorme',
    promptOptions: {
        /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
        /* actionMessage limited to 90 characters */
        actionMessage: "Bạn có muốn nhận thông báo từ trang này ?",
        /* acceptButtonText limited to 15 characters */
        acceptButtonText: "ĐỒNG Ý",
        /* cancelButtonText limited to 15 characters */
        cancelButtonText: "HỦY"
    },
}]);




