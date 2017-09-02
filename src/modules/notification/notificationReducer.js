/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function notificationReducer(state = initialState.notification, action) {

    switch (action.type) {

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
                    notifications: action.notifications,
                    isEmpty: action.isEmpty
                }
            };
        default:
            return state;
    }
}

