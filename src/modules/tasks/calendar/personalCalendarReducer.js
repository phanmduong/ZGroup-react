/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function taskReducer(state = initialState.personalCalendar, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_CALENDAR_EVENTS :
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_CALENDAR_EVENTS_SUCCESS:
            return {
                ...state,
                calendarEvents: action.calendarEvents,
                isLoading: false
            };
        default:
            return state;
    }
}