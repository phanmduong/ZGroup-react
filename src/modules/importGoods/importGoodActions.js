import * as types from '../../constants/actionTypes';
import * as importGoodsApi from './importGoodsApi';


export function loadImportOrders(startTime, endTime) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_IMPORT_ORDERS});
        importGoodsApi.loadImportOrders(startTime, endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_IMPORT_ORDERS_SUCCESS,
                    importOrders: res.data.data.import_orders,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_IMPORT_ORDERS_ERROR
            });
        });
    };
}

export function loadImportGoodsOrder(orderId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_IMPORT_GOOD_ORDERS});
        importGoodsApi.loadImportGoodsOrder(orderId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_IMPORT_GOOD_ORDERS_SUCCESS,
                    importOrder: res.data.data.import_order,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_IMPORT_GOOD_ORDERS_ERROR
            });
        });
    };
}

export function initDataImport() {
    return ({
        type: types.INIT_DATA_IMPORT_GOOD_ORDERS
    });

}

export function updateFormImportGood(formImportGood) {
    return ({
        type: types.UPDATE_FORM_IMPORT_GOOD,
        formImportGood
    })
}

export function storeImportGood(formImportGood) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_STORE_IMPORT_GOOD
        });
        importGoodsApi.createImportGoods(formImportGood)
            .then((res) => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.STORE_IMPORT_GOOD_SUCCESS
                    })
                } else {
                    dispatch({
                        type: types.STORE_IMPORT_GOOD_ERROR
                    })
                }
            })
            .catch(() => {
                dispatch({
                    type: types.STORE_IMPORT_GOOD_ERROR
                })
            })
    };
}


