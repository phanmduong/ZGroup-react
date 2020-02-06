import * as types from '../../constants/actionTypes';
import * as courseApi from './courseApi';
import * as helper from '../../helpers/helper';

/*eslint no-console: 0 */
export function createLink(link, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_LINK});
        courseApi.createLink(link)
            .then(res => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_LINK_SUCCESS,
                    link: res.data.data.link
                });
                func();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_LINK_ERROR});
            });
    };
}

export function createPixel(courseId, pixel, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_PIXEL});
        courseApi.createPixel(courseId, pixel)
            .then(() => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_PIXEL_SUCCESS,
                });
                func();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_LINK_ERROR});
            });
    };
}

export function createTerm(pixel, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_TERM});
        courseApi.createTerm(pixel)
            .then((res) => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_TERM_SUCCESS,
                    data: res.data.data.term
                });
                func();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_TERM_ERROR});
            });
    };
}

export function commitEditLink(link, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_LINK});
        courseApi.editLink(link)
            .then(() => {
                helper.sweetAlertSuccess("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_LINK_SUCCESS
                });
                func();
            })
            .catch(() => {
                helper.sweetAlertError("Có lỗi xảy ra! ");
                dispatch({type: types.EDIT_LINK_ERROR});
            });
    };
}

export function commitEditPixel(pixelId, pixel, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_PIXEL});
        courseApi.editPixel(pixelId, pixel)
            .then(() => {
                helper.sweetAlertSuccess("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_PIXEL_SUCCESS
                });
                func();
            })
            .catch(() => {
                helper.sweetAlertError("Có lỗi xảy ra! ");
                dispatch({type: types.EDIT_PIXEL_ERROR});
            });
    };
}

export function commitEditTerm(term, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_TERM});
        courseApi.editTerm(term)
            .then(() => {
                helper.sweetAlertSuccess("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_TERM_SUCCESS
                });
                func();
            })
            .catch(() => {
                helper.sweetAlertError("Có lỗi xảy ra! ");
                dispatch({type: types.EDIT_TERM_ERROR});
            });
    };
}

export function deleteLink(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_DELETE_LINK});
        helper.showWarningNotification("Đang xoá Link!");
        courseApi.deleteLink(id)
            .then(() => {
                helper.showNotification("Xoá Thành Công!");
                dispatch({
                    type: types.DELETE_LINK_SUCCESS,
                    linkId: id,
                });

            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.DELETE_LINK_ERROR});
            });
    };
}

export function deletePixel(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_DELETE_PIXEL});
        helper.showWarningNotification("Đang xoá Pixel!");
        courseApi.deletePixel(id)
            .then(() => {
                helper.showNotification("Xoá Thành Công!");
                dispatch({
                    type: types.DELETE_PIXEL_SUCCESS,
                });
                success();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.DELETE_PIXEL_ERROR});
            });
    };
}

export function deleteTerm(id, success) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_DELETE_TERM});
        helper.showWarningNotification("Đang xoá học phần!");
        courseApi.deleteTerm(id)
            .then(() => {
                helper.showNotification("Xoá Thành Công!");
                dispatch({
                    type: types.DELETE_TERM_SUCCESS,
                });
                success();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.DELETE_TERM_ERROR});
            });
    };
}

export function deleteLesson(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_DELETE_LESSON});
        helper.showWarningNotification("Đang xoá buổi học!");
        courseApi.deleteLesson(id)
            .then(() => {
                helper.sweetAlertSuccess("Xoá Thành Công!");
                dispatch({
                    type: types.DELETE_LESSON_SUCCESS,
                    lessonId: id,
                });

            })
            .catch(() => {
                helper.sweetAlertError("Có lỗi xảy ra! ");
                dispatch({type: types.DELETE_LESSON_ERROR});
            });
    };
}

export function loadOneCourse(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSE});
        courseApi.loadCourse(id)
            .then((res) => {
                dispatch({
                    type: types.LOAD_COURSE_SUCCESS,
                    data: res.data.data.course
                });
            })
            .catch(() => {
                dispatch({type: types.LOAD_COURSE_ERROR});
            });
    };
}

export function beginLoadLink() {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_LINK
        });
    };
}

export function updateLinkData(link) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_LINK,
            link: link
        });

    };
}

export function updatePixelData(pixel) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_PIXEL,
            pixel: pixel
        });

    };
}

export function editLink(pixel) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_MODAL_EDIT_PIXEL,
            pixel: pixel,
        });
    };
}

export function editPixel(pixel) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_MODAL_EDIT_PIXEL,
            pixel: pixel
        });
    };
}

export function uploadLinkIcon(link, file) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_ICON_LINK});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            let newdata = {...link};
            newdata.link_icon_url = data.link;
            dispatch({
                type: types.UPLOAD_ICON_LINK_SUCCESS,
                link: newdata
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_ICON_LINK_FAILED});
        });
    };
}

export function uploadTermIcon(term, file) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_ICON_TERM});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            let newdata = {...term};
            newdata.image_url = data.link;
            dispatch({
                type: types.UPLOAD_ICON_TERM_SUCCESS,
                term: newdata
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_ICON_TERM_FAILED});
        });
    };
}

export function updateData(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_DATA_COURSES,
            course: data
        });

    };
}


export function deleteData() {
    return function (dispatch) {
        dispatch({
            type: types.DELETE_DATA_COURSES
        });

    };
}

export function loadCourses(page = 1, query = '') {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSES_DATA});
        courseApi.loadCoursesData(page, query)
            .then(res => {
                dispatch({
                    type: types.LOADED_COURSES_DATA_SUCCESS,
                    courses: res.data.courses,
                    paginator: res.data.paginator
                });
            })
            .catch(() => {
                dispatch({type: types.LOADED_COURSES_DATA_ERROR});
            });
    };
}

export function deleteCourse(id, success) {
    return function (dispatch) {
        helper.showWarningNotification('Đang xoá môn học');
        dispatch({
            type: types.BEGIN_DELETE_COURSES,

        });
        courseApi.deleteCourse(id)
            .then((res) => {
                if (res.data.status === 1) {
                    helper.showNotification('Xóa môn học thành công');
                    success();
                    dispatch({
                        type: types.DELETE_COURSES_SUCCESS,
                        courseId: id
                    });
                } else {
                    helper.showErrorNotification('Xóa môn học thất bại!');
                    dispatch({
                        type: types.DELETE_COURSES_ERROR
                    });
                }
            });
    };
}

export function commitCourseData(data, callback) {
    return function (dispatch) {
        helper.showWarningNotification("Đang lưu...");

        dispatch({type: types.BEGIN_CREATE_EDIT_COURSES, data: data});
        courseApi.createEditCourse(data)
            .then(res => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_EDIT_COURSES_SUCCESS,
                    data: res
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_EDIT_COURSES_ERROR});
            });
    };
}

export function uploadAvatar(link) {
    return function (dispatch) {

        dispatch({
            type: types.UPLOAD_AVATAR_COURSE_SUCCESS,
            link,
        });

    };
}

export function uploadLogo(link) {
    return function (dispatch) {

        dispatch({
            type: types.UPLOAD_LOGO_COURSE_SUCCESS,
            link,
        });

    };
}

export function uploadCover(link) {
    return function (dispatch) {

        dispatch({
            type: types.UPLOAD_COVER_COURSE_SUCCESS,
            link,
        });

    };
}


export function changeStatusCourse(index, course) {
    return function (dispatch) {
        helper.showWarningNotification('Đang thay đổi');
        dispatch({
            type: types.BEGIN_CHANGE_STATUS_COURSES,
            course: course,
            index: index,
        });
        courseApi.changeStatusCourse(course)
            .then((res) => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.CHANGE_STATUS_COURSES_SUCCESS,
                    });
                    helper.showNotification('Đổi trạng thái thành công!');
                } else {
                    helper.showNotification('Đổi trạng thái thất bại!');
                    dispatch({
                        type: types.CHANGE_STATUS_COURSES_ERROR,
                        course: course,
                        index: index,
                    });
                }
            });
    };
}


export function loadAllTypes() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_TYPES});
        courseApi.loadAllTypes()
            .then(res => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.LOAD_ALL_TYPES_SUCCESS,
                        types: res.data.data.types,
                    });
                } else {
                    helper.showNotification('Có lỗi xảy ra!');
                    dispatch({
                        type: types.LOAD_ALL_TYPES_ERROR,
                        res: res,
                    });
                }
            })
            // .catch((e) => {
            //     console.log(e);
            //     helper.showNotification('Có lỗi xảy ra!');
            //     dispatch({type: types.LOAD_ALL_TYPES_ERROR});
            // })
        ;
    };
}

export function loadAllCategories() {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_ALL_CATEGORIES});
        courseApi.loadAllCategories()
            .then(res => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.LOAD_ALL_CATEGORIES_SUCCESS,
                        categories: res.data.data.categories,
                    });
                } else {
                    helper.showErrorNotification('Có lỗi xảy ra!');
                    dispatch({
                        type: types.LOAD_ALL_CATEGORIES_ERROR,
                        res: res,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Có lỗi xảy ra!');
                dispatch({type: types.LOAD_ALL_CATEGORIES_ERROR});
            });
    };
}


export function createCategory(data, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SAVE_CATEGORY});
        courseApi.createCategory(data)
            .then(res => {
                if (res.data.status === 1) {
                    callback();
                    dispatch({type: types.SAVE_CATEGORY_SUCCESS});

                } else {
                    helper.showErrorNotification('Có lỗi xảy ra!');
                    dispatch({
                        type: types.SAVE_CATEGORY_ERROR,

                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Có lỗi xảy ra!');
                dispatch({type: types.SAVE_CATEGORY_ERROR});
            });
    };
}


export function editCategory(data, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_SAVE_CATEGORY});
        courseApi.editCategory(data)
            .then(res => {
                if (res.data.status === 1) {
                    callback();
                    dispatch({type: types.SAVE_CATEGORY_SUCCESS});

                } else {
                    helper.showErrorNotification('Có lỗi xảy ra!');
                    dispatch({
                        type: types.SAVE_CATEGORY_ERROR,
                        res: res,
                    });
                }
            })
            .catch(() => {
                helper.showErrorNotification('Có lỗi xảy ra!');
                dispatch({type: types.SAVE_CATEGORY_ERROR});
            });
    };
}


export function duplicateCourse(data, reload) {
    helper.showWarningNotification("Đang Tạo...");
    return function (dispatch) {
        dispatch({type: types.BEGIN_DUPLICATE_COURSES});
        courseApi.duplicateCourse(data.id)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Tạo Thành Công!");
                    dispatch({
                        type: types.DUPLICATE_COURSES_SUCCESS,
                        data: data
                    });
                    reload();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra! ");
                    dispatch({type: types.DUPLICATE_COURSES_ERROR});
                }

            })
            .catch((err) => {
                console.log(err);
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.DUPLICATE_COURSES_ERROR});
            });
    };
}

export function duplicateLesson(data, reload) {
    helper.showWarningNotification("Đang Tạo...");
    return function (dispatch) {
        dispatch({type: types.BEGIN_DUPLICATE_LESSON});
        courseApi.duplicateLesson(data.id)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Tạo Thành Công!");
                    dispatch({
                        type: types.DUPLICATE_LESSON_SUCCESS,
                    });
                    reload();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra! ");
                    dispatch({type: types.DUPLICATE_LESSON_ERROR});
                }

            })
            .catch((err) => {
                console.log(err);
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.DUPLICATE_LESSON_ERROR});
            });
    };
}

export function duplicateTerm(data, reload) {
    helper.showWarningNotification("Đang Tạo...");
    return function (dispatch) {
        dispatch({type: types.BEGIN_DUPLICATE_TERM});
        courseApi.duplicateTerm(data.id)
            .then(res => {
                if (res.data.status === 1) {
                    helper.showNotification("Tạo Thành Công!");
                    dispatch({
                        type: types.DUPLICATE_TERM_SUCCESS,
                    });
                    reload();
                } else {
                    helper.showErrorNotification("Có lỗi xảy ra! ");
                    dispatch({type: types.DUPLICATE_TERM_ERROR});
                }

            })
            .catch((err) => {
                console.log(err);
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.DUPLICATE_TERM_ERROR});
            });
    };
}


export function onCategoryChange(data) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_CATEGORY_COURSE,
            data: data,
        });

    };
}


export function changeOrderCourse(course, order, callback) {
    return function (dispatch) {
        helper.showWarningNotification('Đang thay đổi');
        courseApi.changeOrderCourse(course, order)
            .then((res) => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.CHANGE_ORDER_COURSES,
                    });
                    helper.showNotification('Đổi thứ tự thành công!');
                    callback();

                } else {
                    helper.showNotification('Đổi thứ tự thất bại!');
                }
            });
    };
}

export function changeTermLesson(lessonId, termId) {
    return function (dispatch) {
        helper.showNotification("Đang thay đổi học phần", "info");
        courseApi.changeTermLesson(lessonId, termId)
            .then(() => {
                helper.showNotification("Thay đổi học phần thành công");
                dispatch({
                    type: types.CHANGE_TERM_LESSON_COURSE_SUCCESS,
                    lesson_id: lessonId,
                    term_id: termId
                });
            }).catch(() => {
            helper.showErrorNotification("Thay đổi học phần thất bại");
        });
    };
}

export function createLesson(data, courseid, callback) {
    return function (dispatch) {
        data.course_id = courseid;
        dispatch({type: types.BEGIN_CREATE_LESSON_COURSE, data: data});
        courseApi.createLesson(data)
            .then(res => {
                helper.showNotification("Tạo Thành Công!");
                dispatch({
                    type: types.CREATE_LESSON_COURSE_SUCCESS,
                    data: res.data.data.lesson
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_LESSON_COURSE_ERROR});
            });
    };
}

export function createExamTemplate(data, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_EXAM_TEMPLATE_COURSE});
        courseApi.createExamTemplate(data)
            .then(res => {
                helper.showNotification("Tạo Thành Công!");
                dispatch({
                    type: types.CREATE_EXAM_TEMPLATE_COURSE_SUCCESS,
                    exam_template: res.data.exam_template
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_EXAM_TEMPLATE_COURSE_ERROR});
            });
    };
}

export function duplicateExamTemplate(data, callback) {
    return function (dispatch) {
        helper.showTypeNotification("Đang tạo bản sao", "info")
        courseApi.duplicateExamTemplate(data)
            .then(res => {
                helper.showNotification("Tạo Thành Công!");
                dispatch({
                    type: types.CREATE_EXAM_TEMPLATE_COURSE_SUCCESS,
                    exam_template: res.data.exam_template
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
            });
    };
}

export function editExamTemplate(data, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_EXAM_TEMPLATE_COURSE});
        helper.showTypeNotification("Đang sửa", "info")
        courseApi.editExamTemplate(data)
            .then(res => {
                helper.showNotification("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_EXAM_TEMPLATE_COURSE_SUCCESS,
                    exam_template: res.data.exam_template
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.EDIT_EXAM_TEMPLATE_COURSE_ERROR});
            });
    };
}

export function deleteExamTemplate(template_id) {
    return function (dispatch) {
        helper.showTypeNotification("Đang xóa", "info")
        courseApi.deleteExamTemplate(template_id)
            .then(() => {
                helper.showNotification("Xóa Thành Công!");
                dispatch({
                    type: types.DELETE_EXAM_TEMPLATE_COURSE_SUCCESS,
                    exam_template: {id: template_id}
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
            });
    };
}

export function createGroupExam(data, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_GROUP_EXAM_COURSE});
        courseApi.createGroupExam(data)
            .then(res => {
                helper.showNotification("Tạo Thành Công!");
                dispatch({
                    type: types.CREATE_GROUP_EXAM_COURSE_SUCCESS,
                    group_exam: res.data.group_exam
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_GROUP_EXAM_COURSE_ERROR});
            });
    };
}

export function editGroupExam(data, callback) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_EDIT_GROUP_EXAM_COURSE});
        courseApi.editGroupExam(data)
            .then(res => {
                helper.showNotification("Sửa Thành Công!");
                dispatch({
                    type: types.EDIT_GROUP_EXAM_COURSE_SUCCESS,
                    group_exam: res.data.group_exam
                });
                if (callback) callback();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.EDIT_GROUP_EXAM_COURSE_ERROR});
            });
    };
}

export function toggleModalExam() {
    return function (dispatch) {
        dispatch({
            type: types.TOGGLE_MODAL_EXAM_COURSE
        });
    };
}