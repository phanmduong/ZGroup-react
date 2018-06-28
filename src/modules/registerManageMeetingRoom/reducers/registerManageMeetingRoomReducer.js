import types from '../constants/actionTypes';
import moment from "moment/moment";
import {DATETIME_FORMAT, DATETIME_FORMAT_SQL} from "../../../constants/constants";
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
    register: {
        similar_room: [],
        room_id: 0,
    },
    isLoadingBases: false,
    isLoadingBasesByProvince: false,
    isLoadingProvinces: false,
    isLoadingSalers: false,
    isLoadingRooms: false,
    isLoadingCampaigns: false,
    bases: [],
    campaigns: [],
    basesByProvince: [],
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


        case types.BEGIN_LOAD_CAMPAIGNS:
            return {
                ...state,
                isLoadingCampaigns: true,
            };
        case types.LOAD_CAMPAIGNS_SUCCESS:
            return {
                ...state,
                isLoadingCampaigns: false,
                campaigns: action.campaigns,
            };
        case types.LOAD_CAMPAIGNS_ERROR:
            return {
                ...state,
                isLoadingCampaigns: false,
            };


        case types.BEGIN_LOAD_BASES_BY_PROVINCE:
            return {
                ...state,
                isLoadingBasesByProvince: true,
            };
        case types.LOAD_BASES_BY_PROVINCE_SUCCESS:
            return {
                ...state,
                isLoadingBasesByProvince: false,
                basesByProvince: action.bases,
            };
        case types.LOAD_BASES_BY_PROVINCE_ERROR:
            return {
                ...state,
                isLoadingBasesByProvince: false,
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


        case types.CLOSE_CONFIRM_MODAL:
            return {
                ...state,
                isOpenConfirmModal: false,
            };

        case types.OPEN_CONFIRM_MODAL:
            return {
                ...state,
                isOpenConfirmModal: true,
                register: {
                    ...state.register,
                    room_id: action.room_id,
                    room: state.rooms.filter((room) => {
                        return room.id === action.room_id;
                    })[0]
                },
            };


        case types.CLOSE_ADD_REGISTER_MODAL:
            return {
                ...state,
                isOpenAddRegisterModal: false,
                register: {},
            };

        case types.OPEN_ADD_REGISTER_MODAL:
            // let register = action.register;
            return {
                ...state,
                isOpenAddRegisterModal: true,
                // register: {
                //     ...state.register,
                //     id: register.id ? register.id : "",
                //     name: register.user.name,
                //     email: register.user.email,
                //     phone: register.user.phone,
                //     address: register.user.address,
                //     status: register.status,
                //     base_id: register.base_id,
                //     start_time: moment(register.start_time, [
                //         DATETIME_FORMAT,
                //         DATETIME_FORMAT_SQL
                //     ]).format(DATETIME_FORMAT_SQL),
                //     end_time: moment(register.end_time, [
                //         DATETIME_FORMAT,
                //         DATETIME_FORMAT_SQL
                //     ]).format(DATETIME_FORMAT_SQL),
                //     note: register.note,
                //     campaign_id: register.campaign_id,
                //     similar_room: register.similar_room
                // },
            };


        case types.UPDATE_REGISTER:
            return {
                ...state,
                register: action.register,
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