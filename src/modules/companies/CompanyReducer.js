import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function companyReducer(state = initialState.companies, action) {
    switch (action.type){
        case types.BEGIN_LOAD_COMPANIES:
            return{
                ...state,
                isLoadingCompanies: true,
            };
        case types.LOAD_COMPANIES_SUCCESS:
            return{
                ...state,
                isLoadingCompanies: false,
                company: action.data,
            };
        case types.LOAD_COMPANIES_ERROR:
            return{
                ...state,
                isLoadingCompanies: false,
            };
        case types.BEGIN_LOAD_COMPANY:
            return{
                ...state,
                isLoadingCompany: true,
            };
        case types.LOAD_COMPANY_SUCCESS:
            return{
                ...state,
                isLoadingCompany: true,
                company: action.data,
            };
        case types.LOAD_COMPANY_ERROR:
            return{
                ...state,
                isLoadingCompany: false,
            };
        case types.BEGIN_LOAD_FIELDS:
            return{
                ...state,
                isLoadingFields: true,
            };
        case types.LOAD_FIELDS_SUCCESS: {
            return {
                ...state,
                isLoadingFields: false,
                fields: action.data,
            };
        }
        case types.BEGIN_ADD_COMPANY:
            return{
                ...state,
                isSavingCompany: true,
            };
        case types.ADD_COMPANY_SUCCESS:
            return{
                ...state,
                isSavingCompany: false,
            };
        case types.ADD_COMPANY_ERROR:
            return{
                ...state,
                isSavingCompany: false,
            };
        case types.BEGIN_EDIT_COMPANY:
            return{
                ...state,
                isSavingCompany: true,
            };
        case types.EDIT_COMPANY_SUCCESS:
            return{
                ...state,
                isSavingCompany: false,
            };
        case types.EDIT_COMPANY_ERROR:
            return{
                ...state,
                isSavingCompany: false,
            };
        case types.BEGIN_ADD_FIELD:
            return{
                ...state,
                isSavingField: true,
            };
        case types.ADD_FIELD_SUCCESS:
            return{
                ...state,
                isSavingField: false,
            };
        case types.ADD_FILED_ERROR:
            return{
                ...state,
                isSavingField: false,
            };
        default:
            return state;
    }
}