/**
 * Created by nangbandem
 */
import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function requestReducer(state = initialState.request, action) {
    // console.log(action.type, state.data);
    switch (action.type) {
        case types.BEGIN_CREATE_REQUEST_VACATION:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CREATE_REQUEST_VACATION_SUCCESS: {
            return {
                ...state,
                isCommitting: false,
            };
        }

        case types.CREATE_REQUEST_VACATION_ERROR:
            return {
                ...state,
                isCommitting: false,
            };
        case types.BEGIN_CREATE_REQUEST_MONEY:
            return {
                ...state,
                isCommitting: true,
            };
        case types.CREATE_REQUEST_MONEY_SUCCESS: {
            return {
                ...state,
                isCommitting: false,
            };
        }

        case types.CREATE_REQUEST_MONEY_ERROR:
            return {
                ...state,
                isCommitting: false,
            };

        case types.BEGIN_GET_DETAIL_REQUEST_VACATION:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_DETAIL_REQUEST_VACATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case types.GET_DETAIL_REQUEST_VACATION_ERROR:
            return {
                ...state,
                isLoading: false,
            };
            
        case types.BEGIN_GET_DETAIL_REQUEST_MONEY:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_DETAIL_REQUEST_MONEY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case types.GET_DETAIL_REQUEST_MONEY_ERROR:
            return {
                ...state,
                isLoading: false,
            };

        case types.BEGIN_GET_ALL_REQUEST_VACATION:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_ALL_REQUEST_VACATION_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                requestVacations: action.data.requestVacation,
                paginator: action.data.paginator,

            };
        }
        case types.GET_ALL_REQUEST_VACATION_ERROR:
            return {
                ...state,
                isLoading: false,
            };
            
        case types.BEGIN_GET_ALL_REQUEST_MONEY:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_ALL_REQUEST_MONEY_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                requestMoneys: action.data.data,
                paginator: action.data.paginator,
            };
        }
        
        case types.GET_ALL_REQUEST_MONEY_ERROR:
            return {
                ...state,
                isLoading: false,
                
            };
        case types.LOAD_ALL_COMPANY_SUCCESS: {
            
                return {
                    ...state,
                    companies: getSelectArray(action.companies),
                };
            }
        default:
            return state;
    }
}

function getSelectArray(arr) {
    let res = arr.map(obj => {
        return {
            ...obj,
            value: obj.id,
            label: obj.name,
        };
    });
    return res;
}