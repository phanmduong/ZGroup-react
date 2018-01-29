import {
    BEGIN_LOAD_BANK_TRANSFERS, LOAD_BANK_TRANSFERS_SUCCESS,
    UPDATE_BANK_TRANSFER_STATUS
} from "../../constants/actionTypes";
import initialState from '../../reducers/initialState';

export default function financeReducer(state = initialState.finance, action) {
    switch (action.type) {
        case UPDATE_BANK_TRANSFER_STATUS:
            return {
                ...state,
                bankTransfers: state.bankTransfers.map((bankTransfer) => {
                    if (action.bankTransfer.id === bankTransfer.id) {
                        return action.bankTransfer;
                    }
                    return bankTransfer;
                })
            };
        case BEGIN_LOAD_BANK_TRANSFERS:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_BANK_TRANSFERS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                bankTransfers: action.bankTransfers
            };
        default:
            return state;
    }
}

