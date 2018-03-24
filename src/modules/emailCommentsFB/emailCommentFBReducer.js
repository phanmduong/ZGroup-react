/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function emailCommentFBReducer(state = initialState.emailCommentFB, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_EMAIL_COMMENTS_POST_FACEBOOK:
            return {
                ...state,
                isGetting: true,
                error: false,
            };
        case types.LOAD_EMAIL_COMMENTS_POST_FACEBOOK_SUCCESS:
            return {
                ...state,
                isGetting: false,
                error: false,
                emails: action.emails,
            };
        case types.LOAD_EMAIL_COMMENTS_POST_FACEBOOK_ERROR:
            return {
                ...state,
                isGetting: false,
                error: true
            };
        default:
            return state;
    }
}
