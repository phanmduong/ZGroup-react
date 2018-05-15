import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function summaryStaffReducer(state = initialState.summaryStaff, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_SUMMARY_STAFF_WORK:
            return {
                ...state,
                ...{
                    isLoadingWork: true
                },
            };
        case types.LOAD_SUMMARY_STAFF_WORK_SUCCESS: {
            //console.log(action.data);
            return {
                ...state,
                ...{
                    isLoadingWork: false,
                    staff_work: action.data,
                },
            };
        }
        case types.LOAD_SUMMARY_STAFF_WORK_ERROR:
            return{
                ...state,
                ...{
                  isLoadingWork: false,
                },
            };
        case types.BEGIN_LOAD_SUMMARY_STAFF_DEPARTMENT:
            return {
                ...state,
                ...{
                    isLoadingDepartment: true
                },
            };
        case types.LOAD_SUMMARY_STAFF_DEPARTMENT_SUCCESS: {
            //console.log(action.data);
            return {
                ...state,
                ...{
                    isLoadingDepartment: false,
                    staff_department: action.data,
                },
            };
        }
        case types.LOAD_SUMMARY_STAFF_DEPARTMENT_ERROR:
            return{
                ...state,
                ...{
                    isLoadingDepartment: false,
                },
            };
        default:
            return state;
    }
}