import axios from "axios";

export function loadPosts(type, method, params, callback) {
    /* eslint-disable */
    FB.api(type, method, {...params}, callback);
    /* eslint-enable */
}

export function loadPaginatePosts(url) {
    return axios.get(url);
}
