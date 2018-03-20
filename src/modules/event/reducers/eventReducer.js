import types from "../constants/actionTypes";

const initEventState = {
    events: [],
    isLoadingEvents: false,
};
export default function eventReducer(state = initEventState, action) {
    switch (action.type) {
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
    }
}
