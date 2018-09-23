import * as types from './campaignListActionTypes';
import initialState from "../../reducers/initialState";

export default function campaignListReducer(state = initialState.campaignList, action) {
    switch (action.type) {
        case  types.BEGIN_LOAD_CAMPAIGN_LIST:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_CAMPAIGN_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                campaigns: action.campaigns,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount
            };
        case types.CHANGE_CAMPAIGN_STATUS_SUCCESS:
            return {
                ...state,
                campaigns: state.campaigns.map(campaign => {
                    if (campaign.id === action.campaignId)
                        return {
                            ...campaign,
                            status: action.status
                        };
                    return campaign;
                })
            };
        case types.HANDLE_CREATE_EDIT_CAMPAIGN_MODAL:
            return {
                ...state,
                campaignCreateEdit: action.campaign
            };
        case types.TOGGLE_CREATE_EDIT_CAMPAIGN_MODAL:
            return {
                ...state,
                createEditCampaignModal: !state.createEditCampaignModal
            };
        case types.BEGIN_SAVE_CAMPAIGN_MODAL:
            return {
                ...state,
                isSavingCampaign: true
            };
        case types.SAVE_CAMPAIGN_SUCCESS:
            return {
                ...state,
                isSavingCampaign: false,
                createEditCampaignModal: false
            };
        case types.HANDLE_MANAGE_TEMPLATE_TYPES_MODAL:
            return {
                ...state,
                templateType: action.templateType
            };
        case types.TOGGLE_MANAGE_TEMPLATE_TYPES_MODAL:
            return {
                ...state,
                manageTemplateTypesModal: !state.manageTemplateTypesModal
            };
        case types.BEGIN_LOAD_TEMPLATE_TYPES:
            return {
                ...state,
                isLoadingTemplateTypes: true
            };
        case types.LOAD_TEMPLATE_TYPES_SUCCESS:
            return {
                ...state,
                isLoadingTemplateTypes: false,
                templateTypesList: action.templateTypesList,
                totalCountTemplateTypes: action.totalCountTemplateTypes,
                totalPagesTemplateTypes: action.totalPagesTemplateTypes,
                currentPageTemplateTypes: action.currentPageTemplateTypes,
                limitTemplateTypes: action.limitTemplateTypes,
                templateTypeSuccess: false
            };
        case types.TOGGLE_SAVE_TEMPLATE_TYPE_MODAL:
            return {
                ...state,
                isSavingTemplateTypes: !state.isSavingTemplateTypes
            };
        case types.SAVE_TEMPLATE_TYPE_SUCCESS:
            return {
                ...state,
                templateTypeSuccess: true
            };
        default:
            return state;
    }
}
