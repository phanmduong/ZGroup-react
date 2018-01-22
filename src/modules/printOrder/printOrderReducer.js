/**
 * Created by nangbandem
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function printOrderReducer(state = initialState.printOrder, action) {
    switch (action.type) {
        case "":
            return {
                ...state,

            };
        default:
            return state;
    }
}