import * as types from "../../constants/actionTypes";
import * as helper from "../../helpers/helper";
import * as registerManageRoomApi from "./registerManageRoomApi";

export function loadAllRegisters(
    limit = 10,
    page = 1,
    search,
    saler_id,
    status,
    campaign_id,
    base_id,
    startTime,
    endTime,
    success,
) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_REGISTER_MANAGE_ROOM,
        });
        registerManageRoomApi
            .loadAllRegistersApi(
                limit,
                page,
                search,
                saler_id,
                status,
                campaign_id,
                base_id,
                startTime,
                endTime,
            )
            .then(res => {
                dispatch({
                    type: types.LOAD_REGISTER_MANAGE_ROOM_SUCCESS,
                    registers: res.data.room_service_registers,
                    totalPages: res.data.paginator.total_pages,
                    currentPage: res.data.paginator.current_page,
                    totalCount: res.data.paginator.total_count,
                });
                if (success) success();
            });
    };
}


export function getAllSalers() {
    return function(dispatch) {
        registerManageRoomApi.getAllSalerApi().then(res => {
            dispatch({
                type: types.GET_ALL_SALER_REGISTER_MANAGE_ROOM,
                salers: res.data.data.salers,
            });
        });
    };
}

export function changeCallStatus(
    status,
    note,
    register_id,
    user_id,
    closeCallModal,
) {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CALL_STATUS_ROOM,
        });
        registerManageRoomApi
            .changeCallStatusApi(status, note, register_id, user_id)
            .then(res => {
                if (res.data.status) {
                    closeCallModal();
                    dispatch({
                        type: types.LOADED_CHANGE_CALL_STATUS_ROOM_SUCCESS,
                        teleCall: res.data.data.teleCall,
                        register_id: register_id,
                    });
                    status
                        ? helper.showNotification("Đã gọi")
                        : helper.showNotification("Chưa gọi được");
                } else {
                    dispatch({ type: types.LOADED_CHANGE_CALL_STATUS_ROOM_ERROR });
                    helper.showErrorNotification("Đã xảy ra lỗi kkkk ");
                }
            });
    };
}
export function savePayment(money, register_id, user_id, closeModal) {
    return function (dispatch) {
      dispatch({
          type : types.BEGIN_SAVE_PAYMENT,
      });
      registerManageRoomApi.savePaymentApi(money,register_id,user_id)
          .then(res => {
             if (res.data.status){
                 closeModal();
                 dispatch({
                     type  : types.SAVED_PAYMENT_ROOM_SUCCESS,
                     register_id : register_id,
                     payment : res.data.data.payment,
                 });
                 helper.showNotification("Lưu thành công");
             }
             else {
                 dispatch({type : types.SAVED_PAYMENT_ROOM_ERROR});
                 helper.showNotification("Lưu thất bại");
             }
          })
          .catch(()=>{
          dispatch({type : types.SAVED_PAYMENT_ROOM_ERROR});
              helper.showNotification("Lưu thất bại");
          });
    };

}

export function loadBasesData() {
    return function(dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_BASES_IN_REGISTER_MANAGE_ROOM,
        });
        registerManageRoomApi
            .loadBases()
            .then(res => {
                dispatch({
                    type: types.LOAD_BASES_IN_REGISTER_MANAGE_ROOM_SUCCESS,
                    bases: res.data.data.bases,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_BASES_IN_REGISTER_MANAGE_ROOM_ERROR,
                });
            });
    };
}

export const showGlobalLoading = () => {
    return dispatch => {
        dispatch({
            type: types.DISPLAY_GLOBAL_LOADING,
        });
    };
};
export const hideGlobalLoading = () => {
    return dispatch => {
        dispatch({
            type: types.HIDE_GLOBAL_LOADING,
        });
    };
};
