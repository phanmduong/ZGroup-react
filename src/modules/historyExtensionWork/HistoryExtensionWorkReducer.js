import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function historyExtensionWorkReducer(state = initialState.historyExtension, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_HISTORY_EXTENSION_WORK:
            return {
                ...state,
                ...{
                    isLoading: true
                }
            };
        case types.LOAD_HISTORY_EXTENSION_WORK_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: action.data,
                    paginator: action.paginator,

                },

            };
        case types.LOAD_HISTORY_EXTENSION_WORK_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                }
            };
        case types.BEGIN_DELETE_HISTORY_EXTENSION_WORK:
            return {
                ...state,
            };
        case types.DELETE_HISTORY_EXTENSION_WORK_SUCCESS: {
            let data = [...state.data];
            return {
                ...state,
                ...{
                    isLoading: false,
                    data: data,
                },
            };
        }
        case types.DELETE_HISTORY_EXTENSION_WORK_ERROR:
            return {
                ...state,
            };
        case types.BEGIN_ACCEPT_HISTORY_EXTENSION_WORK:
            return{
                ...state,
            };
        case types.ACCEPT_HISTORY_EXTENSION_WORK_SUCCESS:{
            let data = [...state.data];
            return{
                ...state,
                ...{
                    isLoading : false,
                    data : data,
                }
            };
        }
        case types.ACCEPT_HISTORY_EXTENSION_WORK_ERROR:
            return{
                ...state,
            };

        default:
            return state;
    }


}
