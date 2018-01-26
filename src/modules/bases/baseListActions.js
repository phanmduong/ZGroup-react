/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as baseListApi from './baseListApi';
import toastr from 'toastr';
import {browserHistory} from 'react-router';
import {showErrorNotification, showNotification} from "../../helpers/helper";

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
            type: types.BEGIN_CREATE_BASE
        });
        baseListApi.createBase(base)
            .then(res => {
                const message = res.data.data.message;
                showNotification(message);
                dispatch({
                    type: types.CREATE_BASE_SUCCESS
                });
                browserHistory.push('/base/bases');
            }).catch(() => {
            showErrorNotification('Có lỗi xảy ra');
        });
    };
}

export function editBase(base) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_BASE
        });
        baseListApi.editBase(base)
            .then(res => {
                const message = res.data.data.message;
                showNotification(message);
                dispatch({
                    type: types.CREATE_BASE_SUCCESS
                });
                browserHistory.push('/base/bases');
            }).catch(() => {
            showErrorNotification('Có lỗi xảy ra');
        });
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
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên ảnh đại diện thành công");
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
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            showNotification("Tải lên ảnh nền thành công");
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


