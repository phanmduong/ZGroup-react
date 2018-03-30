import types from '../constants/actionTypes';
// import initialState from '../../../reducers/initialState';

let tmp;
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
    register : {},
    isChangingStatus: false,
    isLoadingBases: false,
    isLoadingSalers: false,
    bases: [],
    isSavingPayment: false,
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


        case types.CLOSE_CALL_MODAL:
            return{
                ...state,
                isOpenCallModal : false,
            };
        case types.OPEN_CALL_MODAL:
            return{
                ...state,
                isOpenCallModal: true,
                register : action.register,
            };



        case types.BEGIN_LOAD_REGISTERS:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_REGISTERS_SUCCESS:
            return {
                ...state,
                registers: action.registers,
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
            tmp = addCall(action.register_id, state.registers, action.teleCall);
            return {
                ...state,
                isChangingStatus: false,
                registers: tmp,
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
