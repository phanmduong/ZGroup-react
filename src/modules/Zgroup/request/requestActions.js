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
            });
            
    };
}

export function editRequestMoney(id,data) {
    return function(dispatch) {
        dispatch({ type: types.BEGIN_CREATE_REQUEST_MONEY });
        helper.showWarningNotification("Đang yêu cầu...");
        requestApi.editRequestMoney(id,data)
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
            
    };
}

export function getAllRequestVacation(info) {
    return function(dispatch) {
        dispatch({ type: types.BEGIN_GET_ALL_REQUEST_VACATION });
        requestApi.getAllRequestVacation(info)
            .then(res => {
                // if (res.data.status == 1) {
                    dispatch({
                        type: types.GET_ALL_REQUEST_VACATION_SUCCESS,
                        data: res.data,
                    });
                // } else {
                //     helper.showErrorNotification("Có lỗi xảy ra.");
                //     dispatch({ type: types.GET_ALL_REQUEST_VACATION_ERROR });
                // }
            });
            
    };
}

export function getAllRequestMoney(info) {
    return function(dispatch) {
        dispatch({ type: types.BEGIN_GET_ALL_REQUEST_MONEY });
        //helper.showWarningNotification("BEGIN_GET_ALL_REQUEST_MONEY");
        requestApi.getAllRequestMoney(info)
            .then(res => {
                //helper.showNotification("GET_ALL_REQUEST_MONEY_SUCCESS");
                //if (res.data.status == 1) {
                    dispatch({
                        type: types.GET_ALL_REQUEST_MONEY_SUCCESS,
                        data: res.data,
                    });
                // } else {
                //     helper.showErrorNotification("Có lỗi xảy ra.");
                //     dispatch({ type: types.GET_ALL_REQUEST_MONEY_ERROR });
                // }
            });
            
    };
}


export function confirmPayRequest(id, money, success) {
    return function(dispatch) {
        dispatch({ type: "" });
        helper.showWarningNotification("Đang duyệt...");
        requestApi.confirmPayRequest(id,money)
            .then(res => {
                if (res.data.status == 1) {
                    
                    helper.showNotification("Duyệt thành công!");
//                    getAllRequestMoney();
                    success();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    
                }
            });
            
    };
}

export function confirmReceiveRequest(id, money, success) {
    return function(dispatch) {
        dispatch({ type: "" });
        helper.showWarningNotification("Đang duyệt...");
        requestApi.confirmReceiveRequest(id,money)
            .then(res => {
                if (res.data.status == 1) {
                    
                    helper.showNotification("Duyệt thành công!");
                    //getAllRequestMoney();
                    success();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra.");
                    
                }
            });
            
    };
}