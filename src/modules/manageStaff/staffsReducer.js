/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let staffListData;
export default function staffsReducer(state = initialState.staffs, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_ALL_STAFFS_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    staffListData: action.staffListData,
                    isLoadedStaffs: true,
                }
            };
        case types.LOAD_ALL_STAFFS_DATA_SUCCESSFUL:{
            return {
                ...state,
                ...{
                    isLoading: false,
                    staffListData: action.staffListData,
                }
            };
        }
        case types.LOAD_ALL_STAFFS_DATA_ERROR:
            return {
                ...state,
                ...{

                    isLoading: false,
                    error: action.error
                }
            };
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
                    staffListData: action.staffListData,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
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
            staffListData = changeRoleStaff(action.staffId, action.roleId, state.staffListData);
            let userListData = changeRoleStaff(action.staffId, action.roleId, state.users.userListData);
            return {
                ...state,
                ...{
                    messageChangeRoleStaff: action.messageChangeRoleStaff,
                    isLoadingChangeRoleStaff: action.isLoadingChangeRoleStaff,
                    errorChangeRoleStaff: action.errorChangeRoleStaff,
                    staffListData: staffListData,
                    users: {
                        ...state.users,
                        userListData: userListData
                    }
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
                    messageChangeRoleStaff: action.messageChangeRoleStaff,
                    isLoadingChangeRoleStaff: action.isLoadingChangeRoleStaff,
                    errorChangeRoleStaff: action.errorChangeRoleStaff,
                }
            };
        case types.UPDATE_ADD_STAFF_FORM_DATA:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: action.staffForm
                        }
                    }
                }
            }
                ;
        case types.BEGIN_ADD_STAFF_DATA:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: state.addStaff.staffForm,
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.ADD_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: state.addStaff.staffForm,
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.ADD_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: state.addStaff.staffForm,
                            isLoading: action.isLoading,
                            error: action.error
                        }
                    }
                }
            };
        case types.BEGIN_CHANGE_BASE_STAFF:
            let staffListDataChangeBase = changeBaseStaff(action.staffId, action.baseId, state.staffListData);
            let userListDataChangeBase = changeBaseStaff(action.staffId, action.baseId, state.users.userListData);
            return {
                ...state,
                ...{
                    messageChangeBaseStaff: action.messageChangeBaseStaff,
                    isLoadingChangeBaseStaff: action.isLoadingChangeBaseStaff,
                    errorChangeBaseStaff: action.errorChangeBaseStaff,
                    staffListData: staffListDataChangeBase,
                    users: {
                        ...state.users,
                        userListData: userListDataChangeBase
                    }

                }
            }
                ;
        case types.CHANGE_BASE_STAFF_SUCCESSFUL:
            return {
                ...state,
                ...{
                    messageChangeBaseStaff: action.messageChangeBaseStaff,
                    isLoadingChangeBaseStaff: action.isLoadingChangeBaseStaff,
                    errorChangeBaseStaff: action.errorChangeBaseStaff,
                }
            };
        case types.CHANGE_BASE_STAFF_ERROR:
            return {
                ...state,
                ...{
                    messageChangeBaseStaff: action.messageChangeBaseStaff,
                    isLoadingChangeBaseStaff: action.isLoadingChangeBaseStaff,
                    errorChangeBaseStaff: action.errorChangeBaseStaff,
                }
            };
        case types.BEGIN_LOAD_STAFF_DATA:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isLoadingStaff: action.isLoadingStaff,
                            errorStaff: action.errorStaff,
                            staffForm: action.staff
                        }
                    }
                }
            };
        case types.LOAD_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isLoadingStaff: action.isLoadingStaff,
                            errorStaff: action.errorStaff,
                            staffForm: action.staff
                        }
                    }
                }
            };
        case types.LOAD_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isLoadingStaff: action.isLoadingStaff,
                            errorStaff: action.errorStaff,
                            staffForm: action.staff
                        }
                    }
                }
            };
        case types.BEGIN_EDIT_STAFF_DATA:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: state.addStaff.staffForm,
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.EDIT_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: state.addStaff.staffForm,
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.EDIT_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            staffForm: state.addStaff.staffForm,
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.BEGIN_RESET_PASSWORD_STAFF:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isResettingPassword: true,
                            errorResetPassword: false,
                        }
                    }
                }
            };
        case types.RESET_PASSWORD_STAFF_SUCCESSFUL:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isResettingPassword: false,
                            errorResetPassword: false,
                        }
                    }
                }
            };
        case types.RESET_PASSWORD_STAFF_ERROR:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isResettingPassword: false,
                            errorResetPassword: true,
                        }
                    }
                }
            };
        case types.BEGIN_CHANGE_AVATAR_STAFF:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isChangingAvatar: true
                        }
                    }
                }
            };
        case types.INIT_FORM_ADD_STAFF:
            return {
                ...state,
                addStaff: {
                    ...state.addStaff,
                    ...{
                        staffForm: {...initialState.staffs.addStaff.staffForm},
                    }
                }
            };
        case types.CHANGE_AVATAR_STAFF_SUCCESS:
            return {
                ...state,
                ...{
                    addStaff: {
                        ...state.addStaff,
                        ...{
                            isChangingAvatar: false,
                            staffForm: {
                                ...state.addStaff.staffForm,
                                avatar_url: action.avatar_url
                            }
                        }
                    }
                }
            };
        case types.DELETE_STAFF_DATA_SUCCESSFUL:
            staffListData = removeStaffData(action.staffId, state.staffListData);
            return {
                ...state,
                staffListData: staffListData,
            };
        case types.BEGIN_LOAD_ROLES_DATA:
            return {
                ...state,
                ...{
                    roles: {
                        ...state.roles,
                        ...{
                            isLoading: action.isLoading,
                            error: action.error,
                            roleListData: action.roleListData
                        }
                    }

                }
            };
        case types.LOAD_ROLES_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    roles: {
                        ...state.roles,
                        ...{
                            isLoading: action.isLoading,
                            error: action.error,
                            roleListData: action.roleListData
                        }
                    }

                }
            };
        case types.LOAD_ROLES_DATA_ERROR:
            return {
                ...state,
                ...{
                    roles: {
                        ...state.roles,
                        ...{
                            isLoading: action.isLoading,
                            error: action.error,
                            roleListData: action.roleListData
                        }
                    }

                }
            };
        case types.BEGIN_DATA_BASE_LOAD:
            return {
                ...state,
                ...{
                    bases: {
                        ...state.bases,
                        ...{
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.LOAD_DATA_BASE_SUCCESSFUL:
            return {
                ...state,
                ...{
                    bases: {
                        ...state.bases,
                        ...{
                            isLoading: action.isLoading,
                            error: action.error,
                            basesData: action.baseData
                        }
                    }
                }
            };
        case types.LOAD_DATA_BASE_ERROR:
            return {
                ...state,
                ...{
                    bases: {
                        ...state.bases,
                        ...{
                            isLoading: action.isLoading,
                            error: action.error,
                        }
                    }
                }
            };
        case types.BEGIN_LOAD_ALL_USERS_NOT_STAFF_DATA:
            return {
                ...state,
                users: {
                    ...state.users,
                    ...{
                        isLoading: true,
                        error: false,
                        staffListData: action.staffListData
                    }
                }
            };
        case types.LOAD_ALL_USERS_NOT_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                users: {
                    ...state.users,
                    ...{
                        isLoading: false,
                        error: false,
                        userListData: action.userListData,
                        currentPage: action.currentPage,
                        totalPages: action.totalPages
                    }
                }
            };
        case types.LOAD_ALL_USERS_NOT_STAFF_DATA_ERROR:
            return {
                ...state,
                users: {
                    ...state.users,
                    ...{
                        isLoading: false,
                        error: true
                    }
                }
            };
        case types.BEGIN_LOAD_DEPARTMENT_STAFF:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOAD_DEPARTMENT_STAFF_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    departments: action.data
                }
            };
        case types.LOAD_DEPARTMENT_STAFF_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_CHANGE_DEPARTMENT_STAFF:
            let newdata = changeDepartStaff(action.staffId,action.departId,state.staffListData);
            return {
                ...state,
                ...{
                    staffListData: newdata,
                }
            };
        case types.CHANGE_DEPARTMENT_STAFF_SUCCESS:
            return {
                ...state
            };
        case types.CHANGE_DEPARTMENT_STAFF_ERROR:
            return {
                ...state

            };
        default:
            return state;
    }
}

function changeDepartStaff(staffId, departId, data) {
    if (data) {
        data = data.map(function (staff) {
            if (staff.id === staffId) {
                return {...staff, department_id: departId};
            }
            else return staff;
        });
    }
    return data;
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

function changeBaseStaff(staffId, baseId, staffListData) {
    if (staffListData) {
        staffListData = staffListData.map(function (staff) {
            if (staff.id === staffId) {
                return {...staff, base_id: baseId};
            }
            else return staff;
        });
    }
    return staffListData;
}

function removeStaffData(staffId, staffListData) {
    if (staffListData) {
        staffListData = staffListData.filter(staff => staff.id !== staffId);
    }
    return staffListData;
}