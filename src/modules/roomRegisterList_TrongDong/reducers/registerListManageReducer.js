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
    isLoadingSalers: false,
    bases: [],
    isSavingPayment: false,
    isChangingOfficialTime: false,
    isOpenPaymentModal: false,
    isOpenDatetimeModal: false,
    isLoadingCampaignFilter: false,
    campaigns: [],
    rooms: [],
    isBooking: false,

};

export default function registerListManageReducer(state = conferenceRoomInitState, action) {
    switch (action.type) {

        case types.BEGIN_REGISTER_ROOMS:
            return {
                ...state,
                isBooking: true,
            };
        case types.REGISTER_ROOMS_SUCCESS: {

            return {
                ...state,
                isBooking: false,
            };
        }
        case types.REGISTER_ROOMS_ERROR:
            return {
                ...state,
                isBooking: false,
            };
        case types.BEGIN_LOAD_ROOMS:
            return {
                ...state,

            };
        case types.LOAD_ROOMS_SUCCESS: {

            return {
                ...state,

                rooms: action.rooms.map((obj) => {
                    return {
                        ...obj,
                        value: obj.id,
                        label: obj.name,
                    };
                }),
            };
        }
        case types.LOAD_ROOMS_ERROR:
            return {
                ...state,

            };

        case types.BEGIN_LOAD_CAMPAIGNS:
            return {
                ...state,
                isLoadingCampaignFilter: true,
            };
        case types.LOAD_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                isLoadingCampaignFilter: false,
                campaigns: action.campaigns.map((obj) => {
                    return {
                        ...obj,
                        value: obj.id,
                        label: obj.name,
                    };
                }),
            };
        case types.LOAD_CAMPAIGNS_ERROR:
            return {
                ...state,
                isLoadingCampaignFilter: false,
            };
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




        case types.BEGIN_LOAD_REGISTERS_LIST:
            return {
                ...state,
                isLoading: true
            };

        case types.LOAD_REGISTERS_LIST_SUCCESS:{
            
            return {
                ...state,
                registers: action.registers,
                isLoading: false,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                totalCount: action.totalCount
            };
        }
        case types.LOAD_REGISTERS_LIST_ERROR:
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