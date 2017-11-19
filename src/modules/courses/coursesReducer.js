
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let data;
export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_COURSES_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        case types.LOADED_COURSES_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    coursesList: action.courses,
                    paginator: action.paginator
                }
            };
        case types.LOADED_COURSES_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_DELETE_COURSES:
            return {
                ...state,
            };

        case types.DELETE_COURSES_SUCCESS:
            data = deleteCourse(action.courseId, state.coursesList);
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    coursesList: data
                }
            };
        case types.DELETE_COURSES_ERROR:
            return {
                ...state,

            };
        case types.BEGIN_LOAD_COURSE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                    data: defaultData
                }
            };
        case types.LOAD_COURSE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    data: action.data
                }
            };
        case types.LOAD_COURSE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };

        case types.BEGIN_UPLOAD_AVATAR_COURSE:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: true,
                    updateAvatarError: false,
                }
            };
        case types.UPLOAD_AVATAR_COURSE_SUCCESS: {
            state.data['image_url'] = action.link;
            return {
                ...state,
                ...{
                    isUpdatingAvatar: false,
                    updateAvatarError: false,
                    data: state.data
                }
            };
        }
        case types.UPLOAD_AVATAR_COURSE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingAvatar: false,
                    updateAvatarError: true,

                }
            };
        case types.BEGIN_UPLOAD_LOGO_COURSE:{

            return {
                ...state,
                ...{
                    isUpdatingLogo: true,
                    updateLogoError: false,

                }
            };
        }
        case types.UPLOAD_LOGO_COURSE_SUCCESS: {
            state.data['icon_url'] = action.link;
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: false,
                    data: state.data
                }
            };
        }
        case types.UPLOAD_LOGO_COURSE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: true,

                }
            };
        case types.BEGIN_UPLOAD_COVER_COURSE:
            return {
                ...state,
                ...{
                    isUpdatingCover: true,
                    updateCoverError: false,
                }
            };
        case types.UPLOAD_COVER_COURSE_SUCCESS: {
            state.data['cover_url'] = action.link;
            return {
                ...state,
                ...{
                    isUpdatingCover: false,
                    updateCoverError: false,
                    data: state.data
                }
            };
        }
        case types.UPLOAD_COVER_COURSE_FAILED:
            return {
                ...state,
                ...{
                    isUpdatingCover: false,
                    updateCoverError: true,

                }
            };
        case types.BEGIN_CREATE_EDIT_COURSES:
            return {
                ...state,
                ...{
                    isCommitting: true,
                    commitSuccess: true,
                    data: action.data
                }
            };
        case types.CREATE_EDIT_COURSES_SUCCESS:{

            return {
                ...state,
                ...{
                    isCommitting: false,
                    data: action.data,
                    commitSuccess: true
                }
            };
        }
        case types.CREATE_EDIT_COURSES_ERROR:
            return {
                ...state,
                ...{
                    isCommitting: false,
                    commitSuccess: false
                }
            };

        case types.UPDATE_DATA_COURSES: {
            let feild = action.feild;
            let value = action.value;
            state.data[feild] = value;

            return {
                ...state,
                ...{
                    data: state.data
                }
            };
        }
        case types.DELETE_DATA_COURSES: {
            return {
                ...state,
                ...{
                    data: {
                        id: null,
                        name: "",
                        duration: "",
                        price: "",
                        description: "",
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
                }
            };
        }
        default:
            return state;
    }
}

function deleteCourse(courseId, courseList) {
    if (courseList) {
        courseList = courseList.filter(course => course.id !== courseId);
    }
    return courseList;
}


const defaultData = {
        id: null,
        name: "",
        duration: "",
        price: "",
        description: "",
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
};