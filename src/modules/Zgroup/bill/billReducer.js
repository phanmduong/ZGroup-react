import * as types from '../../../constants/actionTypes';
import initialState from '../../../reducers/initialState';

export default function proposePaymentReducer(state = initialState.payment, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_PAYMENTS:
            return {
                ...state,
                isLoadingPayments: true,
            };
        case types.LOAD_PAYMENTS_SUCCESS:
            return {
                ...state,
                isLoadingPayments: false,
                listPayment: action.data,
                paginator: action.paginator,
            };
        case types.LOAD_PAYMENTS_ERROR:
            return {
                ...state,
                isLoadingPayments: false,
            };
        case types.BEGIN_LOAD_PAYMENT:
            return {
                ...state,
                isLoadingPayment: true,
            };
        case types.LOAD_PAYMENT_SUCCESS:
            return {
                ...state,
                isLoadingPayment: false,
                payment: action.data,
            };
        case types.LOAD_PAYMENT_ERROR:
            return {
                ...state,
                isLoadingPayment: false,
            };
        case types.BEGIN_ADD_PAYMENT: {
            return {
                ...state,
                isSavingPayment: true,
            };
        }
        case types.ADD_PAYMENT_SUCCESS: {
            return {
                ...state,
                isSavingPayment: false,
            };
        }
        case types.ADD_PAYMENT_ERROR: {
            return {
                ...state,
                isSavingPayment: false,
            };
        }
        case types.BEGIN_EDIT_PAYMENT: {
            return {
                ...state,
                isSavingPayment: true,
            };
        }
        case types.EDIT_PAYMENT_SUCCESS: {
            return {
                ...state,
                isSavingPayment: false,
            };
        }
        case types.EDIT_PAYMENT_ERROR: {
            return {
                ...state,
                isSavingPayment: false,
            };
        }
        case types.BEGIN_LOAD_COMPANIES_PAYMENT:
            return {
                ...state,
                isLoadingCompanies: true,
            };
        case types.LOAD_COMPANIES_SUCCESS_PAYMENT:
            return {
                ...state,
                isLoadingCompanies: false,
                company: action.data,
            };
        case types.LOAD_COMPANIES_ERROR_PAYMENT:
            return {
                ...state,
                isLoadingCompanies: false,
            };
        case types.BEGIN_UPLOAD_IMAGE_PAYMENT:
            return {
                ...state,
                percent: 0,
                isUploading: true,
            };
        case types.UPLOAD_IMAGE_PAYMENT_SUCCESS:{
            return {
                ...state,
                isUploading: false,
                link: action.data,
                payment: {...action.pp, bill_image_url: action.data}
            };
        }
        case types.UPDATE_IMAGE_PROGRESS_PAYMENT:
            return {
                ...state,
                percent: action.percent,
            };
        case types.UPDATE_DATA_CREATE_PAYMENT:
            return {
                ...state,
                isLoadingPayment: true,
                payment: action.data,
            };
        case types.RESET_DATA_PAYMENT: {
            let defaultdata = {
                money_value: 0,
                bill_image_url: "",
                payer: {
                    id: 0,
                    account_number: "",
                },
                receiver: {
                    id: 0,
                    account_number: "",
                },
                description: "",
                link: ""
            };
            return {
                ...state,
                isLoadingPayment: false,
                payment: defaultdata,
                link: "",
            };
        }
        case types.BEGIN_CHANGE_STATUS_PAYMENT: {
            return {
                ...state,
                isLoadingPayment: true,
            };
        }
        case types.CHANGE_STATUS_PAYMENT_SUCCESS: {
            let data = state.payment.map((pp) => {
                return (pp.id === action.id) ? {...pp, status: 1} : pp
                ;
            });

            return {
                ...state,
                isLoadingPayment: false,
                payment: data,
            };
        }
        case types.CHANGE_STATUS_PAYMENT_ERROR: {
            return {
                ...state,
                isLoadingPayment: true,
            };
        }
        default:
            return state;
    }
}