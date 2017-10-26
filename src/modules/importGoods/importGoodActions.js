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
            }).catch(()=>{
            dispatch({
                type: types.LOAD_IMPORT_ORDERS_ERROR
            });
        });
    };
}


