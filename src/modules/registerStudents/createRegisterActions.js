import { SHOW_CREATE_REGISTER_MODAL, UPDATE_CREATE_REGISTER_FORM_DATA } from "./createRegisterActionType";

export const showCreateRegisterModal = showCreateRegisterModal => {
    return dispatch => {
        dispatch({
            type: SHOW_CREATE_REGISTER_MODAL,
            showCreateRegisterModal,
        });
    };
};

export const updateFormData = register => {
    return dispatch => {
        dispatch({
            type: UPDATE_CREATE_REGISTER_FORM_DATA,
            register,
        });
    };
};

/*eslint no-console: 0 */
