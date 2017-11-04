import * as types from '../../../constants/actionTypes';

// import * as goodApi from '../goodApi';

export function updateChildGoodForm(good) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ADD_CHILD_GOOD_FORM,
            good
        });
    };
}

export function updateBoardId(boardId) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_BOARD_ID_CHILD_MODAL,
            boardId
        });
    };
}

export function showAddChildGoodModal(showModal) {
    return function (dispatch, getState) {
        const good = getState().task.cardDetail.card.good;
        dispatch({
            type: types.SHOW_ADD_CHILD_GOOD_MODAL,
            showModal,
            good
        });
    };
}