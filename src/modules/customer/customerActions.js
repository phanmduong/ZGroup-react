import * as types from '../../constants/actionTypes';
import * as customerApis from './customerApis';
// import * as helper from '../../helpers/helper';

export function loadCustomers( page , limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CUSTOMER
        });
        customerApis.loadCustomersApi(limit, page ,query)
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_CUSTOMER_SUCCESS,
                    customersList : res.data.customers,
                    total_pages : res.data.paginator.total_pages,
                    total_count : res.data.paginator.total_count,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_CUSTOMER_ERROR,
                });
            });

    };
}
export function loadTotalAndDebtMoney() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TOTAL_AND_DEBT_MONEY
        });
        customerApis.loadCustomersApi()
            .then( (res) =>  {
                dispatch({
                    type : types.LOADED_TOTAL_AND_DEBT_MONEY_SUCCESS,
                    total_moneys : res.data.data.total_moneys,
                    total_debt_moneys : res.data.data.total_debt_moneys,
                });
            })
            .catch(() => {
                dispatch ({
                    type : types.LOADED_TOTAL_AND_DEBT_MONEY_ERROR,
                });
            });
    };
}