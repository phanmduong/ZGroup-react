import * as types from '../constants/actionTypes';
import {loadProvincesApi} from "../apis/provinceApis";

export function loadAllProvinces() {
    return function (dispatch) {
        loadProvincesApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_PROVINCES_GLOBAL,
                    provinces: res.data.provinces
                });
            })
            .catch(() => {
            });
    };
}
