
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

            let newdata = {...state.data, staffs: [action.obj,...state.data.staffs]};

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

        case types.BEGIN_LOAD_STAFFS_JOB_ASSIGNMENT: {
            return {
                ...state,
                ...{
                    isLoading: true,
                    isLoadingStaffs: true
                }
            };
        }
        case types.LOAD_STAFFS_JOB_ASSIGNMENT_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingStaffs: false,
                    staffs: getStaffs(action.staffs),
                }
            };
        }
        case types.LOAD_STAFFS_JOB_ASSIGNMENT_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    isLoadingStaffs: false,
                }
            };
        }
        case types.BEGIN_CREATE_WORK: {
            return {
                ...state,
                ...{
                    isSaving: true,
                }
            };
        }
        case types.CREATE_WORK_SUCCESS: {
            return {
                ...state,
                ...{
                    isSaving: false,
                }
            };
        }
        case types.CREATE_WORK_ERROR: {
            return {
                ...state,
                ...{
                    isSaving: false,
                }
            };
        }
        case types.BEGIN_DELETE_WORK: {
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        }
        case types.DELETE_WORK_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.DELETE_WORK_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.BEGIN_EDIT_WORK: {
            return {
                ...state,
                ...{
                    isSaving: true,
                }
            };
        }
        case types.EDIT_WORK_SUCCESS: {
            return {
                ...state,
                ...{
                    isSaving: false,
                }
            };
        }
        case types.EDIT_WORK_ERROR: {
            return {
                ...state,
                ...{
                    isSaving: false,
                }
            };
        }
        case types.BEGIN_CHANGE_STATUS_WORK: {
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        }
        case types.CHANGE_STATUS_WORK_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.CHANGE_STATUS_WORK_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.BEGIN_REVERT_WORK: {
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        }
        case types.REVERT_WORK_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.REVERT_WORK_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.BEGIN_LOAD_INFO_WORK: {
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        }
        case types.LOAD_INFO_WORK_SUCCESS: {
            let newdata = {...action.work, staffs: getStaffs(action.work.staffs)};
            let newstaffs = filterStaff([...action.work.staffs],[...state.staffs]);
            return {
                ...state,
                ...{
                    isLoading: false,
                    data : newdata,
                    staffs: newstaffs,
                }
            };
        }
        case types.LOAD_INFO_WORK_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.BEGIN_LOAD_WORKS_JOB_ASSIGNMENT: {
            return {
                ...state,
                ...{
                    isLoading: true,
                }
            };
        }
        case types.LOAD_WORKS_JOB_ASSIGNMENT_SUCCESS: {
            return {
                ...state,
                ...{
                    isLoading: false,
                    works: action.works,
                }
            };
        }
        case types.LOAD_WORKS_JOB_ASSIGNMENT_ERROR: {
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        }
        case types.RESET_DATA_CREATE_WORK: {
            let defaultData = {
                name: "",
                type: "personal",
                cost: 0,
                deadline: "",
                bonus_value: 0,
                bonus_type: "coin",
                staffs: [],
            };
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: defaultData,
                }
            };
        }

        default:
            return state;
    }
}


function getStaffs(arr) {
    return arr.map((obj)=>{return {...obj, label: obj.name,value: obj.id}});
}

function remove(obj, arr) {
    let res = arr.filter((item)=> item.value != obj.value);
    return res;
}


function filterStaff(staffs, allstaffs) {
    let res = [];
    allstaffs.forEach((obj)=>{
        let check = false;
        staffs.forEach((item)=>{
            if(item.id ==obj.id) {
                check = true;}
        });
        if(!check) res = [...res, obj];
    });
    return res;
}

