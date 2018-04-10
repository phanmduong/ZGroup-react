import * as types from "./zWarehouseActionTypes";
import * as warehouseApi from "./warehouseApi";
import * as helper from "../../../helpers/helper";

export function loadSummaryGoods(page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_GOOD,
        });
        warehouseApi.loadSummaryGoods(page)
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