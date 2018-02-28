import * as types from '../../constants/actionTypes';
import * as summarySalesApi from './summarySalesApi';

/*eslint no-console: 0 */


export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_SUMMARY_SALES_UP
        });
        summarySalesApi.loadBases()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_SUMMARY_SALES_SUCCESS_UP,
                    bases: res.data.data.bases,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_SUMMARY_SALES_ERROR_UP
            });
        });
    };
}

export function loadSummarySalesData( baseId, startTime,endTime,success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_SALES_UP
        });
        summarySalesApi.loadSummarySales( baseId, startTime,endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SUMMARY_SALES_SUCCESS_UP,
                    summary: res.data.data.summary_sales,
                });
                success();
            }).catch(() => {
            dispatch({
                type: types.LOAD_SUMMARY_SALES_ERROR_UP
            });
        });
    };
}







