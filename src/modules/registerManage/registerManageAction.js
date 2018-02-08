import * as types from '../../constants/actionTypes';
import * as helper from '../../helpers/helper';
import * as registerManageApi from './registerManageApi';

export function loadAllRegisters(page = 1, search, staff_id, status,campaign_id) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTER_MANAGE
        });
        registerManageApi.loadAllRegistersApi(page, search, staff_id, status,campaign_id)
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

export function changeCallStatus(status, note, register_id, user_id,closeCallModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CALL_STATUS,
        });
        registerManageApi.changeCallStatusApi(status, note, register_id, user_id)
            .then((res) => {
                if (res.data.status) {
                    dispatch({type: types.LOADED_CHANGE_CALL_STATUS_SUCCESS});
                    status ?
                        helper.showNotification("Đã gọi")
                        :
                        helper.showNotification("Chưa gọi được");
                    dispatch(loadAllRegisters(1,""));
                    closeCallModal();
                }
                else {
                    dispatch({type: types.LOADED_CHANGE_CALL_STATUS_ERROR});
                    helper.showErrorNotification("Đã xảy ra lỗi");
                }
            })
            .catch(() => {
                dispatch({type: types.LOADED_CHANGE_CALL_STATUS_ERROR});
                helper.showErrorNotification("Đã xảy ra lỗi");
            });

    };
}

export const showGlobalLoading = () => {
    return (dispatch) => {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING
        });
    };
};
export const hideGlobalLoading = () => {
    return (dispatch) => {
        dispatch({
            type: types.HIDE_GLOBAL_LOADING
        });
    };
};

