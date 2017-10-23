import * as types from '../../constants/actionTypes';
import * as goodOrdersApi from './goodOrdersApi';

export function loadAllOrders(page = 1, search = '', startTime = '', endTime = '') {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_GOOD_ORDERS});
        goodOrdersApi.loadAllOrders(page, search, startTime, endTime)
            .then((res) => {
                dispatch({
                    type: types.LOAD_GOOD_ORDERS_SUCCESS,
                    totalOrder: res.data.total_order,
                    totalMoney: res.data.total_money,
                    totalPaidMoney: res.data.total_paid_money,
                    orders: res.data.orders,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    limit: res.data.paginator.limit,
                    totalCount: res.data.paginator.total_count
                });
            }).catch(()=>{
            dispatch({
               type: types.LOAD_GOOD_ORDERS_ERROR
            });
        });
    };
}
