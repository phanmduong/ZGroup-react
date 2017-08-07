/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../constants/actionTypes';
import * as baseApi from '../apis/baseApi';
import _ from 'lodash';

export function beginDataBaseLoad(){
    return {
        type: types.BEGIN_DATA_BASE_LOAD,
        isLoading: true,
        error: false
    };
}

export function loadDataBase() {
    return function (dispatch) {
        dispatch(beginDataBaseLoad());
        baseApi.loadBaseApi().then(function (res) {
            dispatch(loadDataSuccessful(res));
        }).catch(error => {
            dispatch(loadDataError());
            throw (error);
        });

    };
}

export function loadDataSuccessful(res) {
    return ({
        type: types.LOAD_DATA_BASE_SUCCESSFUL,
        baseData: _.reverse(res.data.bases),
        isLoading: false,
        error: false
    });
}

export function loadDataError() {
    return {
        type: types.LOAD_DATA_BASE_ERROR,
        isLoading: false,
        error: false
    };
}

export function selectedBaseId(id) {
    return {
        type: types.SELECTED_BASE_ID,
        selectedBaseId: id
    };
}