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







