import * as types from '../../constants/actionTypes';
//import * as helper from '../../helpers/helper';
import * as registerManageApi from './registerManageApi';

export function loadAllRegisters(page = 1, search, user_id, staff_id, status) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTER_MANAGE
        });
        registerManageApi.loadAllRegistersApi(page, search, user_id, staff_id, status)
            .then((res) => {
                dispatch({
                    type: types.LOAD_REGISTER_MANAGE_SUCCESS,
                    registers: res.data.room_service_registers,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    totalCount: res.data.paginator.total_count,
                });
            });
    };
}
