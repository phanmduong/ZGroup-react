import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function DashBoardUpReducer(state = initialState.dashboardUp, action) {
    switch (action.type){
        case types.BEGIN_LOAD_BASES_DASHBOARDUP:
            return{
                ...state,
                isLoadingBases: true,
            };
        case types.LOAD_BASES_DASHBOARDUP_SUCCESS:
            return{
                ...state,
                isLoadingBases: false,
                bases: action.bases,
            };
        case types.LOAD_BASES_DASHBOARDUP_ERROR:
            return{
                ...state,
                isLoadingBases: false,
            };
        case types.BEGIN_LOAD_DASHBOARDUP:
            return{
                ...state,
                isLoadingDashBoard: true,
            };
        case types.LOAD_DASHBOARDUP_SUCCESS: {
            return {
                ...state,
                isLoadingDashBoard: false,
                dashboard: action.dashboard,
            };
        }
        case types.LOAD_DASHBOARDUP_ERROR:
            return{
                ...state,
                isLoadingDashBoard: false,
            };
        default:
            return state;
    }
}