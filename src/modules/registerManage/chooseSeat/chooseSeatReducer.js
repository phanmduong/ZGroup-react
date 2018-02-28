import { TOGGLE_CHOOSE_SEAT_MODAL } from "./chooseSeatActionType";

const initialState = {
    from: "",
    to: "",
    showModal: false,
    baseId: 0,
};

export default function chooseSeatReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_CHOOSE_SEAT_MODAL:
            return {
                ...state,
                showModal: action.showModal,
                baseId: action.baseId,
            };
        default:
            return state;
    }
}
