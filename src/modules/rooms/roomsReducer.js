import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function rolesReducer(state = initialState.roles, action) {

    switch (action.type) {
        case types.BEGIN_LOAD_ROOMS_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_ROOMS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    rooms: action.rooms,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_ROOMS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: action.isLoading,
                    error: action.error
                }
            };
        case types.LOAD_BASES_ROOM_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    bases: action.bases,
                }
            };
        default:
            return state;
    }
}