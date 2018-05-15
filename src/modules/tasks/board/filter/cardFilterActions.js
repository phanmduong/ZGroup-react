/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../../../constants/actionTypes';

export function setSelectedMembers(selectedMembers) {
    return function (dispatch) {
        dispatch({
            type: types.SET_SELECTED_MEMBERS,
            selectedMembers
        });

    };
}

export function setSelectedCardLabels(selectedCardLabels) {
    return function (dispatch) {
        dispatch({
            type: types.SET_SELECTED_CARD_LABELS,
            selectedCardLabels
        });

    };
}

