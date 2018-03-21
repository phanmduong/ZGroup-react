import types from "../constants/actionTypes";

const initEventState = {
    events: [],
    event: {},
    isLoadingEvents: false,
    showStoreEventModal: false,
};
export default function eventReducer(state = initEventState, action) {
    switch (action.type) {
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
