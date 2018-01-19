import * as types from '../../constants/actionTypes';
import * as HistoryExtensionWorkApi from './HistoryExtensionWorkApi';
import * as helper from '../../helpers/helper';

export function historyExtensionWork(page = 1,search = '') {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_HISTORY_EXTENSION_WORK,
        });
        HistoryExtensionWorkApi.historyExtensionWork(page,search)
            .then((res) => {

                dispatch({
                    type: types.LOAD_HISTORY_EXTENSION_WORK_SUCCESS,
                    data: res.data.logs,
                    paginator : res.data.paginator,
                });
            }).catch(() => {
                dispatch({
                    type: types.LOAD_HISTORY_EXTENSION_WORK_ERROR,
                });
            }
        );

    };
}

export function deleteHistoryExtensionWork(id,userId) {
   return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_HISTORY_EXTENSION_WORK,
        });
        HistoryExtensionWorkApi.deleteHistoryExtensionWork(id,userId)
            .then((res) => {
               if(res.data.status === 1) {
                   helper.showNotification("Từ chối thành công");
                   dispatch({
                       type: types.DELETE_HISTORY_EXTENSION_WORK_SUCCESS,
                       historyId: id,
                   });
               } else helper.showNotification("Có lỗi xảy ra");
            }).catch(() => {
            helper.showNotification("Có lỗi xảy ra");
            dispatch({
                type: types.DELETE_HISTORY_EXTENSION_WORK_ERROR,
            });
        });
    };
}
export function acceptHistoryExtensionWork(id,userId){
    return function (dispatch){
        dispatch({
           type : types.BEGIN_ACCEPT_HISTORY_EXTENSION_WORK,
        });
        HistoryExtensionWorkApi.acceptHistoryExtensionWork(id,userId)
            .then((res)=>{
               if(res.data.status === 1) {
                   helper.showNotification("Chấp nhận thành công");
                   dispatch({
                       type: types.ACCEPT_HISTORY_EXTENSION_WORK_SUCCESS,
                       historyId: id,
                   });
               } else helper.showNotification("Có lỗi xảy ra");
            }).catch(()=>{
            helper.showNotification("Có lỗi xảy ra");
                dispatch({
                    type : types.ACCEPT_HISTORY_EXTENSION_WORK_ERROR
                });
            });


    };
}