import * as types from '../../constants/actionTypes';
import * as workShiftRegisterApi from './workShiftRegisterApi';
import * as helper from '../../helpers/helper';
import async from 'async';

/*eslint no-console: 0 */

export function loadGensAndBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_AND_BASES_WORK_SHIFT_REGISTERS
        });
        async.parallel({
            bases: function (callback) {
                workShiftRegisterApi.loadBases()
                    .then(function (res) {
                        callback(null, {
                            bases: res.data.data.bases,
                        });
                    }).catch(function () {
                    callback("Có lỗi xảy ra");
                });
            },
            gens: function (callback) {
                workShiftRegisterApi.loadGens()
                    .then((response) => {
                        callback(null, {
                            gens: response.data.data.gens,
                            currentGen: response.data.data.current_gen
                        });
                        console.log("ok");
                    }).catch(() => {
                    // callback("Có lỗi xảy ra");
                });
            }
        }, (err, results) => {
            if (err) {
                helper.showErrorNotification("Có lỗi xảy ra. Thử lại");
                dispatch({
                    type: types.LOAD_GENS_AND_BASES_WORK_SHIFT_REGISTERS_ERROR
                });
            } else {
                dispatch({
                    type: types.LOAD_GENS_AND_BASESS_WORK_SHIFT_REGISTERS_SUCCESS,
                    gens: results.gens.gens,
                    currentGen: results.gens.currentGen,
                    bases: results.bases.bases
                });
            }
        });

    };
}

export function loadShiftRegisters(baseId, genId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_WORK_SHIFT_REGISTERS
        });
        workShiftRegisterApi.loadShiftRegisters(baseId, genId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_WORK_SHIFT_REGISTERS_SUCCESS,
                    shiftRegisters: res.data.data.weeks,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_WORK_SHIFT_REGISTERS_ERROR
            });
        });
    };
}

export function updateDataRegister(shift) {
    return {
        type: types.UPDATE_DATA_WORK_SHIFT_REGISTER,
        shift: JSON.parse(shift)
    };
}

export function register(registerId) {
    return function (dispatch) {
        dispatch(postShiftRegister(registerId));
        workShiftRegisterApi.register(registerId).then(function (res) {
            if (res.data.status === 1) {
                dispatch(updateDataRegister(JSON.stringify({
                    id: registerId,
                    user: res.data.data.user,
                    type: 'add'
                })));
                dispatch(shiftRegisterSuccessful(registerId));
            } else {
                dispatch(ShiftRegisterError());
            }
        }).catch(() => {
            dispatch(ShiftRegisterError());
        });
    };
}

export function postShiftRegister(registerId) {
    return {
        type: types.POST_WORK_SHIFT_REGISTER,
        registerId: registerId,
        isLoadingRegister: true,
        isLoadingRegisterError: false,
    };
}

export function shiftRegisterSuccessful(registerId) {
    return {
        type: types.WORK_SHIFT_REGISTER_SUCCESSFUL,
        registerId: registerId,
        isLoadingRegister: false,
        isLoadingRegisterError: false,
    };
}

export function ShiftRegisterError(registerId) {
    return {
        type: types.WORK_SHIFT_REGISTER_ERROR,
        registerId: registerId,
        isLoadingRegister: false,
        isLoadingRegisterError: true,
    };
}

export function removeRegister(registerId) {
    return function (dispatch) {
        dispatch(postShiftRemoveRegister(registerId));
        workShiftRegisterApi.removeRegister(registerId).then(function (res) {
            if (res.data.status === 1) {
                dispatch(updateDataRegister(JSON.stringify({
                    id: registerId,
                    user: res.data.data.user,
                    type: 'remove'
                })));
                dispatch(shiftRemoveRegisterSuccessful(registerId, res));
            } else {
                dispatch(ShiftRemoveRegisterError());
            }

        }).catch(() => {
            dispatch(ShiftRemoveRegisterError());
        });
    };
}

export function postShiftRemoveRegister(registerId) {
    return {
        type: types.POST_WORK_SHIFT_REMOVE_REGISTER,
        registerId: registerId,
        isLoadingRemoveRegister: true,
        isLoadingRemoveRegisterError: false,
    };
}

export function shiftRemoveRegisterSuccessful(registerId) {
    return {
        type: types.WORK_SHIFT_REMOVE_REGISTER_SUCCESSFUL,
        registerId: registerId,
        isLoadingRemoveRegister: false,
        isLoadingRemoveRegisterError: false,
    };
}

export function ShiftRemoveRegisterError(registerId) {
    return {
        type: types.WORK_SHIFT_REMOVE_REGISTER_ERROR,
        registerId: registerId,
        isLoadingRemoveRegister: false,
        isLoadingRemoveRegisterError: true,
    };
}

export function loadDetailShiftsUser(baseId, genId, week, userId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_USERS_WORK_SHIFTS
        });
        workShiftRegisterApi.loadDetailShiftsUser(baseId, genId, week, userId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_USERS_WORK_SHIFTS_SUCCESS,
                    detailShifts: res.data.data.detail_shifts,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_USERS_WORK_SHIFTS_ERROR
            });
        });
    };
}





