/**
 * Created by phanmduong on 4/6/17.
 */
import {
    SHOW_CREATE_REGISTER_MODAL,
    UPDATE_CREATE_REGISTER_FORM_DATA,
    BEGIN_LOAD_COURSES,
    LOADED_COURSES_SUCCESS,
    LOADED_COURSES_ERROR,
    BEGIN_LOAD_CLASSES,
    LOADED_CLASSES_SUCCESS,
    LOADED_CLASSES_ERROR,
    // SAVED_REGISTER_SUCCESS,
    // SAVED_REGISTER_ERROR,
    BEGIN_LOAD_CAMPAIGNS,
    LOADED_CAMPAIGNS_SUCCESS,
    LOADED_CAMPAIGNS_ERROR,

} from "./createRegisterActionType";
import * as types from "../../constants/actionTypes";


const createRegister = {
    showCreateRegisterModal: false,
    isLoading: false,
    register: {},
    isLoadingCourses: false,
    isLoadingClasses: false,
    courses: [],
    isLoadingCampaigns: false,
    campaigns: [],
    provinces: [],
    isLoadingProvinces: false,

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
            return {
                ...state,
                isLoadingCourses: true,
            };
        case  LOADED_COURSES_SUCCESS:
            return {
                ...state,
                isLoadingCourses: false,
                courses: action.courses,
            };
        case LOADED_COURSES_ERROR:
            return {
                ...state,
                isLoadingCourses: false,
            };

        case BEGIN_LOAD_CLASSES:
            return {
                ...state,
                isLoadingClasses: true,
            };
        case  LOADED_CLASSES_SUCCESS:
            return {
                ...state,
                isLoadingClasses: false,
                classes: action.classes,
            };
        case LOADED_CLASSES_ERROR:
            return {
                ...state,
                isLoadingClasses: false,
            };
        case BEGIN_LOAD_CAMPAIGNS:
            return {
                ...state,
                isLoadingCampaigns: true,
            };
        case  LOADED_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                isLoadingCampaigns: false,
                campaigns: action.campaigns,
            };
        case LOADED_CAMPAIGNS_ERROR:
            return {
                ...state,
                isLoadingCampaigns: false,
            };
        case types.BEGIN_LOAD_ALL_PROVINCES_BASE:
            return {
                ...state,
                isLoadingProvinces: true,
            };
        case types.LOAD_ALL_PROVINCES_SUCCESS:
            return {
                ...state,
                isLoadingProvinces: false,
                provinces: action.provinces
            };

        default:
            return state;
    }
}
