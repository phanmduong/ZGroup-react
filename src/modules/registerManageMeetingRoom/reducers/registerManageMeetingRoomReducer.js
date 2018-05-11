import types from '../constants/actionTypes';
// import moment from "moment/moment";
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
    isLoadingBases: false,
    isLoadingProvinces: false,
    isLoadingSalers: false,
    isLoadingRooms: false,
    bases: [],
    rooms: [],
    provinces: [],
    isSavingPayment: false,
    isChangingOfficialTime: false,
    isOpenPaymentModal: false,
    isOpenDatetimeModal: false,
    isOpenAddRegisterModal: false,

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


        case types.BEGIN_LOAD_PROVINCES:
            return {
                ...state,
                isLoadingProvinces: true,
            };
        case types.LOAD_PROVINCES_SUCCESS:
            return {
                ...state,
                isLoadingProvinces: false,
                provinces: action.provinces,
            };
        case types.LOAD_PROVINCES_ERROR:
            return {
                ...state,
                isLoadingProvinces: false,
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


        case types.BEGIN_LOAD_ROOMS:
            return {
                ...state,
                isLoadingRooms: true,
            };
        case types.LOAD_ROOMS_SUCCESS:
            return {
                ...state,
                rooms: action.rooms,
                isLoadingRooms: false,
            };
        case types.LOAD_ROOMS_ERROR:
            return {
                ...state,
                isLoadingRooms: false,
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


        case types.UPDATE_REGISTER:
            return {
                ...state,
                register: action.register,
            };


        default:
            return state;
    }
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
    // const currentTime = new Date().getTime();
    return registers.map((register) => {
        return {
            ...register,
            price: register.room_history.length !== 0 ?
                !register.is_member ?
                    register.room_history[register.room_history.length - 1].room.room_type.price :
                    register.room_history[register.room_history.length - 1].room.room_type.member_price
                : 0, // note
            official_start_time: register.room_history.length !== 0 ? register.room_history[register.room_history.length - 1].start_time :
                // moment(currentTime).format("YYYY-MM-DD HH:mm:ss")
                register.start_time
            ,
            official_end_time: register.room_history.length !== 0 ? register.room_history[register.room_history.length - 1].end_time :
                // moment(currentTime).format("YYYY-MM-DD HH:mm:ss")
                register.end_time
            ,
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