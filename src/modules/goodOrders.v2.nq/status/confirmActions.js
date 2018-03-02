import * as types from '../../../constants/actionTypes';


export function showConfirmOrderModal() {
    return (dispatch) => {
        dispatch({
            type: types.TOGGLE_CONFIRM_ORDER_MODAL
        });
    };
}

