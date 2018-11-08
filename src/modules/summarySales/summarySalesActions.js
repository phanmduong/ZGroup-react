import * as types from "../../constants/actionTypes";
import * as summarySalesApi from "./summarySalesApi";

/*eslint no-console: 0 */

export function loadGensData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_DATA_SUMMARY_SALES,
        });
        summarySalesApi
            .loadGens()
            .then(res => {
                dispatch({
                    type: types.LOAD_GENS_SUMMARY_SALES_SUCCESS,
                    gens: res.data.data.gens,
                    currentGen: res.data.data.current_gen,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_GENS_SUMMARY_SALES_ERROR,
                });
            });
    };
}

export function loadBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_DATA_SUMMARY_SALES,
        });
        summarySalesApi
            .loadBases()
            .then(res => {
                dispatch({
                    type: types.LOAD_BASES_SUMMARY_SALES_SUCCESS,
                    bases: res.data.data.bases,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_BASES_SUMMARY_SALES_ERROR,
                });
            });
    };
}

export function loadSummarySalesData(genId, baseId, startTime, endTime) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_SALES,
        });
        summarySalesApi
            .loadSummarySales(genId, baseId, startTime, endTime)
            .then(res => {
                dispatch({
                    type: types.LOAD_SUMMARY_SALES_SUCCESS,
                    summary: res.data.data.summary_sales ? res.data.data.summary_sales.reverse() : [],
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_SUMMARY_SALES_ERROR,
                });
            });
    };
}
