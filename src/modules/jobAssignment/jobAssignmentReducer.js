
import * as types   from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function jobAssignmentReducer(state = initialState.jobAssignment, action) {
    switch (action.type) {
        case types.UPDATE_DATA_CREATE_JOB_ASSIGNMENT: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: action.data,
                }
            };
        }
        case types.CHOOSE_STAFF_JOB_ASSIGNMENT: {
            let newstaffs = remove(action.obj, [...state.staffs]);
            let newdata = {...state.data, staffs: [...state.data.staffs,action.obj]};
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: newdata,
                    staffs: newstaffs,
                }
            };
        }
        case types.REMOVE_STAFF_JOB_ASSIGNMENT: {
            let newstaffs = [...state.staffs, action.obj];
            let newdata = {...state.data, staffs: remove(action.obj, [...state.data.staffs])};
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: newdata,
                    staffs: newstaffs,
                }
            };
        }
        default:
            return state;
    }
}

function remove(obj, arr) {
    return arr.filter((item)=> item.value != obj.value);
}