/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let classes;
export default function classesReducer(state = initialState.classes, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_CLASSES_DATA:

            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_CLASSES_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    classes: action.classes,
                    isCreateClass: action.isCreateClass,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_CLASSES_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.DELETE_CLASS_DATA_SUCCESS:
            classes = deleteClass(action.classId, state.classes);
            return {
                ...state,
                classes: classes
            };
        case types.DUPLICATE_CLASS_DATA_SUCCESS:
            return {
                ...state,
                classes: [action.class, ...state.classes]
            };
        case types.BEGIN_CHANGE_CLASS_STATUS:
            classes = changeClassStatus(action.classId, state.classes);
            return {
                ...state,
                classes: classes
            };
        case types.BEGIN_LOAD_INFO_CREATE_CLASS:

            return {
                ...state,
                ...{
                    isLoadingInfoCreateClass: true,
                    errorInfoCreateClass: false,
                }
            };
        case types.LOAD_INFO_CREATE_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingInfoCreateClass: false,
                    errorInfoCreateClass: false,
                    infoCreateClass: action.infoCreateClass
                }
            };
        case types.LOAD_INFO_CREATE_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingInfoCreateClass: false,
                    errorInfoCreateClass: true,
                }
            };
        case types.UPDATE_FORM_CREATE_CLASS:
            return {
                ...state,
                ...{
                    class: action.class
                }
            };
        case types.BEGIN_CREATE_CLASS:

            return {
                ...state,
                ...{
                    isStoringClass: true,
                    errorStoreClass: false,
                }
            };
        case types.LOAD_CREATE_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isStoringClass: false,
                    errorStoreClass: false,
                    classes: [action.class, ...state.classes]
                }
            };
        case types.LOAD_CREATE_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isStoringClass: false,
                    errorStoreClass: true,
                }
            };
        case types.BEGIN_EDIT_CLASS:

            return {
                ...state,
                ...{
                    isStoringClass: true,
                    errorStoreClass: false,
                }
            };
        case types.LOAD_EDIT_CLASS_SUCCESS:
            classes = changeClass(action.class, state.classes);
            return {
                ...state,
                ...{
                    isStoringClass: false,
                    errorStoreClass: false,
                    classes: classes
                }
            };
        case types.LOAD_EDIT_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isStoringClass: false,
                    errorStoreClass: true,
                }
            };
        case types.BEGIN_LOAD_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoadingClass: true,
                    errorClass: false

                }
            };
        case types.LOAD_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingClass: false,
                    errorClass: false,
                    class: action.class,
                }
            };
        case types.LOAD_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingClass: false,
                    errorClass: true
                }
            };
        default:
            return state;
    }
}

function deleteClass(classId, classes) {
    if (classes) {
        classes = classes.filter(classItem => classItem.id !== classId);
    }
    return classes;
}

function changeClassStatus(classId, classes) {
    if (classes) {
        classes = classes.map((classItem) => {
            if (classItem.id === classId) {
                return {
                    ...classItem,
                    status: classItem.status === 1 ? 0 : 1
                };
            }
            return classItem;
        });
    }
    return classes;
}

function changeClass(classData, classes) {
    if (classes) {
        classes = classes.map((classItem) => {
            if (classItem.id === classData.id) {
                return classData;
            }
            return classItem;
        });
    }
    return classes;
}