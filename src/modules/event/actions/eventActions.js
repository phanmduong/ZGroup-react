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
        return dispatch => {
            dispatch({
                type: types.BEGIN_SAVE_EVENT,
            });
            return new Promise(async resolve => {
                const res = await eventApi.saveEvent(event);

                if (res.data.status) {
                    dispatch({
                        type: types.SAVE_EVENT_SUCCESS,
                        event: res.data.event,
                    });
                } else {
                    dispatch({
                        type: types.SAVE_EVENT_ERROR,
                        message: res.data.message,
                    });
                }

                resolve();
            });
        };
    },
};
