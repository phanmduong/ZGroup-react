import * as types from '../constants/actionTypes';
import initialState from './initialState';
import _ from 'lodash';

let roleListData;
export default function rolesReducer(state = initialState.roles, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_ROLES_DATA:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    roleListData: action.roleListData
                }
            };
        case types.LOAD_ROLES_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error,
                    roleListData: action.roleListData
                }
            };
        case types.LOAD_ROLES_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error
                }
            };

        case types.BEGIN_CREATE_ROLE_DATA:
            return {
                ...state,
                ...{
                    createRole: {
                        isLoading: action.isLoading,
                        error: action.error
                    }
                }
            };
        case types.CREATE_ROLE_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    createRole: {
                        isLoading: action.isLoading,
                        error: action.error
                    }
                }
            };
        case types.CREATE_ROLE_DATA_ERROR:
            return {
                ...state,
                ...{
                    createRole: {
                        isLoading: action.isLoading,
                        error: action.error
                    }
                }
            };
        case types.CHANGE_ROLE_TITLE_FORM: {
            return {
                ...state,
                ...{
                    roleForm: action.roleForm
                }
            };
        }
        case types.BEGIN_DELETE_ROLE_DATA:
            return {
                ...state,
                ...{
                    isLoadingDeleteRole: action.isLoading,
                    errorDeleteRole: action.error,
                }
            };
        case types.DELETE_ROLE_DATA_SUCCESSFUL:
            roleListData = changeDataRoles(state.roleListData, action.roleId);
            return {
                ...state,
                ...{
                    isLoadingDeleteRole: action.isLoading,
                    errorDeleteRole: action.error,
                    roleListData: roleListData
                }
            };
        case types.DELETE_ROLE_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingDeleteRole: action.isLoading,
                    errorDeleteRole: action.error,
                }
            };
        case types.BEGIN_LOAD_ROLE_DATA:
            return {
                ...state,
                ...{
                    editRole: {
                        ...state.editRole,
                        ...{
                            isLoadingRole: action.isLoading,
                            errorRole: action.error
                        }
                    },
                    roleForm: action.role
                }
            };
        case types.LOAD_ROLE_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    editRole: {
                        ...state.editRole,
                        ...{
                            isLoadingRole: action.isLoading,
                            errorRole: action.error
                        }
                    },
                    roleForm: action.role
                }
            };
        case types.LOAD_ROLE_DATA_ERROR:
            return {
                ...state,
                ...{
                    editRole: {
                        ...state.editRole,
                        ...{
                            isLoadingRole: action.isLoading,
                            errorRole: action.error
                        }
                    }
                }
            };
        case types.BEGIN_EDIT_ROLE_DATA:
            return {
                ...state,
                ...{
                    editRole: {
                        ...state.editRole,
                        ...{
                            isLoadingUpdateRole: action.isLoading,
                            errorUpdateRole: action.error
                        }
                    }
                }
            };
        case types.EDIT_ROLE_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    editRole: {
                        ...state.editRole,
                        ...{
                            isLoadingUpdateRole: action.isLoading,
                            errorUpdateRole: action.error
                        }
                    }
                }
            };
        case types.EDIT_ROLE_DATA_ERROR:
            return {
                ...state,
                ...{
                    editRole: {
                        ...state.editRole,
                        ...{
                            isLoadingUpdateRole: action.isLoading,
                            errorUpdateRole: action.error
                        }
                    }
                }
            };
        default:
            return state;
    }
}

function changeDataRoles(roleListData, roleId) {
    if (roleListData) {
        let roles = [...roleListData];
        _.remove(roles, function (role) {
            return role.id === roleId;
        });

        return roles;
    }
    return roleListData;
}
