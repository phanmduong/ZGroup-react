/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import * as baseListApi from './baseListApi';
import toastr from 'toastr';
import {browserHistory} from 'react-router';
// import _ from 'lodash';

export function loadBases(page = 1) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES
        });
        baseListApi.loadBases(page).then(function (res) {
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


