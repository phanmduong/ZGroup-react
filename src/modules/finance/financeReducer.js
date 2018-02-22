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
                bankTransfers: action.bankTransfers
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
        default:
            return state;
    }
}

