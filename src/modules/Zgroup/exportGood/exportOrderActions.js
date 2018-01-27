import * as exportOrderApi from "./exportOrderApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
//import {browserHistory} from 'react-router';

export function loadExportOrders(page=1, search='',good_id='', company_id = '', warehouse_id='') {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_EXPORT_ORDERS});
        exportOrderApi.loadExportOrders(page, search,good_id, company_id, warehouse_id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_EXPORT_ORDERS_SUCCESS,
                    listExportOrder: res.data.exportorders,
                    paginator: res.data.paginator,
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_EXPORT_ORDERS_ERROR});
            });
    };
}
