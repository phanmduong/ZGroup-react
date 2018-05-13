import types from "../constants/actionTypes";
// import {DISPLAY_GLOBAL_LOADING, HIDE_GLOBAL_LOADING} from "../../../constants/actionTypes";
import * as helper from "../../../helpers/helper";
import * as registerManageMeetingRoomApi from "../apis/registerManageMeetingRoomApi";



export function submitBooking(data, success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_REGISTER_ROOMS,
        });
        registerManageMeetingRoomApi
            .submitBooking(data)
            .then(() => {
                dispatch({
                    type: types.REGISTER_ROOMS_SUCCESS,
                });
                success();
            })
            .catch(() => {
                dispatch({
                    type: types.REGISTER_ROOMS_ERROR,
                });
            });
    };
}

export function loadRooms() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ROOMS,
        });
        registerManageMeetingRoomApi
            .loadRooms()
            .then(res => {
                dispatch({
                    type: types.LOAD_ROOMS_SUCCESS,
                    rooms: res.data.data.rooms,
                });

            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_ROOMS_ERROR,
                });
            });
    };
}

export function loadAllCampaigns() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CAMPAIGNS,
        });
        registerManageMeetingRoomApi
            .loadCampaigns()
            .then(res => {
                dispatch({
                    type: types.LOAD_CAMPAIGNS_SUCCESS,
                    campaigns: res.data.data.marketing_campaigns,
                });

            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_CAMPAIGNS_ERROR,
                });
            });
    };
}


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


export function loadAllRegisters(filter, success) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTERS_LIST,
        });
        helper.showNotification("test 1");
        registerManageMeetingRoomApi
            .loadAllRegistersApi(filter)
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTERS_LIST_SUCCESS,
                    registers: res.data.data,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    totalCount: res.data.paginator.total_count,
                });
                helper.showNotification("test 2");
                if (success)
                    success();
                    
            })
            .catch((err) => {
                helper.showNotification("test 3");
                console.log(err);
                dispatch({
                    type: types.LOAD_REGISTERS_LIST_ERROR,
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
                    dispatch({ type: types.SAVED_PAYMENT_ERROR });
                    helper.sweetAlertError("Lưu thất bại");
                }
            })
            .catch(() => {
                dispatch({ type: types.SAVED_PAYMENT_ROOM_ERROR });
                helper.sweetAlertError("Lưu thất bại");
            });
    };

}


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


