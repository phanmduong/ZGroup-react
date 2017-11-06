import * as types       from '../../../constants/actionTypes';
import * as courseApi   from '../courseApi';
import * as helper      from '../../../helpers/helper';

export function commitCourseData(data) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_CREATE_EDIT_COURSES});
        courseApi.createEditCourse(data)
            .then(res => {
                helper.showNotification("Lưu Thành Công!");
                dispatch({
                    type: types.CREATE_EDIT_COURSES_SUCCESS,
                    data: res
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ");
                dispatch({type: types.CREATE_EDIT_COURSES_ERROR});
            });
    };
}

export function backToList() {
    return function (dispatch) {
        dispatch({type: types.BACK_TO_COURSE_LIST});

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


export function uploadAvatar(file, course) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_AVATAR_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            course.image_url = data.link;
            dispatch({
                type: types.UPLOAD_AVATAR_COURSE_SUCCESS,
                data: course
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_AVATAR_COURSE_FAILED});
        });
    };
}

export function uploadLogo(file, course) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_LOGO_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            course.icon_url = data.link;
            dispatch({
                type: types.UPLOAD_LOGO_COURSE_SUCCESS,
                data: course
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_LOGO_COURSE_FAILED});
        });
    };
}

export function uploadCover(file, course) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_UPLOAD_COVER_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            course.cover_url = data.link;
            dispatch({
                type: types.UPLOAD_COVER_COURSE_SUCCESS,
                data: course
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch({type: types.UPLOAD_COVER_COURSE_FAILED});
        });
    };
}

export  function deleteCourse(courseId) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_DELETE_COURSES});
        courseApi.deleteCourse(courseId)
            .then(() => {
                helper.showNotification("Xoá Thành Công!");
                dispatch({
                    type: types.DELETE_COURSES_SUCCESS
                });
            })
            .catch(() => {
                helper.showErrorNotification("Có lỗi xảy ra! ")
                dispatch({type: types.DELETE_COURSES_ERROR});
            });
    };
}
