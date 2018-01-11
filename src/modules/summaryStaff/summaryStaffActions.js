import * as types from '../../constants/actionTypes';
import * as summaryStaffApi from './summaryStaffApi';

export function loadSummaryStaffWork(year = getyear()){
    //console.log('12345678899');
    return function (dispatch){
        dispatch({
            type: types.BEGIN_LOAD_SUMMARY_STAFF_WORK,
        });
        summaryStaffApi.loadSummaryStaffWork(year)
            .then((res) => {
                dispatch({
                   type: types.LOAD_SUMMARY_STAFF_WORK_SUCCESS,
                   data: res.data.data.data,
                });
            }).catch(() => {
                dispatch({
                   type: types.LOAD_SUMMARY_STAFF_WORK_ERROR
                });
        });
    };
}

function getyear() {
    return new Date().getFullYear();
}
export function loadSummaryStaffDepartment(){
    //console.log('1234556');
    return function(dispatch){
        dispatch({
           type: types.BEGIN_LOAD_SUMMARY_STAFF_DEPARTMENT,
        });
        summaryStaffApi.loadSummaryStaffDepartment()
            .then((res)=>{
                dispatch({
                    type: types.LOAD_SUMMARY_STAFF_DEPARTMENT_SUCCESS,
                    data: res.data.data.data,
                });
            }).catch(()=>{
                dispatch({
                   type: types.LOAD_SUMMARY_STAFF_DEPARTMENT_ERROR
                });
        });
    };
}