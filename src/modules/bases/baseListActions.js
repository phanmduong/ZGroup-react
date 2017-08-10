/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as baseListApi from './baseListApi';
import toastr from 'toastr';
import {browserHistory} from 'react-router';

// import _ from 'lodash';

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
            throw (error);
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
            throw (error);
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
            throw (error);
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
                toastr.success(message);
                dispatch({
                    type: types.CREATE_BASE_SUCCESS
                });
                browserHistory.push('/base/list');
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
                const base = res.data.data;
                dispatch({
                    type: types.LOAD_BASE_SUCCESS,
                    base
                });
            });
    };
}


