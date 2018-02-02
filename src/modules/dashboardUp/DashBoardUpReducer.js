import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function DashBoardUpReducer(state = initialState.dashboardUp, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BASES_DASHBOARDUP:
            return {
                ...state,
                isLoadingBases: true,
            };
        case types.LOAD_BASES_DASHBOARDUP_SUCCESS:
            return {
                ...state,
                isLoadingBases: false,
                bases: action.bases,
            };
        case types.LOAD_BASES_DASHBOARDUP_ERROR:
            return {
                ...state,
                isLoadingBases: false,
            };
        case types.BEGIN_LOAD_ROOMS_BASE_DASHBOARDUP:
            return {
                ...state,
                isLoadingRooms: true,
            };
        case types.LOAD_ROOMS_BASE_DASHBOARDUP_SUCCESS:
            return {
                ...state,
                isLoadingRooms: false,
                rooms: action.data,
                rooms_count: action.count,
            };
        case types.LOAD_ROOMS_BASE_DASHBOARDUP_ERROR:
            return {
                ...state,
                isLoadingRooms: false,
            };
        case types.BEGIN_LOAD_SEATS_BASE_DASHBOARDUP:
            return {
                ...state,
                isLoadingSeats: true,
            };
        case types.LOAD_SEATS_BASE_DASHBOARDUP_SUCCESS:
            return {
                ...state,
                isLoadingSeats: false,
                seats: action.seats,
                seats_count: action.seats_count,
                available_seats: action.available_seats,
            };
        case types.LOAD_SEATS_BASE_DASHBOARDUP_ERROR:
            return {
                ...state,
                isLoadingSeats: false,
            };
        default:
            return state;
    }
}