/**
 * Created by phanmduong on 4/6/17.
 */
import { SHOW_CREATE_REGISTER_MODAL, UPDATE_CREATE_REGISTER_FORM_DATA } from "./createRegisterActionType";

const createRegister = {
    showCreateRegisterModal: false,
    isLoading: false,
    register: {},
    isLoadingCourses: false,
    isLoadingClasses: false
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
        default:
            return state;
    }
}
