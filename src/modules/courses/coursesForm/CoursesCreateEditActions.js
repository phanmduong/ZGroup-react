import * as types from '../../../constants/actionTypes';
import * as courseApi from '../courseApi'


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

                dispatch({
                    type: types.LOAD_COURSE_SUCCESS,
                    data: res.data
                });
            })
            .catch(()=>{
                dispatch({type: types.LOAD_COURSE_ERROR});
            });
    };
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