/**
 * Created by phanmduong on 4/6/17.
 */
import {UPDATE_CARD_POINT} from '../../../../constants/actionTypes';
import {showNotification} from '../../../../helpers/helper';

/*eslint no-console: 0 */
export function changePointCard(card) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_CARD_POINT,
            card
        });
        showNotification("Thay đổi điểm cho thẻ thành công");
    };
}
