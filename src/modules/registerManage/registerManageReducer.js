import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';
import moment from "moment";

let tmp;
let tmpRegs = [];
let tmpReg = {};

export default function goodOrdersReducer(state = initialState.registerManage, action) {
    switch (action.type) {

        case types.BEGIN_LOAD_BASES_IN_REGISTER_MANAGE:
            return {
                ...state,
                ...{
                    isLoadingBases: true,

                }
            };
        case types.LOAD_BASES_IN_REGISTER_MANAGE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_IN_REGISTER_MANAGE_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                }
            };


        case types.BEGIN_LOAD_REGISTER_MANAGE:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_REGISTER_MANAGE_SUCCESS:
            return {
                ...state,
                registers: action.registers,
                isLoading: false,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                totalCount: action.totalCount
            };
        case types.GET_ALL_SALER_REGISTER_MANAGE:
            return {
                ...state,
                salers: action.salers
            };

        case types.BEGIN_CHANGE_CALL_STATUS:
            return {
                ...state,
                isChangingStatus: true,
            };
        case types.LOADED_CHANGE_CALL_STATUS_SUCCESS:
            tmp = addCall(action.register_id, state.registers, action.teleCall);
            return {
                ...state,
                isChangingStatus: false,
                registers: tmp,
            };
        case types.LOADED_CHANGE_CALL_STATUS_ERROR:
            return {
                ...state,
                isChangingStatus: false,
            };

        case types.BEGIN_SAVE_PAYMENT:
            return {
                ...state,
                isSavingPayment: true,
            };
        case types.SAVED_PAYMENT_SUCCESS:
            tmp = addPayment(action.register_id, state.registers, action.payment);
            return {
                ...state,
                isSavingPayment: false,
                registers: tmp,
            };
        case types.SAVED_PAYMENT_ERROR:
            return {
                ...state,
                isSavingPayment: false,
            };
        case types.LOADED_USERPACKS_ERROR_IN_REGISTER:
            return {
                ...state,
                isLoadingUserpack: false,
            };
        case types.LOADED_USERPACKS_SUCCESS_IN_REGISTER:
            return {
                ...state,
                isLoadingUserpack: false,
                userpacks: action.userpacks,
            };
        case types.BEGIN_LOAD_USERPACKS_IN_REGISTER:
            return {
                ...state,
                isLoadingUserpack: true,
            };

        case types.BEGIN_SAVE_SUBSCRIPTION_IN_REGISTER:
            return {
                ...state,
                isSavingSubscription: true,
            };
        case types.SAVED_SUBSCRIPTION_SUCCESS_IN_REGISTER:
            return {
                ...state,
                isSavingSubscription: false,
                registers: updateRegisters(state.registers, action.register),
            };
        case types.SAVED_SUBSCRIPTION_ERROR_IN_REGISTER:
            return {
                ...state,
                isSavingSubscription: false,
            };

        case types.UPDATE_SELECT:
            return {
                ...state,
                select: countEndtime(action.select),

            };
        case types.UPDATE_REGISTER_IN_CHOOSE_SEAT:
            return{
                ...state,
                register : action.register,
            };


        case types.CLOSE_ADD_REGISTER_MODAL:
            return {
                ...state,
                isOpenAddRegisterModal: false,
                register: {},
            };

        case types.OPEN_ADD_REGISTER_MODAL:
            return {
                ...state,
                isOpenAddRegisterModal: true,
            };

        case types.BEGIN_CREATE_REGISTER:
            return {
                ...state,
                isCreatingRegister: true,
            };
        case types.CREATE_REGISTER_SUCCESS:
            return {
                ...state,
                isCreatingRegister: false,
            };
        case types.CREATE_REGISTER_ERROR:
            return {
                ...state,
                isCreatingRegister: false,
            };

        default:
            return state;
    }
}

function addCall(register_id, registers, teleCall) {
    tmpRegs = registers.map((register) => {
        if (register.id === register_id) {
            tmpReg = {...register, teleCalls: [...register.teleCalls, teleCall]};
            return tmpReg;
        }
        else return register;
    });
    return tmpRegs;
}

function addPayment(register_id, registers, payment) {
    tmpRegs = registers.map((register) => {
        if (register.id === register_id) {
            tmpReg = {
                ...register,
                historyPayments: [
                    ...register.historyPayments, payment
                ],
                money: register.money + payment.money_value
            };
            return tmpReg;
        }
        else return register;
    });
    return tmpRegs;
}

function countEndtime(select) {
    tmp = {
        ...select, end_time:
            moment(parseInt(Date.parse(select.start_time)) + (parseInt(select.hours) + parseInt(select.extra_time)) * 3600000).format("YYYY-MM-DD HH:mm:ss"),
    };
    return tmp;
}

function updateRegisters(registers, register) {
    return registers.map((tmp) => {
        if (tmp.id === register.id) {
            return register;
        }
        else {
            return tmp;
        }
    });
}
