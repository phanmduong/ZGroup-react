import * as types from '../../constants/actionTypes';
import * as roomApi from './roomApi';
import * as helper from "../../helpers/helper";

/*eslint no-console: 0 */

export function loadBasesData() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_BASES_ROOM_DATA});
        roomApi.getBases()
            .then(function (res) {
                dispatch({
                    type: types.LOAD_BASES_ROOM_DATA_SUCCESS,
                    bases: res.data.data.bases
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_BASES_ROOM_DATA_ERROR
            });
        });
    };
}

export function loadRoomsData(page, search, baseId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ROOMS_DATA});
        roomApi.getRooms(page, search, baseId)
            .then(function (res) {
                dispatch({
                    type: types.LOAD_ROOMS_DATA_SUCCESS,
                    rooms: res.data.rooms,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_ROOMS_DATA_ERROR
            });
        });
    };
}

export function storeRoom(room, closeModal) {
    const isEdit = !!room.id;
    return function (dispatch) {
        dispatch({type: types.BEGIN_STORE_ROOM_DATA});
        roomApi.storeRoom(room)
            .then(function (res) {
                helper.showNotification("Lưu phòng học thành công.");
                closeModal();
                dispatch({
                    type: types.STORE_ROOM_DATA_SUCCESS,
                    room: res.data.data.room,
                    isEdit
                });
            }).catch(() => {
            helper.showTypeNotification("Lưu phòng học thất bại.", "warning");
            dispatch({
                type: types.STORE_ROOM_DATA_ERROR
            });
        });
    };
}
