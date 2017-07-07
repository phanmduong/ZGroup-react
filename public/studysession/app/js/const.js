let BASE_URL = "http://phanmduong.ml/api/";

if (process.env.NODE_ENV === "development") {
    BASE_URL = "http://colorme.dev/api/";
}

export {
    BASE_URL
};