/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function baseListReducer(state = initialState.good, action) {
    switch (action.type) {
        case types.SAVE_GOOD_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isSaving: false,
                    good: {
                        properties: []
                    }
                }
            };
        case types.BEGIN_SAVE_GOOD:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isSaving: true
                }
            };
        case types.UPLOAD_COVER_SUCCESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingCover: false,
                    good: {
                        ...state.createGood.good,
                        cover_url: action.coverUrl
                    }
                }
            };
        case types.UPDATE_UPLOAD_COVER_PROGRESS:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    percentCover: action.percentCover
                }
            };
        case types.BEGIN_UPLOAD_COVER:
            return {
                ...state,
                createGood: {
                    ...state.createGood,
                    isUploadingCover: true
                }
            };

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
                        ...state.createGood.good,
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