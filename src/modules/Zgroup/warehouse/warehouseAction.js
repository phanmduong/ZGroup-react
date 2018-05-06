import * as types from "./zWarehouseActionTypes";
import * as warehouseApi from "./warehouseApi";
import * as helper from "../../../helpers/helper";

export function loadSummaryGoods(page, goodId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_GOOD,
        });
        warehouseApi.loadSummaryGoods(page, goodId)
            .then((res) => {
                    dispatch({
                        type: types.LOAD_SUMMARY_GOOD_SUCCESS,
                        data: res.data.goods,
                        paginator: res.data.paginator,
                    });
                }
            ).catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.LOAD_SUMMARY_GOOD_ERROR,
                });
            }
        );
    };
}

export function loadAllSummaryGoods(success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_SUMMARY_GOOD,
        });
        warehouseApi.loadAllSummaryGoods()
            .then((res) => {
                    dispatch({
                        type: types.LOAD_ALL_SUMMARY_GOOD_SUCCESS,
                    });
                    success(res.data.data.goods);
                }
            );
    };
}

export function loadHistoryGood(page, id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_GOOD,
        });
        warehouseApi.loadHistoryGood(page, id)
            .then((res) => {
                    dispatch({
                        type: types.LOAD_HISTORY_GOOD_SUCCESS,
                        data: res.data.historyGood,
                        paginator: res.data.paginator,
                    });
                }
            ).catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra");
                dispatch({
                    type: types.LOAD_HISTORY_GOOD_ERROR,
                });
            }
        );
    };
}

export function loadAllGood() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_GOOD,
        });
        warehouseApi.loadAllGoods()
            .then((res) => {
                dispatch({
                    data: res.data.data.goods,
                    type: types.LOAD_ALL_GOOD_SUCCESS,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra.");
            dispatch({
                type: types.LOAD_ALL_GOOD_ERROR,
            });
        });
    };
}