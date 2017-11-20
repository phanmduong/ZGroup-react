/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function importGoodsReducer(state = initialState.marketingCampaigns, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_MARKETING_CAMPAIGNS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_MARKETING_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    marketingCampaigns: action.marketingCampaigns,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_MARKETING_CAMPAIGNS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_LOAD_COURSES_MARKETING_CAMPAIGNS:
            return {
                ...state,
                ...{
                    isLoadingCourses: true,
                    errorCourses: false,
                }
            };
        case types.LOAD_COURSES_MARKETING_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingCourses: false,
                    errorCourses: false,
                    courses: action.courses,
                }
            };
        case types.LOAD_COURSES_MARKETING_CAMPAIGNS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingCourses: false,
                    errorCourses: true
                }
            };
        default:
            return state;
    }
}