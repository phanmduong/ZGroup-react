/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function notificationReducer(state = initialState.notification, action) {

    switch (action.type) {
        case types.NEW_NOTIFICATION:
            return {
                ...state,
                notificationList: {
                    ...state.notificationList,
                    notifications: [action.notification, ...state.notificationList.notifications],
                    unread: (state.notificationList.unread + 1)
                }
            };
        case types.READ_ALL_NOTIFICATIONS:
            return {
                ...state,
                notificationList: {
                    ...state.notificationList,
                    unread: 0
                }
            };
        case types.BEGIN_LOAD_NOTIFICATIONS:
            return {
                ...state,
                notificationList: {
                    ...state.notificationList,
                    isLoading: true
                }
            };
        case types.LOAD_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notificationList: {
                    ...state.notificationList,
                    isLoading: false,
                    notifications: action.reset ? action.notifications : [
                        ...state.notificationList.notifications,
                        ...action.notifications
                    ],
                    isEmpty: action.isEmpty,
                    unread: action.unread
                }
            };
        default:
            return state;
    }
}

