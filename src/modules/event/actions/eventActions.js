import types from "../constants/actionTypes";
export default {
    showStoreEventModal: showStoreEventModal => {
        return dispatch => {
            dispatch({
                type: types.SHOW_STORE_EVENT_MODAL,
                showStoreEventModal,
            });
        };
    },
    updateEventFormData: event => {
        return dispatch => {
            dispatch({
                type: types.UPDATE_EVENT_FORM_DATA,
                event,
            });
        };
    },
};
