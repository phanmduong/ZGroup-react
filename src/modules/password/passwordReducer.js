import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function passwordAccountReducer(state = initialState.passwordAccount, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_PASSWORDS:
            return {
                ...state,
                ...{
                    isLoading: true
                }
            };
        case types.LOAD_PASSWORDS_SUCCESS:
            return {
                ...state,
                passwords: action.passwords,
                isLoading: false,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                limit: action.limit,
                totalCount: action.totalCount,

            };
        case types.TOGGLE_ADD_EDIT_PASSWORDS_MODAL:
            return {
                ...state,
                editPasswordModal: !state.editPasswordModal
            };
        case types.HANDLE_PASSWORDS:
            return {
                ...state,
                passwordEditModal: action.passwordAccount
            };
        case types.BEGIN_SAVE_PASSWORDS:
            return {
                ...state,
                isUpdatingEditModal: true
            };
        case types.EDIT_PASSWORDS_SUCCESS: {
            let passwords = state.passwords.map((passwordAccount) => {
                if (passwordAccount.id === action.passwordAccount.id)
                    return {
                        ...passwordAccount,
                        code: action.passwordAccount.code,
                        name: action.passwordAccount.name,
                        password: action.passwordAccount.password,
                    };
                return passwordAccount;
            });
            return {
                ...state,
                isUpdatingEditModal: false,
                editPasswordModal: false,
                passwords: passwords
            };
        }
        default:
            return state;
    }
}



