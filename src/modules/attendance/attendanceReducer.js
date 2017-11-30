
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function attendanceReducer(state = initialState.attendance, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_GENS_DATA_ATTENDANCE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    isLoadingGens: true,

                }
            };
        case types.LOAD_GENS_ATTENDANCE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingGens: false,
                    gens: action.gens,
                    currentGen: action.currentGen,
                }
            };
        case types.LOAD_GENS_ATTENDANCE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingGens: false,
                }
            };
        case types.BEGIN_LOAD_BASES_DATA_ATTENDANCE:
            return {
                ...state,
                ...{
                    isLoading: true,
                    isLoadingBases: true,
                }
            };
        case types.LOAD_BASES_ATTENDANCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLoadingBases: false,
                bases: action.bases

            };
        case types.LOAD_BASES_ATTENDANCE_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingBases: false,
                }
            };
        case types.ATTENDANCE_BEGIN_LOAD_CLASS_DATA:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.ATTENDANCE_LOAD_CLASS_DATA_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: action.data,
                }
            };
        case types.ATTENDANCE_LOAD_CLASS_DATA_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_LOAD_LESSON_CLASS_MODAL:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonClassModal: true,
                }
            };
        case types.LOAD_LESSON_CLASS_MODAL_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonClassModal: false,
                    class: action.class,
                    data: state.data,
                }
            };
        case types.LOAD_LESSON_CLASS_MODAL_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonClassModal: false,
                }
            };
        case types.BEGIN_LOAD_LESSON_DETAIL_MODAL:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonDetailModal: true,
                }
            };
        case types.LOAD_LESSON_DETAIL_MODAL_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonDetailModal: false,
                    lesson: action.lesson
                }
            };
        case types.LOAD_LESSON_DETAIL_MODAL_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonDetailModal: false,
                    lesson: []
                }
            };
        case types.BEGIN_TAKE_ATTENDANCE:{
                let newdata = [...state.lesson];
                let index = action.index;
                let newitem = {...newdata[index]};
                newitem.attendance_status = !newitem.attendance_status;
                newdata[index] = newitem;
                return {
                    ...state,
                    ...{
                        isLoading: false,
                        isTakingAttendance: true,
                        lesson: newdata,
                    }
                };
            }
        case types.TAKE_ATTENDANCE_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    isTakingAttendance: false,

                }
            };

        case types.TAKE_ATTENDANCE_ERROR:{
            let newdata = [...state.lesson];
            let index = action.index;
            let newitem = {...newdata[index]};
            newitem.attendance_status = !newitem.attendance_status;
            newdata[index] = newitem;
            return {
                ...state,
                ...{
                    isLoading: false,
                    isTakingAttendance: false,
                    lesson: newdata,
                }
            };
        }
        default:        return state;
    }
}