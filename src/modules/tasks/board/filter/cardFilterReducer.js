/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../../../constants/actionTypes';
import initialState from '../../../../reducers/initialState';

export default function cardFilterReducer(state = initialState.cardFilter, action) {
    switch (action.type) {
        case types.LOAD_CARD_LABEL_SUCCESS:
            return {
                ...state,
                cardLabels: action.cardLabels
            };
        case types.CREATE_TASK_LIST_SUCCESS:
            return {
                ...state,
                members: action.projectMembers ? action.projectMembers : state.members
            };
        case types.SET_SELECTED_MEMBERS:
            return {
                ...state,
                selectedMembers: action.selectedMembers
            };
        case types.SET_SELECTED_CARD_LABELS:
            return {
                ...state,
                selectedCardLabels: action.selectedCardLabels
            };

        case types.LOAD_BOARDS_SUCCESS:
            return {
                ...state,
                cardLabels: action.cardLabels,
                members: action.members
            };
        default:
            return state;
    }
}