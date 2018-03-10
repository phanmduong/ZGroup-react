import * as types from '../../constants/actionTypes';
import * as summarySalesApi from './summarySalesApi';

/*eslint no-console: 0 */



export function loadSummarySalesData( startTime,endTime,success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_SALES_UP
        });
        summarySalesApi.loadSummarySales( startTime,endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SUMMARY_SALES_SUCCESS_UP,
                    summary: res.data.data.summary_sales,
                });
                success();
            })
            .catch(() => {
            dispatch({
                type: types.LOAD_SUMMARY_SALES_ERROR_UP
            });
        });
    };
}







