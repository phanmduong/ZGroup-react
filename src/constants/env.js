/*eslint-disable */
export let URL = env.DOMAIN;

let MANAGE_URL;
export const PROTOCOL = env.PROTOCOL;
export const IS_CAMPAIN_COURSE_LINK = env.IS_CAMPAIN_COURSE_LINK;
export const TYPE_API = env.TYPE_API;
export const TYPE_DASHBOARD = env.TYPE_DASHBOARD;
// export const BASE_URL = PROTOCOL + URL;
export const BASE_URL = process.env.NODE_ENV === "production" ? ((window.location.hostname == 'demo.edutoclient.test') ? "http://demo.edutoclient.test:8888": "") : PROTOCOL + URL;

export let LINK_REGISTER_COURSE =
    env.LINK_REGISTER_COURSE ? env.LINK_REGISTER_COURSE : BASE_URL + "/course";

export const BLOG_PREVIEW_BASE_URL = PROTOCOL + env.BLOG_PREVIEW_BASE_URL;
// export const API_URL = PROTOCOL + "api." + URL;
// export const API_URL = BASE_URL + "/api/v3";

// export const API_URL = PROTOCOL + "api." + URL;

// export const BASE_URL = PROTOCOL + URL;
// export const API_URL = BASE_URL + "/api/v3";
export const API_URL = env.IS_SUBDOMAIN ? "http://" + "api." + URL : BASE_URL + "/api/v3";

// export const API_URL = BASE_URL + "/api/v3";
export const DOMAIN = "http://" + "manage." + URL;
// export const DOMAIN = BASE_URL + "/admin";
// export const MANAGE_API_URL = BASE_URL + "/manageapi/v3";
export const MANAGE_API_URL = env.IS_SUBDOMAIN ? "http://" + "manageapi." + URL : BASE_URL + "/manageapi/v3";
export const NEW_MANAGE_API_URL = env.IS_SUBDOMAIN ? "http://" + "manageapi." + URL + '/v4' : BASE_URL + "/manageapi/v4";

export const FACEBOOK_TOKEN = env.FACEBOOK_TOKEN;
export const FB_TOKEN = "259398704989951|OqAhnC6jKJZTYHN-6NzmPa_b2RM";
export const FB_PAGE_TOKEN = "EAAd5FUER9hEBANsZA1uoszVmuQxZCl4nCeFuOZAY3U287ZABcQ1jeEIrDnrz9jRZAcYPDYC7zYEiIZAJvmVmWpLuaiS8GpwAwcMkbEk5uBgSIaZCx6IWZBN7QfNbXm8CTqEQnuZBuZB6nZBIfwfMr81ks3S4x3DUJw63W8JNfFb5xv4vBeun2XqYHJ5";
// export const FB_ADS_TOKEN = "EAABsbCS1iHgBAAjJJxEZCfFAZAz0A4WoM2p9v2xp3bFN7RzVy70OshIJ91WQ0T6fKC5AjOKH0z6ft9a3qFh1Ii4uDLOMeukOyLmw6wCE2o4TGtZAsZC10MZBhoiX2YroCE62qpDDNQYIeC1V40f0ZB2SBrKl9waTuTzqFWxlaLZAwjOZAwSQeZCOXpmvQ2x33TI591yxyBJaOfAZDZD";
if (process.env.NODE_ENV === "production") {
    MANAGE_URL = PROTOCOL + "manage." + URL;
} else {
    MANAGE_URL = "http://localhost:3000";
}

export const MANAGE_BASE_URL = MANAGE_URL;

export const NAME_COMPANY = env.NAME_COMPANY;
export const LOGO_LOGIN = PROTOCOL + env.LOGO_LOGIN;
export const LOGO_SIDEBAR = PROTOCOL + env.LOGO_SIDEBAR;
export const LOGO_MAIN = PROTOCOL + env.LOGO_MAIN;
export const SECRET_TOKEN = "KEEeducation";
export const EXPIRES_IN = "6d";
export const NAME_DATA_LOGIN_SAVE_LOCAL = "zgroup-token";
export const NO_AVATAR =
    PROTOCOL + "d2xbg5ewmrmfml.cloudfront.net/web/no-avatar.png";
export const NO_IMAGE = PROTOCOL + "d255zuevr6tr8p.cloudfront.net/no_photo.png";
export const CHANNEL = env.CHANNEL;
export const SOCKET_HOST = env.SOCKET_HOST;
export const SOCKET_PORT = env.SOCKET_PORT;


// $(document).ready(function() {
//     // var OneSignal = window.OneSignal || [];
//     if (window.OneSignal) {
//         window.OneSignal.push([
//             "init",
//             {
//                 appId: "ceea18e8-322a-4748-b18b-fdf066d9a5ff",
//                 autoRegister: true /* Set to true to automatically prompt visitors */,
//                 persistNotification: false,
//                 subdomainName: "colorme",
//                 promptOptions: {
//                     /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
//                     /* actionMessage limited to 90 characters */
//                     actionMessage: "Bạn có muốn nhận thông báo từ trang này ?",
//                     /* acceptButtonText limited to 15 characters */
//                     acceptButtonText: "ĐỒNG Ý",
//                     /* cancelButtonText limited to 15 characters */
//                     cancelButtonText: "HỦY",
//                 },
//             },
//         ]);
//         window.OneSignal.sendTag("device_type", "manage", function(tagsSent) {
//             console.log("tag ok ", tagsSent);
//         });
//     }
// });