
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function attendanceReducer(state = initialState.attendance, action) {
    switch (action.type) {
        case types.UPDATE_DATA_MODAL_DETAIL_LESSON:{
            let index = action.index;
            let newobj = {...state.lesson[index]};
            newobj[action.name] = action.value;
            let newdata = [...state.lesson.slice(0,index),newobj,...state.lesson.slice(index+1)];
            return {
                ...state,
                ...{
                    lesson: newdata
                }
            };
        }
        case types.BEGIN_LOAD_CLASS_INFO:
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        case types.LOAD_CLASS_INFO_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    selectedClass: action.selectedClass
                }
            };
        case types.LOAD_CLASS_INFO_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
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
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    totalCount: action.totalCount,
                    limit: action.limit
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
        case types.LOAD_LESSON_CLASS_MODAL_SUCCESS:{

            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingLessonClassModal: false,
                    class: action.class,
                    data: state.data,
                }
            };
        }
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
                return {
                    ...state,
                    ...{
                        isLoading: false,
                        isTakingAttendance: true,
                    }
                };
            }
        case types.TAKE_ATTENDANCE_SUCCESS:

            return {
                ...state,
                ...{
                    isLoading: false,
                    isTakingAttendance: false,
                    lesson : action.data
                }
            };

        case types.TAKE_ATTENDANCE_ERROR:{
            return {
                ...state,
                ...{
                    isLoading: false,
                    isTakingAttendance: false,
                }
            };
        }
        default:        return state;
    }
}