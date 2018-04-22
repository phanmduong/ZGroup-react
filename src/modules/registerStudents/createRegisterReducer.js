/**
 * Created by phanmduong on 4/6/17.
 */
import { SHOW_CREATE_REGISTER_MODAL,
    UPDATE_CREATE_REGISTER_FORM_DATA,
    BEGIN_LOAD_COURSES,
    LOADED_COURSES_SUCCESS,
    LOADED_COURSES_ERROR,
    BEGIN_LOAD_CLASSES,
    LOADED_CLASSES_SUCCESS,
    LOADED_CLASSES_ERROR,
    // SAVED_REGISTER_SUCCESS,
    // SAVED_REGISTER_ERROR,

} from "./createRegisterActionType";


const createRegister = {
    showCreateRegisterModal: false,
    isLoading: false,
    register: {},
    isLoadingCourses: false,
    isLoadingClasses: false,
    courses:[],
};

export default function registerReducer(state = createRegister, action) {
    switch (action.type) {
        case SHOW_CREATE_REGISTER_MODAL:
            return {
                ...state,
                showCreateRegisterModal: action.showCreateRegisterModal,
            };
        case UPDATE_CREATE_REGISTER_FORM_DATA:
            return {
                ...state,
                register: action.register
            };
        case BEGIN_LOAD_COURSES:
            return{
                ...state,
                isLoadingCourses: true,
            };
        case  LOADED_COURSES_SUCCESS:
            return{
                ...state,
                isLoadingCourses : false,
                courses : action.courses,
            };
        case LOADED_COURSES_ERROR:
            return{
                ...state,
                isLoadingCourses: false,
            };

        case BEGIN_LOAD_CLASSES:
            return{
                ...state,
                isLoadingClasses: true,
            };
        case  LOADED_CLASSES_SUCCESS:
            return{
                ...state,
                isLoadingClasses : false,
                classes : action.classes,
            };
        case LOADED_CLASSES_ERROR:
            return{
                ...state,
                isLoadingClasses: false,
            };


        default:
            return state;
    }
}
