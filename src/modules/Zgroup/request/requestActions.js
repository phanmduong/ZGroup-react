import * as requestApi from "./requestApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import { browserHistory } from "react-router";
import moment from "moment";
import { DATE_FORMAT, DATETIME_FORMAT_SQL } from '../../../constants/constants';

export function createRequestVacation(data) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_VACATION });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi
            .createRequestVacation(data)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.CREATE_REQUEST_VACATION_SUCCESS,
                    });
                    helper.showNotification("Yêu cầu thành công!");
                    browserHistory.push("/administration/request/vacation");
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.CREATE_REQUEST_VACATION_ERROR });
                }
            });

    };
}

export function editRequestVacation(id, data) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_VACATION });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi.editRequestVacation(id, data)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.CREATE_REQUEST_VACATION_SUCCESS,
                    });
                    helper.showNotification("Yêu cầu thành công!");
                    browserHistory.push("/administration/request/vacation");
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.CREATE_REQUEST_VACATION_ERROR });
                }
            });

    };
}

export function createRequestMoney(data) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_MONEY });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi
            .createRequestMoney(data)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.CREATE_REQUEST_MONEY_SUCCESS,
                    });
                    helper.showNotification("Yêu cầu thành công!");
                    browserHistory.push("/administration/request/money");
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.CREATE_REQUEST_MONEY_ERROR });
                }
            });

    };
}

export function editRequestMoney(id, data) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_MONEY });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi.editRequestMoney(id, data)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.CREATE_REQUEST_MONEY_SUCCESS,
                    });
                    helper.showNotification("Yêu cầu thành công!");
                    browserHistory.push("/administration/request/money");
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.CREATE_REQUEST_MONEY_ERROR });
                }
            });

    };
}

export function getRequestVacation(id, success) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_GET_DETAIL_REQUEST_VACATION });

        requestApi.getRequestVacation(id)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.GET_DETAIL_REQUEST_VACATION_SUCCESS,
                        data: res.data,
                    });
                    let request = res.data.data.request;
                    request.start_time = moment(request.start_time, [DATE_FORMAT, DATETIME_FORMAT_SQL]).format(DATE_FORMAT);
                    request.end_time = moment(request.end_time, [DATE_FORMAT, DATETIME_FORMAT_SQL]).format(DATE_FORMAT);
                    success(request);
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.GET_DETAIL_REQUEST_VACATION_ERROR });
                    browserHistory.push("/administration/request/vacation");
                }
            });

    };
}

export function getRequestMoney(id, success) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_GET_DETAIL_REQUEST_MONEY });
        requestApi.getRequestMoney(id)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.GET_DETAIL_REQUEST_MONEY_SUCCESS,
                        data: res.data,
                    });
                    success(res.data.data.request);
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.GET_DETAIL_REQUEST_MONEY_ERROR });
                    browserHistory.push("/administration/request/money");
                }
            });

    };
}

export function getRequestMoneyNoPaging(success, failure) {
    return function (dispatch) {
        dispatch({ type: "" });
        requestApi.getRequestMoneyNoPaging()
            .then(res => {
                if (res.data.status == 1) {
                    success(res.data.data.data);
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    failure();
                }
            });

    };
}

export function getRequestVacationNoPaging(success, failure) {
    return function (dispatch) {
        dispatch({ type: "" });
        requestApi.getRequestVacationNoPaging()
            .then(res => {
                if (res.data.status == 1) {
                    success(res.data.data.requestVacation);
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    failure();
                }
            });

    };
}

export function getAllRequestVacation(info) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_GET_ALL_REQUEST_VACATION });
        requestApi.getAllRequestVacation(info)
            .then(res => {

                dispatch({
                    type: types.GET_ALL_REQUEST_VACATION_SUCCESS,
                    data: res.data,
                });
            });

    };
}

export function getAllRequestMoney(info) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_GET_ALL_REQUEST_MONEY });

        requestApi.getAllRequestMoney(info)
            .then(res => {

                dispatch({
                    type: types.GET_ALL_REQUEST_MONEY_SUCCESS,
                    data: res.data,
                });

            });

    };
}


export function confirmPayRequest(id, money, company_pay_id, success) {
    return function (dispatch) {
        dispatch({ type: "" });
        helper.showWarningNotification("Đang duyệt...");
        requestApi.confirmPayRequest(id, money, company_pay_id)
            .then(res => {
                if (res.data.status == 1) {
                    helper.showNotification("Duyệt thành công!");
                    success();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");

                }
            });

    };
}

export function confirmReceiveRequest(id, money, date, company_receive_id, success) {
    return function (dispatch) {
        dispatch({ type: "" });
        helper.showWarningNotification("Đang duyệt...");
        requestApi.confirmReceiveRequest(id, money, date, company_receive_id)
            .then(res => {
                if (res.data.status == 1) {
                    helper.showNotification("Duyệt thành công!");
                    success();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");

                }
            });

    };
}

export function confirmRequestVacation(id, success) {
    return function (dispatch) {
        dispatch({ type: "" });
        helper.showWarningNotification("Đang duyệt...");
        requestApi.confirmRequestVacation(id)
            .then(res => {
                if (res.data.status == 1) {
                    helper.showNotification("Duyệt thành công!");
                    success();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");

                }
            });

    };
}

export function loadAllCompany() {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_LOAD_ALL_COMPANY });
        requestApi.loadAllCompany()
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.LOAD_ALL_COMPANY_SUCCESS,
                        companies: res.data.data.company,
                    });
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.LOAD_ALL_COMPANY_ERROR });
                }
            });

    };
}