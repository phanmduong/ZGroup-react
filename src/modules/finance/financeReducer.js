import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function financeReducer(state = initialState.finance, action) {
    switch (action.type) {
        case types.UPDATE_BANK_TRANSFER_STATUS:
            return {
                ...state,
                bankTransfers: state.bankTransfers.map((bankTransfer) => {
                    if (action.bankTransfer.id === bankTransfer.id) {
                        return action.bankTransfer;
                    }
                    return bankTransfer;
                })
            };
        case types.BEGIN_LOAD_BANK_TRANSFERS:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_BANK_TRANSFERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bankTransfers: action.bankTransfers,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount
            };
        case types.UPDATE_STATUS_BANK_TRANSFER_SUCCESS:
            return {
                ...state,
                bankTransfers: state.bankTransfers.map(b => {
                    if (b.id === action.id) return {
                        ...b,
                        status: action.status
                    };
                    return b;
                }),
                cancelReasonModal: false
            };
        case types.TOGGLE_CANCEL_REASON_MODAL:
            return {
                ...state,
                cancelReasonModal: !state.cancelReasonModal
            };
        case types.HANDLE_CANCEL_REASON_MODAL:
            return {
                ...state,
                transferCancelReason: action.transfer
            };
        case types.EDIT_BANK_TRANSFER_SUCCESS:
            return {
                ...state,
                bankTransfers: state.bankTransfers.map(b => {
                    if (b.id === action.bankTransfer.id) return action.bankTransfer;
                    return b;
                }),
                bankTransferEditModal: false
            };
        case types.TOGGLE_BANK_TRANSFER_EDIT_MODAL:
            return {
                ...state,
                bankTransferEditModal: !state.bankTransferEditModal
            };
        case types.HANDLE_BANK_TRANSFER_EDIT_MODAL:
            return {
                ...state,
                transferEdit: action.transfer
            };
        case types.HANDLE_LOAD_MONEY_TO_WALLET_MODAL:
            return {
                ...state,
                transferMoneyToWallet: action.transfer
            };
        case types.TOGGLE_LOAD_MONEY_TO_WALLET_MODAL:
            return {
                ...state,
                loadMoneyToWalletModal: !state.loadMoneyToWalletModal
            };
        case types.BEGIN_LOAD_CUSTOMERS_BANK_TRANSFER:
            return {
                ...state,
                isLoadingCustomer: true
            };
        case types.LOAD_CUSTOMERS_BANK_TRANSFER_COMPLETE:
            return {
                ...state,
                isLoadingCustomer: false,
                customers: action.customers
            };
        case types.BEGIN_LOAD_MONEY_TO_WALLET:
            return {
                ...state,
                isLoadingMoneyToWallet: true
            };
        case types.LOAD_MONEY_TO_WALLET_COMPLETE:
            return {
                ...state,
                isLoadingMoneyToWallet: false,
                transferMoneyToWallet: {
                    money: '',
                    deposit: 1
                }
            };
        default:
            return state;
    }
}

