import * as requestApi from "./requestApi";
import * as helper from "../../../helpers/helper";
import * as types from "../../../constants/actionTypes";
import { browserHistory } from "react-router";

export function createRequestVacation(data) {
    return function(dispatch) {
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
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({ type: types.CREATE_REQUEST_VACATION_ERROR });
            });
    };
}

export function editRequestVacation(id,data) {
    return function(dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_VACATION });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi.editRequestVacation(id,data)
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
            // .catch(() => {
            //     helper.showErrorNotification("Có lỗi xảy ra.");
            //     dispatch({ type: types.CREATE_REQUEST_VACATION_ERROR });
            // });
    };
}

export function createRequestMoney(data) {
    return function(dispatch) {
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
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra.");
                dispatch({ type: types.CREATE_REQUEST_MONEY_ERROR });
            });
    };
}

export function editRequestMoney(data) {
    return function(dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_MONEY });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi.editRequestMoney(data)
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
            // .catch(() => {
            //     helper.showErrorNotification("Có lỗi xảy ra.");
            //     dispatch({ type: types.CREATE_REQUEST_MONEY_ERROR });
            // });
    };
}

export function getRequestVacation(id, success) {
    return function(dispatch) {
        dispatch({ type: types.BEGIN_GET_DETAIL_REQUEST_VACATION });
        requestApi.getRequestVacation(id)
            .then(res => {
                if (res.data.status == 1) {
                    dispatch({
                        type: types.GET_DETAIL_REQUEST_VACATION_SUCCESS,
                        data: res.data,
                    });
                    success(res.data.data.request);
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    dispatch({ type: types.GET_DETAIL_REQUEST_VACATION_ERROR });
                    browserHistory.push("/administration/request/vacation");
                }
            });
            // .catch(() => {
            //     helper.showErrorNotification("Có lỗi xảy ra.");
            //     dispatch({ type: types.GET_DETAIL_REQUEST_VACATION_ERROR });
            //     browserHistory.push("/administration/request/vacation");
            // });
    };
}

export function getRequestMoney(id, success) {
    return function(dispatch) {
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
            // .catch(() => {
            //     helper.showErrorNotification("Có lỗi xảy ra.");
            //     dispatch({ type: types.GET_DETAIL_REQUEST_MONEY_ERROR });
            //     browserHistory.push("/administration/request/money");
            // });
    };
}
