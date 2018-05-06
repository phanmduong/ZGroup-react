import * as types from './sessionActionTypes';
import initialState from "../../reducers/initialState";


export default function sessionReducer(state = initialState.session, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_ALL_SESSIONS:
            return{
                ...state,
                isLoadingAllSessions: true,
            };
        case types.LOAD_ALL_SESSIONS_SUCCESS:
            return {
                ...state,
                allSessions: action.allSessions,
                isLoadingAllSessions: false,
                currentPageAll: action.currentPageAll,
                limitAll: action.limitAll,
                totalCountAll: action.totalCountAll,
                totalPagesAll: action.totalPagesAll,
            };
        case types.BEGIN_LOAD_SHOWING_SESSION:
            return{
                ...state,
                isLoadingShowingSession: true,
            };
        case types.LOAD_SHOWING_SESSION_SUCCESS:
            return {
                ...state,
                showingSession: action.showingSession,
                currentPageShowing: action.currentPageShowing,
                limitShowing: action.limitShowing,
                totalCountShowing: action.totalCountShowing,
                totalPagesShowing: action.totalPagesShowing,
                isLoadingShowingSession: false,
            };
        case types.TOGGLE_ADD_EDIT_SESSION_MODAL:
            return {
                ...state,
                addEditSessionModal:!state.addEditSessionModal
            };
        case types.BEGIN_SAVE_SESSION:
            return{
                ...state,
                isSaving: true,
                isSavingSession: true
            };
        case types.EDIT_FILM_ERROR:
            return{
                ...state,
                isSavingSession:false
            };
        case types.SAVE_SESSION_SUCCESS:
            return{
                ...state,
                allSessions:[action.session,...state.allSessions],
                addEditSessionModal: false,
                isSavingSession: false,
                isSaving: false
            };
        case types.HANDLE_SESSION_MODAL:
            return{
                ...state,
                sessionModal: action.session
            };
        case types.EDIT_SESSION_SUCCESS:
        {
            let session = state.allSessions.map((session) => {
                if (session.id === action.session.id){
                    return {
                        ...session,
                        film_id:action.session.film_id,
                        film_quality:action.session.film_quality,
                        room_id:action.session.room_id,
                        start_time:action.session.start_time,
                        start_date:action.session.start_date,

                    };
                }
                return session;
            });
            return {
                ...state,
                addEditSessionModal: false,
                isSavingSession: false,
                allSessions: session
            };
        }
        case types.DELETE_SESSION_SUCCESS:
            return{
                ...state,
                allSessions: state.allSessions.filter(session => session.id !== action.session.id)
            };
        case types.BEGIN_LOAD_ALL_FILMS:
            return{
                ...state,
              isLoadingFilms: true,
            };
        case types.LOAD_ALL_FILMS_SUCCESS:
            return {
                ...state,
                allFilms: action.allFilms,
                isLoadingFilms: false
            };
        default:
            return state;
    }
}
