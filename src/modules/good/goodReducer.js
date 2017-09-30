/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.good, action) {
    switch (action.type) {
        case types.UPDATE_GOOD_AVATAR_PROGRESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    percent: action.percent
                }
            };
        case types.UPLOAD_GOOD_AVATAR_COMPLETE:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingAvatar: false,
                    good: {
                        ...state.createGood,
                        avatar_url: action.avatar_url
                    }
                }
            };
        case types.BEGIN_UPLOAD_GOOD_AVATAR:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingAvatar: true
                }
            };
        case types.BEGIN_LOAD_GOODS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    isLoading: true
                }
            };
        case types.UPDATE_GOOD_FORM_DATA:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    good: {...action.good}
                }
            };
        case types.LOAD_GOODS_SUCCESS:
            return {
                ...state,
                goodList: {
                    ...state.goodList,
                    isLoading: false,
                    goods: action.goods,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        default:
            return state;
    }

}