import types from "../constants/actionTypes";
import eventApi from "../api/eventApi";

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
    saveEvent: event => {
        return async dispatch => {
            dispatch({
                type: types.BEGIN_SAVE_EVENT,
            });

            const res = await eventApi.saveEvent(event);

            console.log(res);

            dispatch({
                type: types.SAVE_EVENT_SUCCESS,
                event: res.data.event,
            });
        };
    },
};
