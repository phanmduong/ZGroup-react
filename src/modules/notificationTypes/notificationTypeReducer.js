import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let notificationTypesData;
export default function importGoodsReducer(state = initialState.notificationTypes, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_NOTIFICATION_TYPES:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_NOTIFICATION_TYPES_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    notificationTypes: action.notificationTypes,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages
                }
            };
        case types.LOAD_NOTIFICATION_TYPES_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.BEGIN_STORE_NOTIFICATION_TYPE:
            return {
                ...state,
                ...{
                    isStoring: true,
                    errorStore: false,
                }
            };

        case types.STORE_NOTIFICATION_TYPE_ERROR:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: true
                }
            };
        case types.STORE_NOTIFICATION_TYPE_SUCCESS:
            if (action.edit) {
                notificationTypesData = state.notificationTypes.map((notificationType) => {
                    if (notificationType.id === action.notificationType.id) {
                        return {...action.notificationType};
                    }
                    return {...notificationType};
                });
            } else {
                notificationTypesData = [action.notificationType, ...state.notificationTypes.slice(0, state.notificationTypes.length - 1)];
            }
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: false,
                    notificationTypes: notificationTypesData,
                }
            };
        default:
            return state;
    }
}