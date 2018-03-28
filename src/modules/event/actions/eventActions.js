import types from "../constants/actionTypes";
import eventApi from "../api/eventApi";
import * as helper from "../../../helpers/helper";

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
    loadEvents: (page, limit, query) => {
        return dispatch => {
            dispatch({
                type: types.BEGIN_LOAD_ALL_EVENTS,
            });
            eventApi.loadEventsApi(page, limit, query)
                .then((res) => {
                    dispatch({
                        type: types.LOADED_ALL_EVENTS_SUCCESS,
                        events: res.data.events,
                        totalPages: res.data.paginator.total_pages,
                    });
                })
                .catch(() => {
                    dispatch({
                        type: types.LOADED_ALL_EVENTS_ERROR,
                    });
                });
        };
    },

    changeStatus: (id, status, name) => {

        console.log(status,"action");
        return function (dispatch) {
            dispatch({
                type: types.CHANGE_STATUS_IN_EVENTS,
                id,
                status,
            });
            eventApi.changeStatusApi(id,status).then(res => {
                if (res.data.status) {
                    (status === "UNPUBLISH")
                        ? helper.showNotification("Đã ẩn " + name)
                        : helper.showNotification("Đã hiển thị " + name);
                }
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
