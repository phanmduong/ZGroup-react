/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as goodApi from './goodApi';
import {showErrorNotification, showNotification} from "../../helpers/helper";
import {browserHistory} from 'react-router';

// import _ from 'lodash';
/*eslint no-console: 0 */
export function loadGoods(page = 1, query = null) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOODS
        });
        goodApi.loadGoods(page, query)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOODS_SUCCESS,
                    goods: res.data.goods,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            });

    };
}

export function updateGoodFormData(good) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_GOOD_FORM_DATA,
            good
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
            console.log(data);
            showNotification("Tải lên ảnh đại diện thành công");
            dispatch({
                type: types.UPLOAD_GOOD_AVATAR_COMPLETE,
                avatar_url: data.link
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_GOOD_AVATAR_PROGRESS,
                percent: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_GOOD_AVATAR
        });

        goodApi.uploadAvatar(file,
            completeHandler, progressHandler, error);
    };
}

export function uploadCover(file) {
    return function (dispatch) {
        const error = () => {
            showErrorNotification("Có lỗi xảy ra");
        };
        const completeHandler = (event) => {
            const data = JSON.parse(event.currentTarget.responseText);
            console.log(data);
            showNotification("Tải lên ảnh nền thành công");
            dispatch({
                type: types.UPLOAD_COVER_SUCCESS,
                coverUrl: data.link
            });
        };
        const progressHandler = (event) => {
            const percentComplete = Math.round((100 * event.loaded) / event.total);
            dispatch({
                type: types.UPDATE_UPLOAD_COVER_PROGRESS,
                percentCover: percentComplete
            });
        };

        dispatch({
            type: types.BEGIN_UPLOAD_COVER
        });

        goodApi.uploadAvatar(file,
            completeHandler, progressHandler, error);
    };
}

export function saveGood(good) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_GOOD
        });

        goodApi.saveGood(good)
            .then(() => {
                browserHistory.push("/good/all");
                showNotification("Thêm sản phẩm thành công");
                dispatch({
                    type: types.SAVE_GOOD_SUCCESS
                });
            });
    };
}


export function loadGood(good){
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GOODS
        });

        goodApi.loadGood(good)
            .then((res) => {
                dispatch({
                    
                })
            })
    };
}