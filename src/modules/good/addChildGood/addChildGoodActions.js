import * as types from '../../../constants/actionTypes';

import * as goodApi from '../goodApi';
import {BEGIN_SAVE_CHILD_GOOD} from "../../../constants/actionTypes";
import {showErrorNotification} from "../../../helpers/helper";

export function updateChildGoodForm(good) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_ADD_CHILD_GOOD_FORM,
            good
        });
    };
}

export function updateTaskId(taskId) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_TASK_ID_CHILD_MODAL,
            taskId
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

export function saveChildGood(good) {
    return function (dispatch) {
        dispatch({
            type: BEGIN_SAVE_CHILD_GOOD
        });
        goodApi.saveChildGood(good)
            .then((res) => {
                if (res.data.status === 1) {
                    dispatch({
                        type: types.CREATE_CARD_SUCCESS,
                        card: res.data.data.card
                    });
                    dispatch({
                        type: types.SAVE_CHILD_GOOD_SUCCESS
                    });

                    dispatch({
                        type: types.OPEN_CLOSE_CARD_DETAIL_MODAL,
                        showModal: false,
                        card: {}
                    });

                } else {
                    dispatch({
                        type: types.SAVE_CHILD_GOOD_FAIL
                    });

                    showErrorNotification(res.data.message);
                }
            });
    };
}