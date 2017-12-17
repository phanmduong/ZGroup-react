import * as types       from '../../constants/actionTypes';
import * as courseApi   from './courseApi';
import * as helper      from '../../helpers/helper';
import {browserHistory} from 'react-router';

export function createLink(link, func) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_LINK});
        courseApi.createLink(link)
            .then(res => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_LINK_SUCCESS,
                    link : res.data.data.link
                });
                func();
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_LINK_ERROR});
            });
    };
}

export function commitEditLink(link,func) {
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
                helper.sweetAlertError("Có lỗi xảy ra! " );
                dispatch({type: types.EDIT_LINK_ERROR});
            });
    };
}

export function deleteLink(id) {
    return function (dispatch) {
        dispatch  ({type: types.BEGIN_DELETE_LINK});
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
export function deleteLesson(id) {
    return function (dispatch) {
        dispatch  ({type: types.BEGIN_DELETE_LESSON});
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


export function editLink(link) {
    return function (dispatch) {
        dispatch({
            type: types.OPEN_MODAL_EDIT_LINK,
            link: link
        });
    };
}


export function uploadLinkIcon(link ,file) {
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

export function loadCourses(page = 1, query='') {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSES_DATA});
        courseApi.loadCoursesData(page, query)
            .then(res => {
                dispatch({
                    type        : types.LOADED_COURSES_DATA_SUCCESS,
                    courses     : res.data.courses,
                    paginator   : res.data.paginator
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
                if(res.data.status === 1){
                helper.showNotification('Xóa môn học thành công');
                success();
                dispatch({
                    type: types.DELETE_COURSES_SUCCESS,
                    courseId: id
                });}else {
                    helper.showNotification('Xóa môn học thất bại!');
                    dispatch({
                        type: types.DELETE_COURSES_ERROR
                    });
                }
            });
    };
}



export function commitCourseData(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_EDIT_COURSES, data: data});
        courseApi.createEditCourse(data)
            .then(res => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_EDIT_COURSES_SUCCESS,
                    data: res
                });
                browserHistory.push("/manage/courses");
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_EDIT_COURSES_ERROR});
            });
    };
}





export function uploadAvatar(file) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_AVATAR_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            dispatch({
                type: types.UPLOAD_AVATAR_COURSE_SUCCESS,
                link: data.link
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_AVATAR_COURSE_FAILED});
        });
    };
}

export function uploadLogo(file) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_LOGO_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            dispatch({
                type: types.UPLOAD_LOGO_COURSE_SUCCESS,
                link: data.link
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_LOGO_COURSE_FAILED});
        });
    };
}

export function uploadCover(file) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_COVER_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            dispatch({
                type: types.UPLOAD_COVER_COURSE_SUCCESS,
                link: data.link
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_COVER_COURSE_FAILED});
        });
    };
}

