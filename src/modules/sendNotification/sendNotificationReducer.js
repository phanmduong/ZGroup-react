import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function sendNotificationReducer(state = initialState.sendNotification, action) {
    switch (action.type) {
        case types.BEGIN_SEND_NOTIFICATION:
            return {
                ...state,
                ...{
                    isSending: true,
                    errorSend: false,
                }
            };
        case types.SEND_NOTIFICATION_SUCCESS:
            return {
                ...state,
                ...{
                    isSending: false,
                    errorSend: false,
                }
            };
        case types.SEND_NOTIFICATION_ERROR:
            return {
                ...state,
                ...{
                    isSending: false,
                    errorSend: true
                }
            };
        default:
            return state;
    }
}