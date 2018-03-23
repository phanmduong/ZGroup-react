/**
 * Created by Nguyen Tien Tai on 01/15/18.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function bankAccountsReducer(state = initialState.bankAccount, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_BANK_ACCOUNTS:
            return {
                ...state,
                ...{
                    isLoading: true
                }
            };
        case types.LOAD_BANK_ACCOUNTS_SUCCESS:
            return {
                ...state,
                accounts: action.accounts,
                isLoading: false
            };
        case types.TOGGLE_ADD_EDIT_BANK_ACCOUNTS_MODAL:
            return {
                ...state,
                addEditBankAccountModal: !state.addEditBankAccountModal
            };
        case types.HANDLE_BANK_ACCOUNTS:
            return {
                ...state,
                bankAccountEditModal: action.bankAccount
            };
        case types.BEGIN_SAVE_BANK_ACCOUNTS:
            return {
                ...state,
                isUpdatingEditModal: true
            };
        case types.ADD_BANK_ACCOUNT_ERROR:
            return {
                ...state,
                isUpdatingEditModal: false
            };
        case types.SAVE_BANK_ACCOUNTS_SUCCESS:
            return {
                ...state,
                isUpdatingEditModal: false,
                addEditBankAccountModal: false,
                accounts: [action.bankAccount, ...state.accounts]
            };
        case types.EDIT_BANK_ACCOUNTS_SUCCESS: {
            let accounts = state.accounts.map((bankAccount) => {
                if (bankAccount.id === action.bankAccount.id)
                    return {
                        ...bankAccount,
                        bank_name: action.bankAccount.bank_name,
                        bank_account_name: action.bankAccount.bank_account_name,
                        account_number: action.bankAccount.account_number,
                        owner_name: action.bankAccount.owner_name,
                        branch: action.bankAccount.branch,
                        display: action.bankAccount.display
                    };
                return bankAccount;
            });
            return {
                ...state,
                isUpdatingEditModal: false,
                addEditBankAccountModal: false,
                accounts: accounts
            };
        }
        default:
            return state;
    }
}



