/**
 * Created by TienTaiNguyen on 01/27/18.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function goodOrdersReducer(state = initialState.registerManage, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_REGISTER_MANAGE:
            return {
                ...state,
                isLoading: true
            };
        case types.LOAD_REGISTER_MANAGE_SUCCESS:
            return {
                ...state,
                registers: action.registers,
                isLoading: false,
                totalPages: action.totalPages,
                currentPage: action.currentPage,
                totalCount: action.totalCount
            };
        case types.GET_ALL_STAFFS_REGISTER_MANAGE:
            return {
                ...state,
                staffs: action.staffs
            };

        case types.BEGIN_CHANGE_CALL_STATUS:
            return {
                ...state,
                isChangingStatus: true,
            };
        case types.LOADED_CHANGE_CALL_STATUS_SUCCESS:
            return {
                ...state,
                isChangingStatus: false,
            };
        case types.LOADED_CHANGE_CALL_STATUS_ERROR:
            return {
                ...state,
                isChangingStatus: false,
            };

        default:
            return state;
    }
}