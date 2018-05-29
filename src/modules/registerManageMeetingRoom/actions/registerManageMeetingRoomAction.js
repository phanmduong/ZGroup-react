import types from "../constants/actionTypes";
// import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../../constants/actionTypes";
import * as helper from "../../../helpers/helper";
import * as registerManageMeetingRoomApi from "../apis/registerManageMeetingRoomApi";


export function loadAllBases() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES,
        });
        registerManageMeetingRoomApi
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

export function loadAllProvinces() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_PROVINCES,
        });
        registerManageMeetingRoomApi
            .loadProvincesApi()
            .then(res => {
                if (res.data.status) {
                    dispatch({
                        type: types.LOAD_PROVINCES_SUCCESS,
                        provinces: res.data.data.provinces,
                    });
                }
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_PROVINCES_ERROR,
                });
            });
    };
}


export function loadAllSalers() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_SALERS,
        });
        registerManageMeetingRoomApi.loadAllSalersApi().then(res => {
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

export function loadRooms(base_id, start_time, end_time) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ROOMS,
        });
        registerManageMeetingRoomApi.loadRoomsApi(base_id, start_time, end_time).then(res => {
            dispatch({
                type: types.LOAD_ROOMS_SUCCESS,
                rooms: res.data.data.rooms,
            });
        })
            .catch(() => {
                dispatch({
                    type: types.LOAD_ROOMS_ERROR
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
        registerManageMeetingRoomApi
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


export function savePayment(hour, minute, money, note, register_id, user_id, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_PAYMENT,
        });
        registerManageMeetingRoomApi.savePaymentApi(hour, minute, money, note, register_id, user_id)
            .then(res => {
                if (res.data.status) {
                    closeModal();
                    dispatch({
                        type: types.SAVED_PAYMENT_SUCCESS,
                        register_id: register_id,
                        payment: res.data.data.payment,
                    });
                    helper.showNotification("Lưu thành công");
                }
                else {
                    dispatch({type: types.SAVED_PAYMENT_ERROR});
                    helper.sweetAlertError("Lưu thất bại");
                }
            })
            .catch(() => {
                dispatch({type: types.SAVED_PAYMENT_ROOM_ERROR});
                helper.sweetAlertError("Lưu thất bại");
            });
    };

}


// export const showGlobalLoading = () => {
//     return dispatch => {
//         dispatch({
//             type: types.DISPLAY_GLOBAL_LOADING,
//         });
//     };
// };
// export const hideGlobalLoading = () => {
//     return dispatch => {
//         dispatch({
//             type: types.HIDE_GLOBAL_LOADING,
//         });
//     };
// };
export function updateRegister(register) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_REGISTER,
            register: register,
        });
    };
}

export function saveOfficialTime(closeDatetimeModal) {
    return function (dispatch, getState) {
        dispatch({
            type: types.BEGIN_CHANGE_OFFICIAL_TIME,
        });
        registerManageMeetingRoomApi.updateOfficialTimeApi(getState().registerManageMeetingRoom.register)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.CHANGE_OFFICIAL_TIME_SUCCESS,
                    });
                    helper.showNotification("Thay đổi ngày thành công");
                    closeDatetimeModal();
                }
                else {
                    dispatch({
                        type: types.CHANGE_OFFICIAL_TIME_ERROR,
                    });
                    helper.sweetAlertError('Thay đổi ngày thất bại ');
                }
            })
            .catch(() => {
                dispatch({
                    type: types.CHANGE_OFFICIAL_TIME_ERROR,
                });
                helper.sweetAlertError('Thay đổi ngày thất bại ');
            });
    };
}

export function openDatetimeModal(register) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_DATE_TIME_MODAL,
            register: register,
        });
    };
}

export function closeDatetimeModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_DATE_TIME_MODAL,
        });
    };
}

export function openPaymentModal(register) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_PAYMENT_MODAL,
            register: register,
        });
    };
}

export function closePaymentModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_PAYMENT_MODAL,
        });
    };
}


export function openAddRegisterModal() {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_ADD_REGISTER_MODAL,
        });
    };
}

export function closeAddRegisterModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_ADD_REGISTER_MODAL,
        });
    };
}

export function openConfirmModal(room_id) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_CONFIRM_MODAL,
            room_id : room_id,
        });
    };
}

export function closeConfirmModal() {
    return function (dispatch) {
        dispatch({
            type: types.CLOSE_CONFIRM_MODAL,
        });
    };
}

export function createRegister(register, close) {
    return (dispatch) => {
        dispatch({type: types.BEGIN_CREATE_REGISTER});
        registerManageMeetingRoomApi.createRegisterApi(register)
            .then((res) => {
                if (res.data.status) {
                    dispatch({
                        type: types.CREATE_REGISTER_SUCCESS,
                    });
                    helper.showNotification("Thêm đăng kí thành công");
                    dispatch(loadAllRegisters());
                    close();
                }
                else {
                    helper.showErrorNotification("Thêm thất bại");
                    dispatch({
                        type: types.CREATE_REGISTER_ERROR
                    });
                }
            });
    };
}



