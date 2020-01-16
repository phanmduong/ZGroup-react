import * as helper from '../../helpers/helper';
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let data;
export default function courseReducer(state = initialState.courses, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_LINK:
            return {
                ...state,
                ...{
                    isLoading: true,
                    link: state.link,
                    data: state.data
                }
            };
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
            data = deleteCourse(action.courseId, {...state.coursesList});
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
        case types.BEGIN_DELETE_LESSON:
            return {
                ...state,
            };

        case types.DELETE_LESSON_SUCCESS:
            data = deleteLesson(action.lessonId, {...state.data});
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: data
                }
            };
        case types.DELETE_LESSON_ERROR:
            return {
                ...state,

            };
        case types.BEGIN_DELETE_LINK:
            return {
                ...state,
            };

        case types.DELETE_LINK_SUCCESS:
            data = deleteLink(action.linkId, {...state.data});
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: data,
                }
            };
        case types.DELETE_LINK_ERROR:
            return {
                ...state,

            };
        case types.BEGIN_DELETE_PIXEL:
            return {
                ...state,
                isLoading: false,
            };

        case types.DELETE_PIXEL_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.DELETE_PIXEL_ERROR:
            return {
                ...state,
                isLoading: false,

            };
        case types.BEGIN_LOAD_COURSE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                    data: defaultData,
                    link: state.link,
                }
            };
        case types.LOAD_COURSE_SUCCESS: {
            let categories = action.data.categories.map((obj) => {
                return {
                    ...obj,
                    value: obj.id,
                    label: obj.name,
                    avatar_url: helper.validateLinkImage(obj.icon_url),
                };
            })[0];
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    data: {...action.data, categories},
                    link: state.link,
                }
            };
        }
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
            let newdata = {...state.data};
            newdata.image_url = action.link;
            return {
                ...state,
                ...{
                    isUpdatingAvatar: false,
                    updateAvatarError: false,
                    data: newdata
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
        case types.BEGIN_UPLOAD_LOGO_COURSE: {

            return {
                ...state,
                ...{
                    isUpdatingLogo: true,
                    updateLogoError: false,

                }
            };
        }
        case types.UPLOAD_LOGO_COURSE_SUCCESS: {
            let newdata = {...state.data};
            newdata.icon_url = action.link;
            return {
                ...state,
                ...{
                    isUpdatingLogo: false,
                    updateLogoError: false,
                    data: newdata
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
            let newdata = {...state.data};
            newdata.cover_url = action.link;
            return {
                ...state,
                ...{
                    isUpdatingCover: false,
                    updateCoverError: false,
                    data: newdata
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
        case types.BEGIN_UPLOAD_ICON_LINK:
            return {
                ...state,
                ...{
                    isUploadingLinkIcon: true,
                }
            };
        case types.UPLOAD_ICON_LINK_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingLinkIcon: false,
                    data: state.data,
                    link: action.link,
                }
            };
        }
        case types.UPLOAD_ICON_LINK_FAILED:
            return {
                ...state,
                ...{
                    isUploadingLinkIcon: false,

                }
            };
        case types.OPEN_MODAL_EDIT_LINK: {
            return {
                ...state,
                ...{
                    data: state.data,
                    link: action.link,
                }
            };
        }
        case types.OPEN_MODAL_EDIT_PIXEL: {
            return {
                ...state,
                ...{
                    data: state.data,
                    pixel: action.pixel,
                }
            };
        }
        case types.BEGIN_CREATE_EDIT_COURSES:
            return {
                ...state,
                ...{
                    isCommitting: true,
                    commitSuccess: true,
                    data: action.data
                }
            };
        case types.CREATE_EDIT_COURSES_SUCCESS: {

            return {
                ...state,
                ...{
                    isCommitting: false,
                    //data: action.data,
                    commitSuccess: true,
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
        case types.BEGIN_CREATE_LINK:
            return {
                ...state,
                ...{
                    isUploadingLink: true,
                }
            };
        case types.CREATE_LINK_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingLink: false,
                    data: {
                        ...state.data,
                        links: [...state.data.links, action.link]
                    }
                }
            };
        }
        case types.CREATE_LINK_ERROR:
            return {
                ...state,
                ...{
                    isUploadingLink: false,
                }
            };
        case types.BEGIN_CREATE_PIXEL:
            return {
                ...state,
                ...{
                    isUploadingPixel: true,
                }
            };
        case types.CREATE_PIXEL_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingPixel: false,
                }
            };
        }
        case types.CREATE_PIXEL_ERROR:
            return {
                ...state,
                ...{
                    isUploadingPixel: false,
                }
            };
        case types.BEGIN_EDIT_PIXEL:
            return {
                ...state,
                ...{
                    isUploadingPixel: true,
                }
            };
        case types.EDIT_PIXEL_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingPixel: false,
                }
            };
        }
        case types.EDIT_PIXEL_ERROR:
            return {
                ...state,
                ...{
                    isUploadingPixel: false,
                }
            };
        case types.BEGIN_EDIT_LINK:
            return {
                ...state,
                ...{
                    isUploadingLink: true,
                    data: state.data,
                    link: state.link,
                }
            };
        case types.EDIT_LINK_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingLink: false,
                    data: state.data,
                    link: state.link,
                }
            };
        }
        case types.EDIT_LINK_ERROR:
            return {
                ...state,
                ...{
                    isUploadingLink: false,
                }
            };

        case types.UPDATE_DATA_LINK: {

            return {
                ...state,
                ...{
                    link: action.link
                }
            };
        }

        case types.UPDATE_DATA_PIXEL: {

            return {
                ...state,
                ...{
                    pixel: action.pixel
                }
            };
        }
        case types.UPDATE_DATA_COURSES: {
            return {
                ...state,
                ...{
                    data: action.course
                }
            };
        }
        case types.DELETE_DATA_COURSES: {
            return {
                ...state,
                ...{
                    data: defaultData,
                }
            };
        }
        case types.BEGIN_CREATE_TERM:
            return {
                ...state,
                ...{
                    isUploadingTerm: true,
                }
            };
        case types.CREATE_TERM_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingTerm: false,
                    data: {
                        ...state.data,
                        terms: [...state.data.terms, action.data]
                    }
                }
            };
        }
        case types.CREATE_TERM_ERROR:
            return {
                ...state,
                ...{
                    isUploadingTerm: false,
                }
            };

        case types.BEGIN_UPLOAD_ICON_TERM:
            return {
                ...state,
                ...{
                    isUploadingTermIcon: true,
                }
            };
        case types.UPLOAD_ICON_TERM_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingTermIcon: false,
                    data: state.data,
                    term: action.term,
                }
            };
        }
        case types.UPLOAD_ICON_TERM_FAILED:
            return {
                ...state,
                ...{
                    isUploadingTermIcon: false,

                }
            };

        case types.BEGIN_EDIT_TERM:
            return {
                ...state,
                ...{
                    isUploadingTerm: true,
                }
            };
        case types.EDIT_TERM_SUCCESS: {
            return {
                ...state,
                ...{
                    isUploadingTerm: false,
                }
            };
        }
        case types.EDIT_TERM_ERROR:
            return {
                ...state,
                ...{
                    isUploadingTerm: false,
                }
            };
        case types.BEGIN_DELETE_TERM:
            return {
                ...state,
            };
        case types.DELETE_TERM_SUCCESS:

            return {
                ...state,
            };
        case types.DELETE_TERM_ERROR:
            return {
                ...state,

            };
        case types.BEGIN_CHANGE_STATUS_COURSES: {
            let newdata = [...state.coursesList];
            let newcourse = {...state.coursesList[action.index]};
            newcourse.status = !newdata[action.index].status;
            newdata[action.index] = newcourse;
            return {
                ...state,
                coursesList: newdata
            };
        }
        case types.CHANGE_STATUS_COURSES_SUCCESS:

            return {
                ...state,
            };
        case types.CHANGE_STATUS_COURSES_ERROR: {
            let newdata = [...state.coursesList];
            let newcourse = {...state.coursesList[action.index]};
            newcourse.status = !newdata[action.index].status;
            newdata[action.index] = newcourse;
            return {
                ...state,
                coursesList: newdata
            };
        }
        case types.BEGIN_LOAD_ALL_TYPES: {
            return {
                ...state,
                //isLoading: true,
            };
        }
        case types.LOAD_ALL_TYPES_SUCCESS: {
            let data = action.types.map((obj) => {
                return {...obj, value: obj.id, label: obj.name,};
            });
            return {
                ...state,
                // isLoading: false,
                types: data,
            };
        }
        case types.LOAD_ALL_TYPES_ERROR: {
            return {
                ...state,
                // isLoading: false,
            };
        }
        case types.BEGIN_LOAD_ALL_CATEGORIES: {
            return {
                ...state,
                // isLoading: true,
            };
        }
        case types.LOAD_ALL_CATEGORIES_SUCCESS: {
            let data = action.categories.map((obj) => {
                return {
                    ...obj,
                    value: obj.id,
                    label: obj.name,
                    avatar_url: helper.validateLinkImage(obj.icon_url),
                };
            });
            return {
                ...state,
                // isLoading: false,
                categories: data,
            };
        }
        case types.LOAD_ALL_CATEGORIES_ERROR: {
            return {
                ...state,
                // isLoading: false,
            };
        }
        case types.BEGIN_SAVE_CATEGORY: {
            return {
                ...state,
                isSavingCategory: true,
            };
        }
        case types.SAVE_CATEGORY_ERROR: {
            return {
                ...state,
                isSavingCategory: false,
            };
        }
        case types.SAVE_CATEGORY_SUCCESS: {
            return {
                ...state,
                isSavingCategory: false,
            };
        }
        case types.BEGIN_DUPLICATE_COURSES:
            return {
                isDuplicating: true,
                ...state,
            };
        case types.DUPLICATE_COURSES_SUCCESS: {
            return {
                isDuplicating: false,
                ...state,
            };
        }
        case types.DUPLICATE_COURSES_ERROR:
            return {
                isDuplicating: false,
                ...state,

            };
        case types.BEGIN_DUPLICATE_LESSON:
            return {
                isDuplicating: true,
                ...state,
            };
        case types.DUPLICATE_LESSON_SUCCESS: {
            return {
                isDuplicating: false,
                ...state,
            };
        }
        case types.DUPLICATE_LESSON_ERROR:
            return {
                isDuplicating: false,
                ...state,

            };
        case types.BEGIN_DUPLICATE_TERM:
            return {
                isDuplicating: true,
                ...state,
            };
        case types.DUPLICATE_TERM_SUCCESS: {
            return {
                isDuplicating: false,
                ...state,
            };
        }
        case types.DUPLICATE_TERM_ERROR:
            return {
                isDuplicating: false,
                ...state,

            };
        case types.CHANGE_CATEGORY_COURSE: {
            let newdata = {...state.data};
            newdata.categories = action.data;
            return {
                ...state,
                data: newdata,
            };
        }
        case types.BEGIN_CREATE_LESSON_COURSE: {
            return {
                ...state,
                ...{
                    isCommittingLesson: true
                }
            };
        }
        case types.CREATE_LESSON_COURSE_SUCCESS: {
            return {
                ...state,
                ...{
                    isCommittingLesson: false,
                    data: {
                        ...state.data,
                        lessons: [...state.data.lessons, action.data]
                    }
                }
            };
        }
        case types.CREATE_LESSON_COURSE_ERROR: {
            return {
                ...state,
                ...{
                    isCommittingLesson: false
                }
            };
        }
        case types.TOGGLE_MODAL_EXAM_COURSE: {
            return {
                ...state,
                ...{
                    modalExam: !state.modalExam
                }
            };
        }
        case types.BEGIN_CREATE_EXAM_TEMPLATE_COURSE: {
            return {
                ...state,
                ...{
                    isStoringExam: true
                }
            };
        }
        case types.CREATE_EXAM_TEMPLATE_COURSE_SUCCESS: {
            return {
                ...state,
                ...{
                    isStoringExam: false,
                    data: {
                        ...state.data,
                        exam_templates: [...state.data.exam_templates, action.exam_template]
                    }
                }
            };
        }
        case types.CREATE_EXAM_TEMPLATE_COURSE_ERROR: {
            return {
                ...state,
                ...{
                    isStoringExam: false
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

function deleteLink(linkId, linkList) {
    if (linkList) {
        linkList.links = linkList.links.filter(link => link.id !== linkId);
    }
    return linkList;
}

function deleteLesson(lessonId, lessonList) {
    if (lessonList) {
        lessonList.lessons = lessonList.lessons.filter(lesson => lesson.id !== lessonId);
    }
    return lessonList;
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
    links: [],
    pixels: [],
    terms: [],
    categories: {},
    type_id: "",
    type: "",
};