import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function moneyTransferReducer(state = initialState.moneyTransfer, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_USER_MONEY_TRANSFER:
            return {
                ...state,
                ...{
                    isLoadingUser: true,
                    errorLoadUser: false,
                }
            };
        case types.LOAD_USER_MONEY_TRANSFER_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingUser: false,
                    errorLoadUser: false,
                    user: action.user
                }
            };
        case types.LOAD_USER_MONEY_TRANSFER_ERROR:
            return {
                ...state,
                ...{
                    isLoadingUser: false,
                    errorLoadUser: true,
                }
            };

        default:
            return state;
    }
}
