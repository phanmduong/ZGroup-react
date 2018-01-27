/**
 * Created by Nguyen Tien Tai on 01/15/18.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function bankAccountReducer(state = initialState.bankAccount, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BANK_ACCOUNTS:
            return {
                ...state,
                ...{
                    isLoading: true
                }
            };
        default:
            return state;
    }
}