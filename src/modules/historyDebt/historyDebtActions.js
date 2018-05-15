import * as types from '../../constants/actionTypes';
import * as historyDebtApi from './historyDebtApi';
import * as helper from '../../helpers/helper';

export function loadCompanies(page = 1) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_COMPANIES,
        });
        historyDebtApi.loadCompanies(page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_COMPANIES_SUCCESS,
                    data: res.data.company,
                    paginator: res.data.paginator,
                });
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_COMPANIES_ERROR,
            });
        });
    };
}

export function loadHistoryDebt(id,page) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_DEBT,
        });
        historyDebtApi.loadHistoryDebt(id,page)
            .then((res) => {
                dispatch({
                    type: types.LOAD_HISTORY_DEBT_SUCCESS,
                    data: res.data["history-debt"],
                    paginator: res.data.paginator,
                });

            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_HISTORY_DEBT_ERROR,
            });
        });
    };
}

export function loadAllHistoryDebt(success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_HISTORY_DEBT,
        });
        historyDebtApi.loadAllHistoryDebt()
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_HISTORY_DEBT_SUCCESS,
                });
                success(res.data.data.companies);
            }).catch(() => {
            helper.showErrorNotification("Có lỗi xảy ra");
            dispatch({
                type: types.LOAD_ALL_HISTORY_DEBT_ERROR,
            });
        });
    };
}