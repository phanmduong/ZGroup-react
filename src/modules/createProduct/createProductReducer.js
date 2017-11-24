import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function createProductReducer(state = initialState.createProduct, action) {
    switch (action.type) {
        case types.GET_MANUFACTURES_CREATE_PRODUCT:
            return {
                ...state,
                manufactures: action.manufactures
            };
        case types.GET_CATEGORIES_CREATE_PRODUCT:
            return {
                ...state,
                categories: action.categories
            };
        case types.UPLOAD_AVATAR_COMPLETE_CREATE_PRODUCT:
            return {
                ...state,
                avatar_url: action.avatar_url,
                isUploadingAvatar: false
            };
        case types.UPDATE_AVATAR_PROGRESS_CREATE_PRODUCT:
            return {
                ...state,
                percent: action.percent
            };
        case types.BEGIN_UPLOAD_AVATAR_CREATE_PRODUCT:
            return {
                ...state,
                isUploadingAvatar: true
            };
        case types.UPLOAD_IMAGE_COMPLETE_CREATE_PRODUCT:
            return {
                ...state,
                images: [...state.images, action.image],
                isUploadingImage: false
            };
        case types.UPDATE_IMAGE_PROGRESS_CREATE_PRODUCT:
            return {
                ...state,
                percent: action.percent
            };
        case types.BEGIN_UPLOAD_IMAGE_CREATE_PRODUCT:
            return {
                ...state,
                isUploadingImage: true
            };
        default:
            return state;
    }
}
