import * as types       from '../../constants/actionTypes';
import * as excelApi   from './excelApi';
import * as helper      from '../../helpers/helper';


export function exportExcel(genId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EXPORT_EXCEL});
        excelApi.loadTeacher(genId)
            .then(res => {
                dispatch({
                    type: types.EXPORT_EXCEL_SUCCESS,
                    data: res.data.data.data
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.EXPORT_EXCEL_ERROR});
            });
    };
}
