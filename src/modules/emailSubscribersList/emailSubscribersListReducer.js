/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let subscribersList;
export default function baseListReducer(state = initialState.emailSubscribersList, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_EMAIL_SUBSCRIBERS_LIST:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                }
            };
        case types.LOAD_EMAIL_SUBSCRIBERS_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: false,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    subscribersList: action.subscribersList
                }
            };
        case types.LOAD_EMAIL_SUBSCRIBERS_LIST_ERROR:
            return {
                ...state,
                ...{
                    isLoading: false,
                    error: true
                }
            };
        case types.DELETE_EMAIL_SUBSCRIBERS_LIST_SUCCESS:
            return {
                ...state,
                ...{
                    subscribersList: deleteSubscribersList(action.subscribersListId, state.subscribersList)
                }
            };
        case types.BEGIN_STORE_EMAIL_SUBSCRIBERS_LIST:
            return {
                ...state,
                ...{
                    isStoring: true,
                    errorStore: false,
                }
            };
        case types.STORE_EMAIL_SUBSCRIBERS_LIST_SUCCESS:
            if (action.edit) {
                subscribersList = changeSubscribersList(action.subscribersList, state.subscribersList);
            } else {
                subscribersList = [action.subscribersList, ...state.subscribersList];
            }
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: false,
                    subscribersList: subscribersList
                }
            };
        case types.STORE_EMAIL_SUBSCRIBERS_LIST_ERROR:
            return {
                ...state,
                ...{
                    isStoring: false,
                    errorStore: true
                }
            };
        case types.BEGIN_LOAD_EMAIL_SUBSCRIBERS:
            return {
                ...state,
                subscribers: {
                    ...state.subscribers,
                    ...{
                        isLoading: true,
                        error: false,
                    }
                }

            };
        case types.LOAD_EMAIL_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                subscribers: {
                    ...state.subscribers,
                    ...{
                        isLoading: false,
                        error: false,
                        currentPage: action.currentPage,
                        totalPages: action.totalPages,
                        subscribers: action.subscribers
                    }
                }
            };
        case types.LOAD_EMAIL_SUBSCRIBERS_ERROR:
            return {
                ...state,
                subscribers: {
                    ...state.subscribers,
                    ...{
                        isLoading: false,
                        error: true
                    }
                }
            };
        default:
            return state;
    }
}

function deleteSubscribersList(subscribersListId, subscribersList) {
    if (subscribersList) {
        subscribersList = subscribersList.filter(subscribersItem => subscribersItem.id !== subscribersListId);
    }
    return subscribersList;
}

function changeSubscribersList(subscribersListData, subscribersList) {
    if (subscribersList) {
        subscribersList = subscribersList.map((subscribersListItem) => {
            if (subscribersListItem.id === subscribersListData.id) {
                return subscribersListData;
            }
            return subscribersListItem;
        });
    }
    return subscribersList;
}