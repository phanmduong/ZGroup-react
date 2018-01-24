import * as printOrderApi from "./printOrderApi";
import * as helper from "../../helpers/helper";
import * as types from "../../constants/actionTypes";

export function loadPrintOrders(page=1, search='') {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_PRINT_ORDERS});
        printOrderApi.loadPrintOrders(page, search)
            .then((res) => {
                    dispatch({
                        type: types.LOAD_PRINT_ORDERS_SUCCESS,
                        listPrintOrder: res.data.printorders,
                        paginator: res.data.paginator,
                    });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({type: types.LOAD_PRINT_ORDERS_ERROR});
            });
    };
}