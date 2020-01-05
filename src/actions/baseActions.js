import * as types from '../constants/actionTypes';
import {loadBasesApi} from "../apis/baseApis";

export function loadAllBases() {
    return function (dispatch) {
        loadBasesApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_BASES_GLOBAL,
                    bases: res.data.bases
                });
            })
            .catch(() => {
            });
    };
}

export function selectedBase(baseId) {
    return function (dispatch) {
        dispatch({
            type: types.SELECTED_BASE_GLOBAL,
            selectedBaseId: baseId
        });
    };
}
