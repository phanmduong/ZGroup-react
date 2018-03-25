import * as types from '../../constants/actionTypes';
import * as emailCommentFBApi from './emailCommentFBApi';
import {showErrorNotification} from "../../helpers/helper";

export function getEmailCommentFB(postID, tokenFB) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_EMAIL_COMMENTS_POST_FACEBOOK,
        });
        emailCommentFBApi.getEmailCommentPostFB(postID, tokenFB)
            .then(res => {
                dispatch({
                    type: types.LOAD_EMAIL_COMMENTS_POST_FACEBOOK_SUCCESS,
                    emails: res.data.data.emails,
                });
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.LOAD_EMAIL_COMMENTS_POST_FACEBOOK_ERROR,
                });
            });
    };
}
