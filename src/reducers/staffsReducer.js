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
            return {
                ...state,
                ...{
                    messageChangeBaseStaff: action.messageChangeBaseStaff,
                    isLoadingChangeBaseStaff: action.isLoadingChangeBaseStaff,
                    errorChangeBaseStaff: action.errorChangeBaseStaff,
                    staffListData: staffListDataChangeBase
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
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingStaff: action.isLoadingStaff,
                            errorStaff: action.errorStaff,
                            staff: action.staff
                        }
                    }
                }
            };
        case types.LOAD_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingStaff: action.isLoadingStaff,
                            errorStaff: action.errorStaff,
                            staff: action.staff
                        }
                    }
                }
            };
        case types.LOAD_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingStaff: action.isLoadingStaff,
                            errorStaff: action.errorStaff,
                            staff: action.staff
                        }
                    }
                }
            };
        case types.UPDATE_EDIT_STAFF_FORM_DATA:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            staff: action.staffForm
                        }
                    }
                }
            }
                ;
        case types.BEGIN_EDIT_STAFF_DATA:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingUpdateStaff: action.isLoading,
                            errorUpdateStaff: action.error,
                            staff: state.editStaff.staff
                        }
                    }
                }
            };
        case types.EDIT_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingUpdateStaff: action.isLoading,
                            errorUpdateStaff: action.error,
                            staff: state.editStaff.staff
                        }
                    }
                }
            };
        case types.EDIT_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingUpdateStaff: action.isLoading,
                            errorUpdateStaff: action.error,
                            staff: state.editStaff.staff
                        }
                    }
                }
            };
        case types.BEGIN_DELETE_STAFF_DATA:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingDeleteStaff: action.isLoading,
                            errorDeleteStaff: action.error,
                            staff: state.editStaff.staff
                        }
                    }
                }
            };
        case types.DELETE_STAFF_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingDeleteStaff: action.isLoading,
                            errorDeleteStaff: action.error,
                            staff: state.editStaff.staff
                        }
                    }
                }
            };
        case types.DELETE_STAFF_DATA_ERROR:
            return {
                ...state,
                ...{
                    editStaff: {
                        ...state.editStaff,
                        ...{
                            isLoadingDeleteStaff: action.isLoading,
                            errorDeleteStaff: action.error,
                            staff: state.editStaff.staff
                        }
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