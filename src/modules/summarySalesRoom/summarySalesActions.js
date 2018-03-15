import * as types from '../../constants/actionTypes';
import * as summarySalesApi from './summarySalesApi';

/*eslint no-console: 0 */


export function loadSummarySalesData(startTime, endTime ,baseId,success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_SALES_ROOM
        });
        summarySalesApi.loadSummarySales(startTime, endTime,baseId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SUMMARY_SALES_SUCCESS_ROOM,
                    summary: res.data.data.summary_sales,
                });
                success();
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_SUMMARY_SALES_ERROR_ROOM
                });
            });
    };
}

export function loadBases() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_IN_SUMMARY_SALE_ROOM,
        });
        summarySalesApi.loadBasesApi()
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.LOADED_BASES_SUCCESS_IN_SUMMARY_SALE_ROOM,
                        bases: res.data.data.bases,
                    });
                }
                else{
                    dispatch({
                        type: types.LOADED_BASES_ERROR_IN_SUMMARY_SALE_ROOM,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_BASES_ERROR_IN_SUMMARY_SALE_ROOM,
                });
            });
    };
}







