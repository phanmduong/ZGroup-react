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
        case types.BEGIN_LOAD_HISTORY_NOTIFICATION:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_HISTORY_NOTIFICATION_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    historyNotifications: action.historyNotifications,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_HISTORY_NOTIFICATION_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}