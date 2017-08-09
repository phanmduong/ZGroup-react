const PROD_URL = "zgroup.ga";
const DEV_URL = "zgroup.dev";
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
export const LINK_LOGO = "zGroup";

