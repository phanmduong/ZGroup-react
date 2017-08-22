import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let roleListData;
let tabListData;
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
                    roleListData: action.roleListData,
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
            roleListData = removeDataRoles(state.roleListData, action.roleId);
            return {
                ...state,
                roleListData: roleListData
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
                    roleForm: action.role,
                    tabs:{
                        ...state.tabs,
                        allTabs: action.tabListData
                    }
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
        case types.CHANGE_CHECK_TAB:
            tabListData = changeCheckTab(state.tabs.allTabs, action.tab);
            return {
                ...state,
                ...{
                    tabs: {
                        ...state.tabs,
                        ...{
                            allTabs: tabListData
                        }
                    }
                }
            };
        case types.BEGIN_LOAD_ALL_TABS_DATA:
            return {
                ...state,
                ...{
                    tabs: {
                        ...state.tabs,
                        ...{
                            isLoadingAllTabs: action.isLoading,
                            errorAllTabs: action.error,
                            allTabs: action.tabListData
                        }
                    }
                }
            };
        case types.LOAD_ALL_TABS_DATA_SUCCESSFUL:
            return {
                ...state,
                ...{
                    tabs: {
                        ...state.tabs,
                        ...{
                            isLoadingAllTabs: action.isLoading,
                            errorAllTabs: action.error,
                            allTabs: action.tabListData
                        }
                    }
                }
            };
        case types.LOAD_ALL_TABS_DATA_ERROR:
            return {
                ...state,
                ...{
                    tabs: {
                        ...state.tabs,
                        ...{
                            isLoadingAllTabs: action.isLoading,
                            errorAllTabs: action.error,
                            allTabs: action.tabListData
                        }
                    }
                }
            };
        default:
            return state;
    }
}

function removeDataRoles(roleListData, roleId) {
    if (roleListData) {
        roleListData = roleListData.filter(role => role.id !== roleId);
    }
    return roleListData;
}

function changeCheckTab(tabListData, tab) {
    if (tabListData) {
        return tabListData.map((tabItem) => {
            if (tabItem.id === tab.id) {
                return {
                    ...tabItem,
                    ...tab
                };
            } else {
                return tabItem;
            }
        });
    }

    return tabListData;
}
