import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let leads;
export default function leadReducer(state = initialState.lead, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_LIST_LEAD:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_LIST_LEAD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    leads: action.leads,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    totalCount: action.totalCount,
                }
            };
        case types.LOAD_LIST_LEAD_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_UPLOAD_LIST_LEAD:
            return {
                ...state,
                ...{
                    isUploading: true,
                    errorUpload: false,
                }
            };
        case types.UPLOAD_LIST_LEAD_SUCCESS:
            return {
                ...state,
                ...{
                    isUploading: false,
                    errorUpload: false,
                }
            };
        case types.UPLOAD_LIST_LEAD_ERROR:
            return {
                ...state,
                ...{
                    isUploading: false,
                    errorUpload: true,
                }
            };
        case types.BEGIN_EDIT_INFO_LEAD:
            return {
                ...state,
                ...{
                    isEditing: true,
                    errorEdit: false,
                }
            };
        case types.EDIT_INFO_LEAD_SUCCESS:
            leads = state.leads.map((lead) => {
                if (lead.id == action.lead.id) {
                    return {...action.lead};
                }
                return {...lead};
            });
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorEdit: false,
                    leads: leads
                }
            };
        case types.EDIT_INFO_LEAD_ERROR:
            return {
                ...state,
                ...{
                    isEditing: false,
                    errorUpload: true,
                }
            };
        case types.BEGIN_UPLOAD_DISTRIBUTION_LEAD:
            return {
                ...state,
                ...{
                    isDistributing: true,
                    errorDistribution: false,
                }
            };
        case types.UPLOAD_DISTRIBUTION_LEAD_SUCCESS:
            return {
                ...state,
                ...{
                    isDistributing: false,
                    errorDistribution: false,
                }
            };
        case types.UPLOAD_DISTRIBUTION_LEAD_ERROR:
            return {
                ...state,
                ...{
                    isDistributing: false,
                    errorDistribution: true,
                }
            };
        default:
            return state;
    }
}
