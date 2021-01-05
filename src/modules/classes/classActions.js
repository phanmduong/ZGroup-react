import * as types from '../../constants/actionTypes';
import * as classApi from './classApi';
import * as helper from '../../helpers/helper';
import {showErrorNotification, showNotification, showTypeNotification} from '../../helpers/helper';
import * as dashboardApi from "../dashboard/dashboardApi";
import * as registerStudentsApi from "../registerStudents/registerStudentsApi";

/*eslint no-console: 0 */


export function changeLinkDriver(classId, link) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CHANGE_LINK_DRIVER_CLASS});
        classApi.changeLinkDriver(classId, link)
            .then(() => {
                dispatch({
                    type: types.CHANGE_LINK_DRIVER_CLASS_SUCCESS,
                });
                helper.showNotification("Lưu thành công! ");
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra!");
                dispatch({type: types.CHANGE_LINK_DRIVER_CLASS_ERROR});
            });
    };
}

export function loadExcelData(genid) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_CLASSES_EXCEL});
        classApi.loadExcelData(genid)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASSES_EXCEL_SUCCESSFUL,
                    excel: res.data.data.classes,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_CLASSES_EXCEL_ERROR});
            });
    };
}

export function loadGensData(loadClass) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_GENS_CLASSES_STUDENT});
        classApi.loadGens()
            .then((res) => {
                loadClass();
                dispatch({
                    type: types.LOAD_GENS_CLASSES_STUDENT_SUCCESSFUL,
                    gens: res.data.data.gens,
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_GENS_CLASSES_STUDENT_ERROR});
            });
    };
}


export function loadClasses(filter) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASSES_DATA,
        });
        classApi.loadClasses(filter)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASSES_DATA_SUCCESS,
                    classes: res.data.classes,
                    isCreateClass: res.data.is_create_class,
                    currentPage: res.data.paginator.current_page,
                    totalPages: res.data.paginator.total_pages,
                    totalCount: res.data.paginator.total_count,
                    limit: res.data.paginator.limit

                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CLASSES_DATA_ERROR
            });
        });
    };
}

export function deleteClass(classId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa lớp", 'info');
        dispatch({
            type: types.BEGIN_DELETE_CLASS_DATA,
        });
        classApi.deleteClass(classId)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.sweetAlertSuccess("Xóa lớp thành công");
                    dispatch({
                        type: types.DELETE_CLASS_DATA_SUCCESS,
                        classId: classId
                    });
                } else {
                    helper.sweetAlertError("Xóa lớp thất bại");
                }
            }).catch(() => {
            helper.sweetAlertError("Xóa lớp thất bại");
            dispatch({
                type: types.DELETE_CLASS_DATA_ERROR
            });
        });
    };
}

export function duplicateClass(classId) {
    return function (dispatch) {
        helper.showTypeNotification("Đang duplicate lớp", 'info');
        dispatch({
            type: types.BEGIN_DUPLICATE_CLASS_DATA,
        });
        classApi.duplicateClass(classId)
            .then((res) => {
                helper.sweetAlertSuccess("Duplicate lớp thành công");
                dispatch({
                    type: types.DUPLICATE_CLASS_DATA_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            helper.sweetAlertError("Duplicate lớp thất bại");
            dispatch({
                type: types.DUPLICATE_CLASS_DATA_ERROR
            });
        });
    };
}

export function changeClassStatus(classId) {
    return function (dispatch) {
        helper.showTypeNotification('Đang thay đổi trạng thái lớp', 'info');
        dispatch({
            type: types.BEGIN_CHANGE_CLASS_STATUS,
            classId: classId,
        });
        classApi.changeClassStatus(classId)
            .then(() => {
                helper.showNotification('Thay đổi trạng thái lớp thành công');
                dispatch({
                    type: types.CHANGE_CLASS_STATUS_SUCCESS,
                });
            }).catch(() => {
            helper.showErrorNotification('Thay đổi trạng thái lớp thất bại');
            dispatch({
                type: types.CHANGE_CLASS_STATUS_ERROR
            });
        });
    };
}

export function infoCreateClass() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_INFO_CREATE_CLASS,
        });
        classApi.infoCreateClass()
            .then((res) => {
                dispatch({
                    type: types.LOAD_INFO_CREATE_CLASS_SUCCESS,
                    infoCreateClass: res.data.data
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_INFO_CREATE_CLASS_ERROR
            });
        });
    };
}

export function updateFormCreateClass(classData) {
    return {
        type: types.UPDATE_FORM_CREATE_CLASS,
        class: classData,
    };
}

export function createClass(classData, closeModal) {
    classData = {...classData, id: ''};
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CREATE_CLASS,
        });
        classApi.addClass(classData)
            .then((res) => {
                closeModal();
                helper.showNotification('Lưu thành công');
                dispatch({
                    type: types.LOAD_CREATE_CLASS_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            helper.showErrorNotification('Có lỗi xảy ra!');
            dispatch({
                type: types.LOAD_CREATE_CLASS_ERROR
            });
        });
    };
}

export function editClass(classData, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_CLASS,
        });
        classApi.addClass(classData)
            .then((res) => {
                closeModal();
                helper.showNotification('Lưu thành công');
                dispatch({
                    type: types.LOAD_EDIT_CLASS_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            helper.showErrorNotification('Có lỗi xảy ra!');
            dispatch({
                type: types.LOAD_EDIT_CLASS_ERROR
            });
        });
    };
}

export function loadClass(classId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASS_DATA
        });
        classApi.loadClass(classId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASS_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CLASS_ERROR
            });
        });
    };
}

export function genCerti(classId) {
    return async (dispatch) => {
        dispatch({
            type: types.BEGIN_LOAD_CLASS_DATA
        });
        await dashboardApi.genCerti(classId);
        classApi.loadClass(classId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_CLASS_SUCCESS,
                    class: res.data.data.class
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_CLASS_ERROR
            });
        });
    };
}

export function changeClassLesson(classLesson, classModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CLASS_LESSON_DATA
        });
        classApi.changeClassLesson(classLesson)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Đổi buổi thành công");
                    classModal();
                    dispatch({
                        type: types.CHANGE_CLASS_LESSON_SUCCESS,
                        classLesson: res.data.data.class_lesson
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
            }).catch(() => {
            dispatch({
                type: types.CHANGE_CLASS_LESSON_ERROR
            });
        });
    };
}

export function changeClassLessons(classLesson, callback) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_CLASS_LESSONS_DATA
        });
        helper.showWarningNotification('Đang lưu...');
        classApi.changeClassLessons(classLesson)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.message);
                    if (callback) callback();
                    dispatch({
                        type: types.CHANGE_CLASS_LESSONS_SUCCESS,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
            }).catch(() => {
            showErrorNotification('Có lỗi xảy ra!');
            dispatch({
                type: types.CHANGE_CLASS_LESSONS_ERROR
            });
        });
    };
}

export function saveStudentLessonEvent(lessonEventStudent, callback) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_SAVE_STUDENT_LESSON_EVENT
        });
        helper.showWarningNotification('Đang lưu...');
        classApi.saveStudentLessonEvent(lessonEventStudent)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification(res.data.message);
                    if (callback) callback();
                    dispatch({
                        type: types.SAVE_STUDENT_LESSON_EVENT_SUCCESS,
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
            }).catch(() => {
            showErrorNotification('Có lỗi xảy ra!');
            dispatch({
                type: types.SAVE_STUDENT_LESSON_EVENT_ERROR
            });
        });
    };
}

export function changeTeacher(classLesson, modal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_TEACHER_DATA
        });
        classApi.changeTeacher(classLesson)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Đổi giảng viên thành công");
                    modal();
                    dispatch({
                        type: types.CHANGE_TEACHER_SUCCESS,
                        classLesson: res.data.data.class_lesson
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
            }).catch(() => {
            dispatch({
                type: types.CHANGE_TEACHER_ERROR
            });
        });
    };
}

export function changeTeachingAssistant(classLesson, modal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_TEACHING_ASSISTANT_DATA
        });
        classApi.changeTeachingAssistant(classLesson)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification("Đổi trợ giảng thành công");
                    modal();
                    dispatch({
                        type: types.CHANGE_TEACHING_ASSISTANT_SUCCESS,
                        classLesson: res.data.data.class_lesson
                    });
                } else {
                    helper.showErrorNotification(res.data.message);
                }
            }).catch((e) => {
            console.log(e);
            dispatch({
                type: types.CHANGE_TEACHING_ASSISTANT_ERROR
            });
        });
    };
}

export function loadStaffs() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_STAFFS_CLASS_DATA
        });
        classApi.loadStaffs()
            .then((res) => {
                dispatch({
                    type: types.LOAD_STAFFS_CLASS_DATA_SUCCESS,
                    staffs: res.data.data.staffs
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_STAFFS_CLASS_DATA_ERROR
            });
        });
    };
}

export function loadCourses() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_COURSES_CLASS_DATA
        });
        classApi.loadCoursesApi()
            .then((res) => {
                dispatch({
                    type: types.LOAD_COURSES_CLASS_DATA_SUCCESS,
                    courses: res.data.data.courses
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_COURSES_CLASS_DATA_ERROR
            });
        });
    };
}

export function loadTeachersClass(classId) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TEACHERS_CLASS_DATA
        });
        classApi.loadTeachers(classId)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TEACHERS_CLASS_DATA_SUCCESS,
                    teachers: res.data.data.teachers,
                    teachingAssistants: res.data.data.teaching_assistants,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_TEACHERS_CLASS_DATA_ERROR
            });
        });
    };
}

export function loadTeachingLessons(classLessonId, type) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_TEACHING_LESSON_CLASS_DATA
        });
        classApi.loadTeachingLessons(classLessonId, type)
            .then((res) => {
                dispatch({
                    type: types.LOAD_TEACHING_LESSON_CLASS_DATA_SUCCESS,
                    teachingLessons: res.data.data.teaching,
                });
            }).catch(() => {
            dispatch({
                type: types.LOAD_TEACHING_LESSON_CLASS_DATA_ERROR
            });
        });
    };
}

export function changeTeachingLesson(classLessonId, oldTeachingId, newTeachingId, type, note, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CHANGE_TEACHING_LESSON_CLASS_DATA
        });
        classApi.changeTeachingLesson(classLessonId, oldTeachingId, newTeachingId, note)
            .then((res) => {
                if (res.data.status === 1) {
                    closeModal();
                    dispatch({
                        type: types.CHANGE_TEACHING_LESSON_CLASS_DATA_SUCCESS,
                    });
                    dispatch(loadTeachingLessons(classLessonId, type));
                } else {
                    helper.showErrorMessage("Có lỗi xảy ra. Thử lại");
                }
            }).catch(() => {
            dispatch({
                type: types.CHANGE_TEACHING_LESSON_CLASS_DATA_ERROR
            });
        });
    };
}

export function addCheckinCheckout(type, typeUser, userId, classLessonID, time, comment, addCheckinCheckoutSuccess) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_CHECKIN_CHECKOUT_CLASS_DATA
        });
        classApi.addCheckinCheckout(type, typeUser, userId, classLessonID, time, comment)
            .then((res) => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.ADDING_CHECKIN_CHECKOUT_CLASS_DATA,
                    });
                    addCheckinCheckoutSuccess();
                } else {
                    helper.showErrorMessage("Có lỗi xảy ra. Thử lại");
                }
            }).finally(() => {
            dispatch({
                type: types.ERROR_ADD_CHECKIN_CHECKOUT_CLASS_DATA,
            });
        });
    };
}

export function addSchedule(schedule) {
    return function (dispatch) {
        dispatch({
            type: types.ADD_SCHDULE_CLASS_DATA,
            schedule: schedule
        });
    };
}

export function deleteRegisterStudent(registerId) {
    return function (dispatch) {
        showTypeNotification("Đang xóa đăng kí", "info");
        registerStudentsApi
            .deleteRegisterStudent(registerId)
            .then(res => {
                if (res.data.status === 1) {
                    showNotification(res.data.data.message);
                    dispatch({
                        type: types.DELETE_REGISTER_STUDENT_CLASS_SUCCESS,
                        registerId,
                    });
                } else {
                    showErrorNotification(res.data.data.message);
                }
            })
            .catch((e) => {
                console.log(e);
                showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function loadChangeClasses(registerId, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_CLASSES_REGISTER_STUDENT_CLASS,
        });
        registerStudentsApi
            .loadClasses(registerId, query)
            .then(res => {
                dispatch({
                    type: types.LOAD_CLASSES_REGISTER_STUDENT_CLASS_SUCCESS,
                    classes: res.data.data.classes,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOAD_CLASSES_REGISTER_STUDENT_CLASS_ERROR,
                });
            });
    };
}

export function confirmChangeClass(register, classId, currentClassId, closeModalChangeClass) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_CLASS,
        });
        registerStudentsApi
            .confirmChangeClass(register, classId)
            .then(res => {
                showNotification(res.data.data.message);
                closeModalChangeClass();
                dispatch(loadClass(currentClassId));
                dispatch({
                    type: types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_CLASS_SUCCESS,
                });
            })
            .catch(() => {
                showErrorNotification("Thay đổi lớp thất bại");
                dispatch({
                    type: types.CONFIRM_CHANGE_CLASS_REGISTER_STUDENT_CLASS_ERROR,
                });
            });
    };
}

export function updateClassLesson(classId) {
    return function () {
        showTypeNotification("Đang cập nhật chương trình học", "info");
        classApi.updateClassLesson(classId)
            .then(() => {
                showTypeNotification("Cập nhật chương trình học thành công");
                // dispath(loadClass(classId));
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function updateClassExam(classId) {
    return function () {
        showTypeNotification("Đang cập nhật bài kiểm tra", "info");
        classApi.updateClassExam(classId)
            .then(() => {
                showTypeNotification("Cập nhật bài kiểm tra thành công");
                // dispath(loadClass(classId));
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra");
            });
    };
}

export function updateAndReloadClass(classId, options, callback) {
    return async function (dispatch) {
        if (options.syllabus) {
            showTypeNotification("Đang cập nhật chương trình học", "info");
            await classApi.updateClassLesson(classId);
            showTypeNotification("Cập nhật chương trình học thành công");
        }
        if (options.exam) {
            showTypeNotification("Đang cập nhật bài kiểm tra", "info");
            await classApi.updateClassExam(classId);
            showTypeNotification("Cập nhật bài kiểm tra thành công");
        }
        dispatch(loadClass(classId));
        callback();
    };
}



