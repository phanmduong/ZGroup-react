import * as orderedGoodApi from "./orderedGoodApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import {browserHistory} from 'react-router';
//import {browserHistory} from 'react-router';

export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_ORDERED_GOOD});
        orderedGoodApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_ORDERED_GOOD_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_ORDERED_GOOD_ERROR});
                    browserHistory.push("/business/ordered-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_ORDERED_GOOD_ERROR});
                browserHistory.push("/business/ordered-good");
            });
    };
}


export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_ORDERED_GOOD});
        orderedGoodApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_ORDERED_GOOD_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_ORDERED_GOOD_ERROR});
                    browserHistory.push("/business/ordered-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_ORDERED_GOOD_ERROR});
                browserHistory.push("/business/ordered-good");
            });
    };
}

export function createOrderedGood(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_ORDERED_GOOD});
        orderedGoodApi.createOrderedGood(data)
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.CREATE_ORDERED_GOOD_SUCCESS,
                    });
                    helper.showNotification("Thêm thành công!");
                    browserHistory.push("/business/ordered-good");
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.CREATE_ORDERED_GOOD_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.CREATE_ORDERED_GOOD_ERROR});
            });
    };
}