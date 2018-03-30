import types from "../constants/actionTypes";
import * as helper from "../../../helpers/helper";
import * as registerManageMeetingRoomAction from "../apis/registerManageMeetingRoomApi";


export function loadAllBases() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES,
        });
        registerManageMeetingRoomAction
            .loadAllBasesApi()
            .then(res => {
                dispatch({
                    type: types.LOAD_BASES_SUCCESS,
                    bases: res.data.data.bases,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_BASES_ERROR,
                });
            });
    };
}

export function loadAllSalers() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SALERS,
        });
        registerManageMeetingRoomAction.loadAllSalersApi().then(res => {
            dispatch({
                type: types.LOAD_SALERS_SUCCESS,
                salers: res.data.data.salers,
            });
        })
            .catch(() => {
                dispatch({
                    type: types.LOAD_SALERS_ERROR
                });
            });
    };
}


export function loadAllRegisters(limit = 10,
                                 page = 1,
                                 search,
                                 saler_id,
                                 base_id,
                                 startTime,
                                 endTime,
                                 success,) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTERS,
        });
        registerManageMeetingRoomAction
            .loadAllRegistersApi(
                limit,
                page,
                search,
                saler_id,
                base_id,
                startTime,
                endTime,
            )
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTERS_SUCCESS,
                    registers: res.data.room_service_registers,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    totalCount: res.data.paginator.total_count,
                });
                if (success)
                    success();
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_REGISTERS_ERROR,
                });
            });
    };
}


export function changeCallStatus(status,
                                 note,
                                 register_id,
                                 user_id,
                                 closeCallModal,) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CALL_STATUS_ROOM,
        });
        registerManageMeetingRoomAction
            .changeCallStatusApi(status, note, register_id, user_id)
            .then(res => {
                if (res.data.status) {
                    closeCallModal();
                    dispatch({
                        type: types.LOADED_CHANGE_CALL_STATUS_ROOM_SUCCESS,
                        teleCall: res.data.data.teleCall,
                        register_id: register_id,
                    });
                    status
                        ? helper.showNotification("Đã gọi")
                        : helper.showNotification("Chưa gọi được");
                } else {
                    dispatch({type: types.LOADED_CHANGE_CALL_STATUS_ROOM_ERROR});
                    helper.showErrorNotification("Đã xảy ra lỗi kkkk ");
                }
            });
    };
}

export function savePayment(money, note, register_id, user_id, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_PAYMENT_ROOM,
        });
        registerManageMeetingRoomAction.savePaymentApi(money, note, register_id, user_id)
            .then(res => {
                if (res.data.status) {
                    closeModal();
                    dispatch({
                        type: types.SAVED_PAYMENT_ROOM_SUCCESS,
                        register_id: register_id,
                        payment: res.data.data.payment,
                    });
                    helper.showNotification("Lưu thành công");
                }
                else {
                    dispatch({type: types.SAVED_PAYMENT_ROOM_ERROR});
                    helper.showNotification("Lưu thất bại");
                }
            })
            .catch(() => {
                dispatch({type: types.SAVED_PAYMENT_ROOM_ERROR});
                helper.showNotification("Lưu thất bại");
            });
    };

}

export function openCallModal(register) {
    return dispatch => {
        dispatch({
            type: types.OPEN_CALL_MODAL,
            register: register,
        });
    };
}

export function closeCallModal() {
    return dispatch => {
        dispatch({
            type: types.CLOSE_CALL_MODAL,
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
