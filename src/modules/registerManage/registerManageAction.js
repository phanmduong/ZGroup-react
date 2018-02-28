import * as types from "../../constants/actionTypes";
import * as helper from "../../helpers/helper";
import * as registerManageApi from "./registerManageApi";

export function loadAllRegisters(
    limit = 10,
    page = 1,
    search,
    saler_id,
    status,
    campaign_id,
    base_id,
    startTime,
    endTime,
    success,
) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTER_MANAGE,
        });
        registerManageApi
            .loadAllRegistersApi(
                limit,
                page,
                search,
                saler_id,
                status,
                campaign_id,
                base_id,
                startTime,
                endTime,
            )
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTER_MANAGE_SUCCESS,
                    registers: res.data.room_service_registers,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    totalCount: res.data.paginator.total_count,
                });
                if (success) success();
            });
    };
}


export function getAllSalers() {
    return function(dispatch) {
        registerManageApi.getAllSalerApi().then(res => {
            dispatch({
                type: types.GET_ALL_SALER_REGISTER_MANAGE,
                salers: res.data.data.salers,
            });
        });
    };
}

export function changeCallStatus(
    status,
    note,
    register_id,
    user_id,
    closeCallModal,
) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CALL_STATUS,
        });
        registerManageApi
            .changeCallStatusApi(status, note, register_id, user_id)
            .then(res => {
                if (res.data.status) {
                    closeCallModal();
                    dispatch({
                        type: types.LOADED_CHANGE_CALL_STATUS_SUCCESS,
                        teleCall: res.data.data.teleCall,
                        register_id: register_id,
                    });
                    status
                        ? helper.showNotification("Đã gọi")
                        : helper.showNotification("Chưa gọi được");
                } else {
                    dispatch({ type: types.LOADED_CHANGE_CALL_STATUS_ERROR });
                    helper.showErrorNotification("Đã xảy ra lỗi kkkk ");
                }
            });
    };
}

export function loadBasesData() {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_IN_REGISTER_MANAGE,
        });
        registerManageApi
            .loadBases()
            .then(res => {
                dispatch({
                    type: types.LOAD_BASES_IN_REGISTER_MANAGE_SUCCESS,
                    bases: res.data.data.bases,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_BASES_IN_REGISTER_MANAGE_ERROR,
                });
            });
    };
}

export const showGlobalLoading = () => {
    return dispatch => {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING,
        });
    };
};
export const hideGlobalLoading = () => {
    return dispatch => {
        dispatch({
            type: types.HIDE_GLOBAL_LOADING,
        });
    };
};
