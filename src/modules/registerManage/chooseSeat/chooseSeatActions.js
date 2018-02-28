import { TOGGLE_CHOOSE_SEAT_MODAL } from "./chooseSeatActionType";

export const toggleShowChooseSeatModal = (showModal, baseId = 0) => {
    return dispatch => {
        dispatch({
            type: TOGGLE_CHOOSE_SEAT_MODAL,
            showModal,
            baseId,
        });
    };
};
