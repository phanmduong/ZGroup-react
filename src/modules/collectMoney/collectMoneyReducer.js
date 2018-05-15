/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let users;
export default function collectMoneyReducer(state = initialState.collectMoney, action) {
    switch (action.type) {
        case types.BEGIN_SEARCH_REGISTERS_COLLECT_MONEY:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.SEARCH_REGISTERS_COLLECT_MONEY_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    nextCode: action.nextCode,
                    nextWaitingCode: action.nextWaitingCode,
                    users: action.users,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.SEARCH_REGISTERS_COLLECT_MONEY_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true,
                }
            };
        case types.BEGIN_PAY_REGISTER_COLLECT_MONEY:
            users = changeStatusUpdating(action.registerId, true, state.users);
            return {
                ...state,
                users: users
            };
        case types.PAY_REGISTER_COLLECT_MONEY_SUCCESS:
            users = changeStatusUpdating(action.register.id, false, state.users);
            users = changeData(action.register, users);
            return {
                ...state,
                ...{
                    nextCode: action.nextCode,
                    nextWaitingCode: action.nextWaitingCode,
                    users: users
                }
            };
        case types.PAY_REGISTER_COLLECT_MONEY_ERROR:
            users = changeStatusUpdating(action.registerId, false, state.users);
            return {
                ...state,
                users: users
            };

        default:
            return state;
    }
}

function changeStatusUpdating(registerId, status, users) {
    if (users) {
        users = users.map((user) => {
            let registers = user.registers.map((register) => {
                if (register.id === registerId) {
                    return {
                        ...register,
                        isUpdating: status
                    };
                }
                return register;
            });

            return {
                ...user,
                registers: registers
            };
        });
    }
    return users;
}

function changeData(registerData, users) {
    if (users) {
        users = users.map((user) => {
            let registers = user.registers.map((register) => {
                if (register.id === registerData.id) {
                    return registerData;
                }
                return register;
            });

            return {
                ...user,
                registers: registers
            };
        });
    }
    return users;
}
