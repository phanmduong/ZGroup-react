/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import {DATE_VN_FORMAT} from "../../constants/constants";
import moment from 'moment';

let classes;
export default function classesReducer(state = initialState.classes, action) {
    switch (action.type) {
        case types.BEGIN_CHANGE_LINK_DRIVER_CLASS:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.CHANGE_LINK_DRIVER_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.CHANGE_LINK_DRIVER_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_LOAD_CLASSES_EXCEL:
            return {
                ...state,
                ...{
                    isLoadingExcel: true,
                }
            };
        case types.LOAD_CLASSES_EXCEL_SUCCESSFUL:
            return {
                ...state,
                ...{
                    isLoadingExcel: false,
                    excel: action.excel,
                }
            };
        case types.LOAD_CLASSES_EXCEL_ERROR:
            return {
                ...state,
                ...{
                    isLoadingExcel: false,
                }
            };
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
                    totalPages: action.totalPages,
                    totalCount: action.totalCount,
                    limit: action.limit
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
                    editClass: action.class
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
                    classes: [{
                        ...action.class,
                        teachers: action.class.teachers_detail,
                        teaching_assistants: action.class.teaching_assistants_detail,
                    }, ...state.classes]
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
            classes = changeClass({
                ...action.class,
                teachers: action.class.teachers_detail,
                teaching_assistants: action.class.teaching_assistants_detail,
            }, state.classes);
            return {
                ...state,
                ...{
                    isStoringClass: false,
                    errorStoreClass: false,
                    class:action.class,
                    editClass: action.class,
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
                        attendances: changeDataClassLesson(action.classLesson, state.class.attendances),
                        lessons: changeDataLesson(action.classLesson, state.class.lessons),
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
        case types.BEGIN_CHANGE_CLASS_LESSONS_DATA:
            return {
                ...state,
                ...{
                    isChangingClassLesson: true,

                }
            };
        case types.CHANGE_CLASS_LESSONS_SUCCESS:

            return {
                ...state,
                ...{
                    isChangingClassLesson: false,

                }
            };
        case types.CHANGE_CLASS_LESSONS_ERROR:
            return {
                ...state,
                ...{
                    isChangingClassLesson: false,
                }
            };
        case types.BEGIN_SAVE_STUDENT_LESSON_EVENT:
            return {
                ...state,
                ...{
                    isLoadingSavingClassLessonEvents: true,

                }
            };
        case types.SAVE_STUDENT_LESSON_EVENT_SUCCESS:

            return {
                ...state,
                ...{
                    isLoadingSavingClassLessonEvents: false,

                }
            };
        case types.SAVE_STUDENT_LESSON_EVENT_ERROR:
            return {
                ...state,
                ...{
                    isLoadingSavingClassLessonEvents: false,
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
                isChangingTeacher: false,
                errorChangeTeacher: false,
                class: {
                    ...state.class,

                    teacher: {
                        ...state.class.teacher,
                        attendances: changeDataTeach(action.classLesson, state.class.teacher ? state.class.teacher.attendances  : []),
                    },
                    lessons: changeDataTeachLesson('teacher', action.classLesson, state.class.lessons),
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
        case types.CHANGE_TEACHING_ASSISTANT_SUCCESS:{
            let newState = {
                ...state,
                isChangingTeachingAssis: false,
                errorChangeTeachingAssis: false,
                class: {
                    ...state.class,
                    lessons: changeDataTeachLesson('teacher_assistant', action.classLesson, state.class.lessons),
                    teacher_assistant: {
                        ...state.class.teacher_assistant,
                        attendances: changeDataTeach(action.classLesson, state.class.teacher_assistant ? state.class.teacher_assistant.attendances : []),

                    }
                }
            };
            console.log('CHANGE_TEACHING_ASSISTANT_SUCCESS',newState);
            return newState;
        }

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
        case types.BEGIN_LOAD_COURSES_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoadingCourses: true,
                }
            };
        case types.LOAD_COURSES_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingCourses: false,
                    courses: action.courses
                }
            };
        case types.LOAD_COURSES_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingCourses: false,
                }
            };
        case types.BEGIN_LOAD_TEACHERS_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoadingTeachers: true,
                    errorTeachers: false
                }
            };
        case types.LOAD_TEACHERS_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingTeachers: false,
                    errorTeachers: false,
                    teachers: action.teachers,
                    teachingAssistants: action.teachingAssistants,
                }
            };
        case types.LOAD_TEACHERS_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingTeachers: false,
                    errorTeachers: true
                }
            };
        case types.BEGIN_LOAD_TEACHING_LESSON_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoadingTeachingLesson: true,
                    errorTeachingLesson: false
                }
            };
        case types.LOAD_TEACHING_LESSON_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingTeachingLesson: false,
                    errorTeachingLesson: false,
                    teachingLessons: action.teachingLessons,
                }
            };
        case types.LOAD_TEACHING_LESSON_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingTeachingLesson: false,
                    errorTeachingLesson: true
                }
            };
        case types.BEGIN_CHANGE_TEACHING_LESSON_CLASS_DATA:
            return {
                ...state,
                ...{
                    isChangingTeachingLesson: true,
                    errorTeachingLesson: false,
                }
            };
        case types.CHANGE_TEACHING_LESSON_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingTeachingLesson: false,
                    errorTeachingLesson: false,
                }
            };
        case types.CHANGE_TEACHING_LESSON_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isChangingTeachingLesson: false,
                    errorTeachingLesson: true,
                }
            };
        case types.BEGIN_ADD_CHECKIN_CHECKOUT_CLASS_DATA:
            return {
                ...state,
                ...{
                    isAddingCheckinCheckout: true,
                }
            };
        case types.ADDING_CHECKIN_CHECKOUT_CLASS_DATA:
            return {
                ...state,
                ...{
                    isAddingCheckinCheckout: false,
                }
            };
        case types.ERROR_ADD_CHECKIN_CHECKOUT_CLASS_DATA:
            return {
                ...state,
                ...{
                    isAddingCheckinCheckout: false,
                }
            };
        case types.ADD_SCHDULE_CLASS_DATA:
            return {
                ...state,
                infoCreateClass: {
                    ...state.infoCreateClass,
                    schedules: [...state.infoCreateClass.schedules, action.schedule]
                }
            };
        case types.DELETE_REGISTER_STUDENT_CLASS_SUCCESS:
            return {
                ...state,
                class: {
                    ...state.class,
                    registers: state.class.registers.filter((register) => register.id != action.registerId)
                }
            }
                ;
        case types.BEGIN_LOAD_CLASSES_REGISTER_STUDENT_CLASS:
            return {
                ...state,
                ...{
                    isLoadingChangeClasses: true,
                    errorChangeClasses: false,
                }
            };
        case types.LOAD_CLASSES_REGISTER_STUDENT_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingChangeClasses: false,
                    errorChangeClasses: false,
                    changeClasses: action.classes,
                }
            };
        case types.LOAD_CLASSES_REGISTER_STUDENT_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingChangeClasses: false,
                    errorChangeClasses: true,
                }
            };
        case types.BEGIN_CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_CLASS:
            return {
                ...state,
                ...{
                    isChangingClass: true,
                    errorChangeClass: false,
                }
            };
        case types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_CLASS_SUCCESS:
            return {
                ...state,
                ...{
                    isChangingClass: false,
                    errorChangeClass: false,
                }
            };
        case types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_CLASS_ERROR:
            return {
                ...state,
                ...{
                    isChangingClass: false,
                    errorChangeClass: true,
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

function changeDataLesson(classLesson, lessons) {
    if (lessons) {
        lessons = lessons.map(lesson => {
                if (lesson.lesson_id === classLesson.lesson_id) {
                    return {
                        ...lesson,
                        time: moment(classLesson.time).format(DATE_VN_FORMAT),
                    };
                }
                return lesson;
            }
        );
    }

    return lessons;
}

function changeDataTeachLesson(type, classLesson, lessons) {

    if (lessons) {
        lessons = lessons.map(lesson => {
                if (lesson.id === classLesson.id) {
                    console.log('found', {
                        ...lesson,
                        [type]: classLesson.staff,
                    });
                    return {
                        ...lesson,
                        [type]: classLesson.staff,
                    };
                }
                return lesson;
            }
        );
    }
    return lessons;
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