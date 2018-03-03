import * as orderGoodApi from "./orderGoodApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import {browserHistory} from 'react-router';

export function loadAllGoods() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_GOODS_ORDER_GOOD});
        orderGoodApi.loadAllGoods()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_GOODS_ORDER_GOOD_SUCCESS,
                        goods : res.data.data.goods,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_GOODS_ORDER_GOOD_ERROR});
                    browserHistory.push("/business/order-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_GOODS_ORDER_GOOD_ERROR});
                browserHistory.push("/business/order-good");
            });
    };
}


export function loadAllCompanies() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_COMPANIES_ORDER_GOOD});
        orderGoodApi.loadAllCompanies()
            .then((res) => {
                if(res.data.status == 1){
                    dispatch({
                        type: types.LOAD_ALL_COMPANIES_ORDER_GOOD_SUCCESS,
                        companies : res.data.data.companies,
                    });
                }else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({type: types.LOAD_ALL_COMPANIES_ORDER_GOOD_ERROR});
                    browserHistory.push("/business/order-good");
                }
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_ALL_COMPANIES_ORDER_GOOD_ERROR});
                browserHistory.push("/business/order-good");
            });
    };
}
