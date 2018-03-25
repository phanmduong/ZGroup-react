import axios from 'axios';
import * as env from '../../constants/env';

export function getEmailCommentPostFB(postId, tokenFB) {
    let url = env.MANAGE_API_URL + "/email/email-post-facebook";
    let token = localStorage.getItem('token');
    if (token) {
        url += "?token=" + token;
    }
    return axios.post(url, {
        post_id: postId,
        token: tokenFB,
    });
}