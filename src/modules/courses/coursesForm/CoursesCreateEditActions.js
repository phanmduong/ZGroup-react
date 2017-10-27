import * as types from '../../../constants/actionTypes';
import * as courseApi from '../courseApi'
import * as helper from '../../../helpers/helper';


export function updateCourses() {

    return function (dispatch) {
        dispatch({type: types.UPDATE_COURSES_FORM});

    };
}

export function loadCourses(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_COURSE});
        courseApi.loadCourse(id)
            .then((res)=>{
                console.log(res);
                dispatch({
                    type: types.LOAD_COURSE_SUCCESS,
                    data: res.data.data.course
                });
            })
            .catch(()=>{
                dispatch({type: types.LOAD_COURSE_ERROR});
            });
    };
}


export function uploadAvatar(file, course) {
    return function (dispatch) {
        dispatch({ type: types.BEGIN_UPLOAD_AVATAR_COURSE});
        courseApi.uploadImage(file, function (event) {
            helper.showNotification("Đăng ảnh thành công.");
            let data = JSON.parse(event.currentTarget.response);
            course.image_url = data.link;
            dispatch({
                type: types.UPLOAD_AVATAR_COURSE_SUCCESS,
                imageUrl: data.link,
                data: course
            });
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadAvatarCourseFailed());
        });
    };
}

export function uploadAvatarCourseSuccess(imageUrl) {
    return (
        {
            type: types.UPLOAD_AVATAR_COURSE_SUCCESS,
            imageUrl: imageUrl
        }
    );
}
export function uploadAvatarCourseFailed() {
    return (
        {
            type: types.UPLOAD_AVATAR_COURSE_FAILED,
        }
    );
}


const dataDefault = {
        id: "",
        name: "",
        duration: "",
        price: "",
        description:"",
        linkmac: "",
        linkwindow: "",
        num_classes: "",
        mac_how_install: "",
        window_how_install: "",
        cover_url: "",
        color: "",
        image_url: "",
        icon_url: "",
        created_at: "",
        detail: "",
        lessons: [],
        links: []
}