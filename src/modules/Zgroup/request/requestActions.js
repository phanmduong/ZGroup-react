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
                    helper.showNotification("Thêm thành công!");
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
