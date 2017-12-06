/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let classes;
export default function classesReducer(state = initialState.classes, action) {
    console.log(action.type);
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_CLASSES_STUDENT:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                }
            };
        case types.LOAD_GENS_CLASSES_STUDENT_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    gens: action.gens,
                }
            };
            case types.LOAD_GENS_CLASSES_STUDENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                }
            };
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
        case types.BEGIN_CHANGE_CLASS_LESSON_DATA:
            return {
                ...state,
                ...{
                    isChangingClassLesson: true,
                    errorChangeClassLesson: false

                }
            };
        case types.CHANGE_CLASS_LESSON_SUCCESS:

            return {
                ...state,
                ...{
                    isChangingClassLesson: false,
                    errorChangeClassLesson: false,
                    class: {
                        ...state.class,
                        attendances: changeDataClassLesson(action.classLesson, state.class.attendances)
                    }
                }
            };
        case types.CHANGE_CLASS_LESSON_ERROR:
            return {
                ...state,
                ...{
                    isChangingClassLesson: false,
                    errorChangeClassLesson: true
                }
            };
        case types.BEGIN_CHANGE_TEACHER_DATA:
            return {
                ...state,
                ...{
                    isChangingTeacher: true,
                    errorChangeTeacher: false

                }
            };
        case types.CHANGE_TEACHER_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingTeacher: false,
                    errorChangeTeacher: false,
                    class: {
                        ...state.class,
                        teacher: {
                            ...state.class.teacher,
                            attendances: changeDataTeach(action.classLesson, state.class.teacher.attendances)
                        }
                    }
                }
            };
        case types.CHANGE_TEACHER_ERROR:
            return {
                ...state,
                ...{
                    isChangingTeacher: false,
                    errorChangeTeacher: true
                }
            };
        case types.BEGIN_CHANGE_TEACHING_ASSISTANT_DATA:
            return {
                ...state,
                ...{
                    isChangingTeachingAssis: true,
                    errorChangeTeachingAssis: false

                }
            };
        case types.CHANGE_TEACHING_ASSISTANT_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingTeachingAssis: false,
                    errorChangeTeachingAssis: false,
                    class: {
                        ...state.class,
                        teacher_assistant: {
                            ...state.class.teacher_assistant,
                            attendances: changeDataTeach(action.classLesson, state.class.teacher_assistant.attendances)
                        }
                    }
                }
            };
        case types.CHANGE_TEACHING_ASSISTANT_ERROR:
            return {
                ...state,
                ...{
                    isChangingTeachingAssis: false,
                    errorChangeTeachingAssis: true
                }
            };
        case types.BEGIN_LOAD_STAFFS_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoadingStaffs: true,
                    errorStaff: false
                }
            };
        case types.LOAD_STAFFS_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingStaffs: false,
                    errorStaff: false,
                    staffs: action.staffs
                }
            };
        case types.LOAD_STAFFS_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingStaffs: false,
                    errorStaff: true
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

function changeDataClassLesson(classLesson, attendances) {
    if (attendances) {
        attendances = attendances.map(atttendance => {
                if (atttendance.class_lesson_id === classLesson.id) {
                    return {
                        ...atttendance,
                        class_lesson_time: classLesson.time,
                    };
                }
                return atttendance;
            }
        );
    }

    return attendances;
}

function changeDataTeach(classLesson, attendances) {
    if (attendances) {
        attendances = attendances.map(atttendance => {
                if (atttendance.class_lesson_id === classLesson.id) {
                    return {
                        ...atttendance,
                        staff: classLesson.staff
                    };
                }
                return atttendance;
            }
        );
    }

    return attendances;
}