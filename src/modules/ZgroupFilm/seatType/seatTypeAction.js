import * as seatTypeApi from "./seatTypeApi";
import * as types from "./seatTypeActiontypes";
import * as helper from "../../../helpers/helper";

export function loadAllSeatTypes(id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_ALL_SEAT_TYPES
        });
        seatTypeApi.loadAllSeatTypesApi(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_ALL_SEAT_TYPES_SUCCESS,
                    seatTypes: res.data.data.seat_types
                });
            });
    };
}

export function toggleSeatTypeModal() {
    return ({
        type: types.TOGGLE_SEAT_TYPE_MODAL,
    });
}

export function handleSeatTypeModal(seatType) {
    return ({
        type: types.HANDLE_SEAT_TYPE_MODAL,
        seatType
    });
}

export function editSeatType(seatType) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_SEAT_TYPE
        });
        seatTypeApi.EditSeatTypesApi(seatType)
            .then((res) => {
                if(res.data.status){
                    helper.showNotification("Chỉnh sửa loại ghế thành công");
                    dispatch({
                        type: types.EDIT_SEAT_TYPE_SUCCESS,
                        seatType
                    });
                }
                else {
                    helper.showNotification(res.data.message);
                    dispatch({
                        type: types.EDIT_SEAT_TYPE_ERROR,
                    });
                }
            })
            .catch(()=>{
                helper.showErrorNotification("Lỗi sever");
                dispatch({
                    type: types.EDIT_SEAT_TYPE_ERROR,
                });
            });
    };
}