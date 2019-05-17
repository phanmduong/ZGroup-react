/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let classes;
export default function dashboardReducer(state = initialState.dashboard, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_CARDS_MODAL_DASHBOARD_IT:
            return {
                ...state,
                it: {
                    ...state.it,
                    isLoadingCardsModal: true,
                }
            };
        case types.LOAD_CARDS_MODAL_DASHBOARD_IT_SUCCESS:
            return {
                ...state,
                it: {
                    ...state.it,
                    cards: action.cards,
                    isLoadingCardsModal: false,
                }
            };
        case types.SHOW_CARDS_MODAL_DASHBOARD_IT:
            return {
                ...state,
                it: {
                    ...state.it,
                    showCardsModal: action.show,
                }
            };
        case types.BEGIN_LOAD_CARDS_STAFF_DURATION:
            return {
                ...state,
                it: {
                    ...state.it,
                    isLoading: true
                }
            };
        case types.LOAD_CARDS_STAFF_DURATION_SUCCESS:
            return {
                ...state,
                it: {
                    ...state.it,
                    isLoading: false,
                    staffs: action.staffs,
                    dateArray: action.days,
                    cardsByDate: action.num_cards,
                    pointByDate: action.total_points
                }
            };
        case types.BEGIN_LOAD_GENS_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false
                }
            };
        case types.LOAD_GENS_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true
                }
            };
        case types.BEGIN_LOAD_BASES_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false

                }
            };
        case types.LOAD_BASES_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
        case types.BEGIN_LOAD_DASHBOARD_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false

                }
            };
        case types.LOAD_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    dashboard: action.dashboard,
                    timeShifts: action.dashboard.time,
                    dateShifts: action.dashboard.current_date,
                    timeClasses: action.dashboard.time,
                    dateClasses: action.dashboard.current_date,
                }
            };
        case types.LOAD_DASHBOARD_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_CHANGE_CLASS_STATUS_DASHBOARD:
            classes = changeClassStatus(action.classId, state.dashboard.classes);
            return {
                ...state,
                ...{
                    dashboard: {
                        ...state.dashboard,
                        classes: classes
                    }
                }
            };
        case types.BEGIN_LOAD_CLASS_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingClass: true,
                    errorClass: false

                }
            };
        case types.LOAD_CLASS_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingClass: false,
                    errorClass: false,
                    class: action.class,
                }
            };
        case types.LOAD_CLASS_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingClass: false,
                    errorClass: true
                }
            };
        case types.BEGIN_LOAD_ATTENDANCE_SHIFTS_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingAttendanceShifts: true,
                    errorAttendanceShifts: false,
                    timeShifts: action.time
                }
            };
        case types.LOAD_ATTENDANCE_SHIFTS_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingAttendanceShifts: false,
                    errorAttendanceShifts: false,
                    dateShifts: action.date,
                    dashboard: {
                        ...state.dashboard,
                        shifts: action.shifts
                    }
                }
            };
        case types.LOAD_ATTENDANCE_SHIFTS_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingAttendanceShifts: false,
                    errorAttendanceShifts: true
                }
            };
        case types.BEGIN_LOAD_ATTENDANCE_CLASSES_DATA_DASHBOARD:
            return {
                ...state,
                ...{
                    isLoadingAttendanceClasses: true,
                    errorAttendanceClasses: false,
                    timeClasses: action.time
                }
            };
        case types.LOAD_ATTENDANCE_CLASSES_DASHBOARD_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingAttendanceClasses: false,
                    errorAttendanceClasses: false,
                    dateClasses: action.date,
                    dashboard: {
                        ...state.dashboard,
                        now_classes: action.classes
                    }
                }
            };
        case types.LOAD_ATTENDANCE_CLASSES_DASHBOARD_ERROR:
            return {
                ...state,
                ...{
                    isLoadingAttendanceClasses: false,
                    errorAttendanceClasses: true
                }
            };
        case types.BEGIN_LOAD_STUDY_PACK_REGISTER_DASHBOARD:
            return {
                ...state,
                studyPack: {
                    ...state.studyPack,
                    isLoading: true,
                }
            };
        case types.LOAD_STUDY_PACK_REGISTER_DASHBOARD_SUCCESS:
            return {
                ...state,
                studyPack: {
                    ...state.studyPack,
                    isLoading: false,
                    registers: action.registers,
                    totalPages: action.totalPages,
                }
            };
        case types.LOAD_STUDY_PACK_REGISTER_DASHBOARD_ERROR:
            return {
                ...state,
                studyPack: {
                    ...state.studyPack,
                    isLoading: false,
                }
            };
        case types.BEGIN_LOAD_USER_SP_DASHBOARD_DATA:
            return {
                ...state,
                studyPack: {
                    ...state.studyPack,
                    isLoadingUserSP: true,
                    errorUserSP: false

                }
            };
        case types.LOAD_USER_SP_DASHBOARD_DATA_SUCCESS:
            console.log(action.users);
            return {
                ...state,
                studyPack: {
                    ...state.studyPack,
                    isLoadingUserSP: false,
                    errorUserSP: false,
                    users: action.users
                }
            };
        case types.LOAD_USER_SP_DASHBOARD_DATA_ERROR:
            return {
                ...state,
                studyPack: {
                    ...state.studyPack,
                    isLoadingUserSP: false,
                    errorUserSP: true

                }
            };
        default:
            return state;
    }
}

function changeClassStatus(classId, classes) {
    if (classes) {
        classes = classes.map((classItem) => {
            if (classItem.id === classId) {
                return {
                    ...classItem,
                    status: classItem.status === 1 ? 0 : 1
                };
            }
            return classItem;
        });
    }
    return classes;
}