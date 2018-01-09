import * as types from '../../constants/actionTypes';
import * as HistoryExtensionWorkApi from './HistoryExtensionWorkApi';

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

export function deleteHistoryExtensionWork(id) {
   return function (dispatch) {
        dispatch({
            type: types.BEGIN_DELETE_HISTORY_EXTENSION_WORK,
        });
        HistoryExtensionWorkApi.deleteHistoryExtensionWork(id)
            .then(() => {
                dispatch({
                    type : types.DELETE_HISTORY_EXTENSION_WORK_SUCCESS,
                    historyId : id,
                });
            }).catch(() => {
            dispatch({
                type: types.DELETE_HISTORY_EXTENSION_WORK_ERROR,
            });
        });
    };
}
export function acceptHistoryExtensionWork(id){
    return function (dispatch){
        dispatch({
           type : types.BEGIN_ACCEPT_HISTORY_EXTENSION_WORK,
        });
        HistoryExtensionWorkApi.acceptHistoryExtensionWork(id)
            .then(()=>{
                dispatch({
                    type : types.ACCEPT_HISTORY_EXTENSION_WORK_SUCCESS,
                    historyId : id,
                });
            }).catch(()=>{
                dispatch({
                    type : types.ACCEPT_HISTORY_EXTENSION_WORK_ERROR
                });
            });


    };
}