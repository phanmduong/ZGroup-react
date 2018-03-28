import types from "../constants/actionTypes";
import moment from "moment";
import { DATE_VN_FORMAT, TIME_FORMAT_H_M } from "../../../constants/constants";


let tmpevents;
const initEventState = {
    events: [],
    event: {
        start_date: moment().format(DATE_VN_FORMAT),
        start_time: moment().format(TIME_FORMAT_H_M),
        end_time: moment().format(TIME_FORMAT_H_M),
        end_date: moment().format(DATE_VN_FORMAT),
        cover_url :"",
        avatar_url : "",
        name : "",
        slug : "",
        address : "",
        meta_description:"",
        keyword : "",
        detail : "",
    },
    isLoadingEvents: false,
    isSavingEvent: false,
    message: "",
    showStoreEventModal: false,
    totalPages : 0,
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
                showStoreEventModal: false,
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
        case types.BEGIN_LOAD_ALL_EVENTS:
            return{
                ...state,
                isLoadingEvents : true,
            };
        case types.LOADED_ALL_EVENTS_SUCCESS:
            console.log(action.events);
            return{
                ...state,
                isLoadingEvents : false,
                events : action.events,
                totalPages : action.totalPages,
            };
        case types.LOADED_ALL_EVENTS_ERROR:
            return{
                ...state,
                isLoadingEvents : false,
            };
        case types.CHANGE_STATUS_IN_EVENTS:
            return{
                ...state,
                events : changeStatus(state.events,action.id,action.status)
            };
        default:
            return state;
    }
}

function changeStatus(events, id, status) {
    tmpevents = [];
    tmpevents = events.map((event) => {
        if (event.id === id) {
            let tmp = status === "PUBLISH" ? "UNPUBLISH" : "PUBLISH";
            return {...event, status: tmp};
        }
        else {
            return event;
        }
    });
    return tmpevents;
}
