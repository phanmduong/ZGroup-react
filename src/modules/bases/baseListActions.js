/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as baseListApi from './baseListApi';
import toastr from 'toastr';
import {browserHistory} from 'react-router';
import * as helper from "../../helpers/helper";

// import _ from 'lodash';
/*eslint no-console: 0 */
export function resetBase() {
    return function (dispatch) {
        dispatch({
            type: types.RESET_CREATE_BASE_DATA
        });
    };
}


export function deleteBase(base) {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_BASE_SUCCESS,
            base
        });
        toastr.success("Xoá cơ sở thành công");
        baseListApi.deleteBase(base).catch(error => {
            console.log(error);
        });

    };
}

export function loadBases(page = 1, query = null) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES
        });
        baseListApi.loadBases(page, query).then(function (res) {
            dispatch({
                type: types.LOAD_BASES_SUCCESS,
                bases: res.data.bases,
                currentPage: res.data.paginator.current_page,
                totalPages: res.data.paginator.total_pages
            });
        }).catch(error => {
            console.log(error);
        });

    };
}


export function setDefaultBase(baseId) {
    return function (dispatch) {
        dispatch({
            type: types.SET_DEFAULT_BASE,
            baseId
        });
        baseListApi.setDefaultBase(baseId).then(function (res) {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });

    };
}

export function updateCreateBaseFormData(base) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_BASE_FORM_DATA,
            base
        });
    };
}

export function createBase(base) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_BASE_MODAL
        });
        baseListApi.createBase(base)
            .then(res => {
                const message = res.data.data.message;
                helper.showNotification(message);
                dispatch({
                    type: types.CREATE_BASE_SUCCESS_MODAL
                });
                browserHistory.push('/base/bases');
            });
        //     .catch(() => {
        //     helper.showErrorNotification('Có lỗi xảy ra');
        // });
    };
}

export function editBase(base) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_BASE_MODAL
        });
        baseListApi.editBase(base)
            .then(res => {
                const message = res.data.data.message;
                helper.showNotification(message);
                dispatch({
                    type: types.CREATE_BASE_SUCCESS_MODAL
                });
                browserHistory.push('/base/bases');
            });
        //     .catch(() => {
        //     helper.showErrorNotification('Có lỗi xảy ra');
        // });
    };
}

export function loadBase(baseId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASE
        });
        baseListApi.loadBase(baseId)
            .then(res => {
                const base = res.data.data.base;
                dispatch({
                    type: types.LOAD_BASE_SUCCESS,
                    base
                });
            });
    };
}

export function loadAllProvinces() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_PROVINCES_BASE
        });
        baseListApi.getAllProvinces()
            .then(res => {
                dispatch({
                    type: types.LOAD_ALL_PROVINCES_SUCCESS,
                    provinces: res.data.data.provinces
                });
            });
    };
}

export function uploadAvatar(file) {
    return function (dispatch) {
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_BASE_AVATAR_COMPLETE,
                avatar_url: data.url
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_BASE_AVATAR_PROGRESS,
                percent: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_BASE_AVATAR
        });

        baseListApi.uploadImage(file,
            completeHandler, progressHandler, error);
    };
}

export function uploadImage(file) {
    return function (dispatch) {
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh nền thành công");
            dispatch({
                type: types.UPLOAD_BASE_IMAGE_COMPLETE,
                image_url: data.url
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_BASE_IMAGE_PROGRESS,
                percent: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_BASE_IMAGE
        });

        baseListApi.uploadImage(file,
            completeHandler, progressHandler, error);
    };
}

export function showBaseEditModal() {
    return {
        type: types.TOGGLE_BASE_EDIT_MODAL
    };
}

export function handleBaseEditModal(base) {
    return {
        type: types.HANDLE_BASE_EDIT_MODAL,
        base
    };
}

export function handleDistricts(districts) {
    return {
        type: types.HANDLE_DISTRICTS_BASE_LIST,
        districts
    };
}

export function changeAvatar(file) {
    return function (dispatch) {
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_BASE_AVATAR_COMPLETE_MODAL,
                avatar_url: data.url
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_BASE_AVATAR_PROGRESS_MODAL,
                percent: percentComplete
            });
        };
        dispatch({
            type: types.BEGIN_UPLOAD_BASE_AVATAR_MODAL
        });
        baseListApi.changeAvatarApi(file,
            completeHandler, progressHandler, error);
    };
}

export function changeImage(file, length, first_length, type) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_ROOM,
            type_image: type
        });
        const error = () => {
            helper.showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            helper.showNotification("Tải lên ảnh thành công");
            dispatch({
                type: types.UPLOAD_IMAGE_COMPLETE_BASE_MODAL,
                image: data.url,
                length,
                first_length,
                type_image: type
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_BASE_AVATAR_PROGRESS_MODAL,
                percent: percentComplete,
                type_image: type
            });
        };
        baseListApi.changeAvatarApi(file,
            completeHandler, progressHandler, error);
    };
}

export function deleteImage(image, type) {
    return {
        type: types.DELETE_IMAGE_BASE_MODAL,
        image,
        type_image: type
    };
}


