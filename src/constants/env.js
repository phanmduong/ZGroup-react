const PROD_URL = "keetool.tk";
const DEV_URL = "keetoolclient.dev";
let URL;
if (process.env.NODE_ENV === 'development'){
    URL = DEV_URL;
} else {
    URL = PROD_URL;
}

export const API_URL = "http://api."+URL;
export const MANAGE_API_URL = "http://manageapi."+URL;
export const BASE_URL = "http://"+URL;

export const NAME_COMPANY = "zGroup";
export const LINK_LOGO_1 = "http://d2xbg5ewmrmfml.cloudfront.net/web/zgrouplogofulltoai.png";
export const LINK_LOGO_2 = "http://d2xbg5ewmrmfml.cloudfront.net/web/logo2.png";
export const SECRET_TOKEN = "KEEeducation";
export const EXPIRES_IN = "6d";
export const NAME_DATA_LOGIN_SAVE_LOCAL = "zgroup-token";

