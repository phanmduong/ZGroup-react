import types from '../constants/actionTypes';
import moment from "moment/moment";
// import initialState from '../../../reducers/initialState';

let tmpRegs = [];
let tmpReg = {};
let conferenceRoomInitState = {
    registers: [],
    salers: [],
    isLoading: false,
    totalPages: 1,
    currentPage: 1,
    totalCount: 1,
    limit: 20,
    register: {},
    isChangingStatus: false,
    isLoadingBases: false,
    isLoadingSalers: false,
    bases: [],
    isSavingPayment: false,
    isChangingOfficialTime: false,
    isOpenPaymentModal: false,
    isOpenDatetimeModal: false,
};

export default function registerConferenceRoomReducers(state = conferenceRoomInitState, action) {
    switch (action.type) {


        case types.BEGIN_LOAD_BASES:
            return {
                ...state,
                isLoadingBases: true,
            };
        case types.LOAD_BASES_SUCCESS:
            return {
                ...state,
                isLoadingBases: false,
                bases: action.bases,
            };
        case types.LOAD_BASES_ERROR:
            return {
                ...state,
                isLoadingBases: false,
            };


        case types.BEGIN_LOAD_SALERS:
            return {
                ...state,
                isLoadingSalers: true,
            };
        case types.LOAD_SALERS_SUCCESS:
            return {
                ...state,
                salers: action.salers,
                isLoadingSalers: false,
            };
        case types.LOAD_SALERS_ERROR:
            return {
                ...state,
                isLoadingSalers: false,
            };


        case types.BEGIN_LOAD_REGISTERS:
            return {
                ...state,
                isLoading: true
            };

        case types.LOAD_REGISTERS_SUCCESS:
            return {
                ...state,
                registers: prefixRegisters(action.registers),
                // registers : action.registers,
                isLoading: false,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                totalCount: action.totalCount
            };
        case types.LOAD_REGISTERS_ERROR:
            return {
                ...state,
                isLoading: false,
            };


        case types.BEGIN_CHANGE_CALL_STATUS:
            return {
                ...state,
                isChangingStatus: true,
            };
        case types.CHANGE_CALL_STATUS_SUCCESS:
            return {
                ...state,
                isChangingStatus: false,
                registers: addCall(action.register_id, state.registers, action.teleCall),
            };
        case types.CHANGE_CALL_STATUS_ERROR:
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
            return {
                ...state,
                isSavingPayment: false,
                registers: addPayment(action.register_id, state.registers, action.payment),
            };
        case types.SAVED_PAYMENT_ERROR:
            return {
                ...state,
                isSavingPayment: false,
            };


        case types.BEGIN_CHANGE_OFFICIAL_TIME:
            return {
                ...state,
                isChangingOfficialTime: true,
            };
        case types.CHANGE_OFFICIAL_TIME_ERROR:
            return {
                ...state,
                isChangingOfficialTime: false,
            };

        case types.CHANGE_OFFICIAL_TIME_SUCCESS:
            return {
                ...state,
                isChangingOfficialTime: false,
                registers: changeRegister(state.registers, state.register),
            };


        case types.CLOSE_DATE_TIME_MODAL:
            return {
                ...state,
                isOpenDatetimeModal: false,
                register: {},
            };

        case types.OPEN_DATE_TIME_MODAL:
            return {
                ...state,
                isOpenDatetimeModal: true,
                register: action.register,
            };

        case types.CLOSE_PAYMENT_MODAL:
            return {
                ...state,
                isOpenPaymentModal: false,
                register: {},
            };

        case types.OPEN_PAYMENT_MODAL:
            return {
                ...state,
                isOpenPaymentModal: true,
                register: action.register,
            };


        case types.UPDATE_REGISTER:
            return {
                ...state,
                register: action.register,
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
                    ...register.historyPayments, payment],
                money: register.money + payment.money_value,
            };
            return tmpReg;
        }
        else return register;
    });
    return tmpRegs;
}

function prefixRegisters(registers) {
    const currentTime = new Date().getTime();
    // console.log(moment(currentTime).format("YYYY-MM-DD HH:mm:ss"), "prefixRegisters");
    return registers.map((register) => {
        return {
            ...register,
            official_start_time: register.start_time || moment(currentTime).format("YYYY-MM-DD HH:mm:ss"),
            official_end_time: register.end_time || moment(currentTime).format("YYYY-MM-DD HH:mm:ss"),
        };
    });
}

function changeRegister(registers, tmpregister) {
    return registers.map((register) => {
        if (register.id === tmpregister.id) {
            return tmpregister;
        }
        else {
            return register;
        }
    });
}