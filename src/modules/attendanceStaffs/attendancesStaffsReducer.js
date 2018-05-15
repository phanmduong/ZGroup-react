/* eslint-disable no-case-declarations */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function attendanceStaffsReducer(state = initialState.attendanceStaffs, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_DATA_ATTENDANCE_STAFFS:
            return {
                ...state,
                ...{
                    isLoadingGens: true,
                    errorGens: false
                }
            };
        case types.LOAD_GENS_ATTENDANCE_STAFFS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_ATTENDANCE_STAFFS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingGens: false,
                    errorGens: true
                }
            };
        case types.BEGIN_LOAD_BASES_DATA_ATTENDANCE_STAFFS:
            return {
                ...state,
                ...{
                    isLoadingBases: true,
                    errorBases: false

                }
            };
        case types.LOAD_BASES_ATTENDANCE_STAFFS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: false,
                    bases: action.bases,
                }
            };
        case types.LOAD_BASES_ATTENDANCE_STAFFS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingBases: false,
                    errorBases: true
                }
            };
        case types.BEGIN_LOAD_STATISTIC_ATTENDANCE_STAFFS:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false

                }
            };
        case types.LOAD_STATISTIC_ATTENDANCE_STAFFS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    salesMarketings: action.salesMarketings,
                    teachers: action.teachers,
                }
            };
        case types.LOAD_STATISTIC_ATTENDANCE_STAFFS_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        default:
            return state;
    }
}

