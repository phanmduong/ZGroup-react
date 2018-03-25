import types from "../constants/actionTypes";
import moment from "moment";
import { DATE_VN_FORMAT, TIME_FORMAT_H_M } from "../../../constants/constants";

const initEventState = {
    events: [],
    event: {
        start_date: moment().format(DATE_VN_FORMAT),
        start_time: moment().format(TIME_FORMAT_H_M),
        end_time: moment().format(TIME_FORMAT_H_M),
        end_date: moment().format(DATE_VN_FORMAT),
    },
    isLoadingEvents: false,
    isSavingEvent: false,
    message: "",
    showStoreEventModal: false,
};
export default function eventReducer(state = initEventState, action) {
    switch (action.type) {
        case types.SAVE_EVENT_ERROR:
            return {
                ...state,
                message: action.message,
            };
        case types.SAVE_EVENT_SUCCESS:
            return {
                ...state,
                isSavingEvent: false,
                event: {},
            };
        case types.BEGIN_SAVE_EVENT:
            return {
                ...state,
                isSavingEvent: true,
            };
        case types.UPDATE_EVENT_FORM_DATA:
            return {
                ...state,
                event: action.event,
            };
        case types.BEGIN_LOAD_EVENTS:
            return {
                ...state,
                isLoadingEvents: true,
            };
        case types.LOAD_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events,
                isLoadingEvents: false,
            };
        case types.SHOW_STORE_EVENT_MODAL:
            return {
                ...state,
                showStoreEventModal: action.showStoreEventModal,
            };
        default:
            return state;
    }
}
