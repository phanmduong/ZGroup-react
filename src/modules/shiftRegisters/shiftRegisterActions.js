import * as types from '../../constants/actionTypes';
import * as shiftRegisterApi from './shiftRegisterApi';
import * as helper from '../../helpers/helper';
import async from 'async';

/*eslint no-console: 0 */

export function loadGensAndBasesData() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_GENS_AND_BASES_SHIFT_REGISTERS
        });
        async.parallel({
            bases: function (callback) {
                shiftRegisterApi.loadBases()
                    .then(function (res) {
                        callback(null, {
                            bases: res.data.data.bases,
                        });
                    }).catch(function () {
                    callback("Có lỗi xảy ra");
                });
            },
            gens: function (callback) {
                shiftRegisterApi.loadGens()
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
                    type: types.LOAD_GENS_AND_BASES_SHIFT_REGISTERS_ERROR
                });
            } else {
                dispatch({
                    type: types.LOAD_GENS_AND_BASESS_SHIFT_REGISTERS_SUCCESS,
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
            type: types.BEGIN_LOAD_SHIFT_REGISTERS
        });
        shiftRegisterApi.loadShiftRegisters(baseId, genId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_SHIFT_REGISTERS_SUCCESS,
                    shiftRegisters: res.data.data.weeks,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_SHIFT_REGISTERS_ERROR
            });
        });
    };
}

export function updateDataRegister(shift) {
    return {
        type: types.UPDATE_DATA_SHIFT_REGISTER,
        shift: JSON.parse(shift)
    };
}

export function register(registerId) {
    return function (dispatch) {
        dispatch(postShiftRegister(registerId));
        shiftRegisterApi.register(registerId).then(function (res) {
            dispatch(updateDataRegister(JSON.stringify({
                id: registerId,
                user: res.data.data.user
            })));
            dispatch(shiftRegisterSuccessful(registerId));
        }).catch(() => {
            dispatch(ShiftRegisterError());
        });
    };
}

export function postShiftRegister(registerId) {
    return {
        type: types.POST_SHIFT_REGISTER,
        registerId: registerId,
        isLoadingRegister: true,
        isLoadingRegisterError: false,
    };
}

export function shiftRegisterSuccessful(registerId) {
    return {
        type: types.SHIFT_REGISTER_SUCCESSFUL,
        registerId: registerId,
        isLoadingRegister: false,
        isLoadingRegisterError: false,
    };
}

export function ShiftRegisterError(registerId) {
    return {
        type: types.SHIFT_REGISTER_ERROR,
        registerId: registerId,
        isLoadingRegister: false,
        isLoadingRegisterError: true,
    };
}

export function removeRegister(registerId) {
    return function (dispatch) {
        dispatch(postShiftRemoveRegister(registerId));
        shiftRegisterApi.removeRegister(registerId).then(function (res) {
            dispatch(updateDataRegister(JSON.stringify({
                id: registerId,
                user: null
            })));
            dispatch(shiftRemoveRegisterSuccessful(registerId, res));
        }).catch(() => {
            dispatch(ShiftRemoveRegisterError());
        });
    };
}

export function postShiftRemoveRegister(registerId) {
    return {
        type: types.POST_SHIFT_REMOVE_REGISTER,
        registerId: registerId,
        isLoadingRemoveRegister: true,
        isLoadingRemoveRegisterError: false,
    };
}

export function shiftRemoveRegisterSuccessful(registerId) {
    return {
        type: types.SHIFT_REMOVE_REGISTER_SUCCESSFUL,
        registerId: registerId,
        isLoadingRemoveRegister: false,
        isLoadingRemoveRegisterError: false,
    };
}

export function ShiftRemoveRegisterError(registerId) {
    return {
        type: types.SHIFT_REMOVE_REGISTER_ERROR,
        registerId: registerId,
        isLoadingRemoveRegister: false,
        isLoadingRemoveRegisterError: true,
    };
}






