/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';
import initialState from './initialState';

export default function staffsReducer(state = initialState.staffs, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_STAFFS_DATA:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    staffListData: action.staffListData
                }
            };
        case types.LOAD_STAFFS_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    staffListData: action.staffListData
                }
            };
        case types.LOAD_STAFFS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error
                }
            };
        case types.BEGIN_CHANGE_ROLE_STAFF:
            let staffListData = changeRoleStaff(action.staffId, action.roleId, state.staffListData);
            return {
                ...state,
                ...{
                    messageChangeRoleStaff: action.messageChangeRoleStaff,
                    isLoadingChangeRoleStaff: action.isLoadingChangeRoleStaff,
                    errorChangeRoleStaff: action.errorChangeRoleStaff,
                    staffListData: staffListData
                }
            }
                ;
        case
        types.CHANGE_ROLE_STAFF_SUCCESSFUL
        :
            return {
                ...state,
                ...{
                    messageChangeRoleStaff: action.messageChangeRoleStaff,
                    isLoadingChangeRoleStaff: action.isLoadingChangeRoleStaff,
                    errorChangeRoleStaff: action.errorChangeRoleStaff,
                }
            };
        case
        types.CHANGE_ROLE_STAFF_ERROR
        :
            return {
                ...state,
                ...{
                    message: action.message,
                    isLoadingChangeRoleStaff: action.isLoadingChangeRoleStaff,
                    errorChangeRoleStaff: action.errorChangeRoleStaff,
                }
            };
        case types.UPDATE_STAFF_FORM_DATA:
            return {
                ...state,
                ...{
                    addStaff: {
                        staffForm: action.staffForm
                    }
                }
            }
                ;
        case types.BEGIN_ADD_STAFF_DATA:
            return {
                ...state,
                ...{
                    addStaff: {
                        staffForm: state.addStaff.staffForm,
                        isLoading: action.isLoading,
                        error: action.error,
                    }
                }
            };
        case types.ADD_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    addStaff: {
                        staffForm: state.addStaff.staffForm,
                        isLoading: action.isLoading,
                        error: action.error,
                    }
                }
            };
        case types.ADD_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    addStaff: {
                        staffForm: state.addStaff.staffForm,
                        isLoading: action.isLoading,
                        error: action.error
                    }
                }
            };
        default:
            return state;
    }
}

function changeRoleStaff(staffId, roleId, staffListData) {
    if (staffListData) {
        staffListData = staffListData.map(function (staff) {
            if (staff.id === staffId) {
                return {...staff, role_id: roleId};
            }
            else return staff;
        });
    }
    return staffListData;
}