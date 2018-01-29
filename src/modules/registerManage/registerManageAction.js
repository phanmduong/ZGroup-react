import * as types from '../../constants/actionTypes';
//import * as helper from '../../helpers/helper';
import * as registerManageApi from './registerManageApi';

export function loadAllRegisters(page = 1, search, staff_id, status) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTER_MANAGE
        });
        registerManageApi.loadAllRegistersApi(page, search, staff_id, status)
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

export function getAllStaffs() {
    return function (dispatch) {
        registerManageApi.getAllStaffApi()
            .then(res => {
                dispatch({
                    type: types.GET_ALL_STAFFS_REGISTER_MANAGE,
                    staffs: res.data.staffs
                });
            });
    };
}

