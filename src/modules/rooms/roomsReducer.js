import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function rolesReducer(state = initialState.rooms, action) {

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
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_BASES_ROOM_DATA:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false,
                }
            };
        case types.LOAD_BASES_ROOM_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_ROOM_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
        case types.BEGIN_STORE_ROOM_DATA:
            return {
                ...state,
                ...{
                    isStoringRoom: true,
                    errorStoreRoom: false,
                }
            };
        case types.STORE_ROOM_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isStoringRoom: false,
                    errorStoreRoom: false,
                }
            };
        case types.STORE_ROOM_DATA_ERROR:
            return {
                ...state,
                ...{
                    isStoringRoom: false,
                    errorStoreRoom: true,
                }
            };
        default:
            return state;
    }
}