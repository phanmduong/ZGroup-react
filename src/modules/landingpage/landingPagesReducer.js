import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function landingPagesReducer(state = initialState.landingPages, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_LANDING_PAGES: {
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false
                }
            };
        }
        case types.LOAD_LANDING_PAGES_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    landingPages: action.landingPages,
                }
            };
        }
        case types.LOAD_LANDING_PAGES_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        }
        case types.BEGIN_DELETE_LANDING_PAGE: {
            return {
                ...state,
                ...{
                    isDeleting: true,
                    errorDelete: false
                }
            };
        }
        case types.DELETE_LANDING_PAGE_SUCCESS: {
            return {
                ...state,
                ...{
                    isDeleting: false,
                    errorDelete: false,
                }
            };
        }
        case types.DELETE_LANDING_PAGE_ERROR: {
            return {
                ...state,
                ...{
                    isDeleting: false,
                    errorDelete: true
                }
            };
        }
        default:
            return state;
    }
}

