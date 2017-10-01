/**
 * Created by phanmduong on 4/6/17.
 */
import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let subscribersList;
export default function baseListReducer(state = initialState.emailSubscribersList, action) {
    switch (action.type) {
        case types.INIT_FORM_EMAIL_SUBSCRIBERS_LIST:
            return initialState.emailSubscribersList;
        case types.BEGIN_LOAD_EMAIL_SUBSCRIBERS_LIST:
            return {
                ...state,
                ...{
                    isLoading: true,
                    error: false,
                    currentPage: 1,
                    totalPages: 1
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
                    subscribersList: subscribersList,
                    subscribersListItem: action.subscribersList
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
        case types.BEGIN_ADD_EMAIL_SUBSCRIBERS:
            return {
                ...state,
                ...{
                    isLoadingAddEmails: true,
                    errorAddEmails: false,
                }
            };
        case types.ADD_EMAIL_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingAddEmails: false,
                    errorAddEmails: false,
                    subscribers: {
                        ...state.subscribers,
                        subscribers: action.subscriber ? changeSubscribers(action.subscriber, state.subscribers.subscribers) : state.subscribers.subscribers
                    }
                }
            };
        case types.ADD_EMAIL_SUBSCRIBERS_ERROR:
            return {
                ...state,
                ...{
                    isLoadingAddEmails: false,
                    errorAddEmails: true
                }
            };
        case types.DELETE_EMAIL_SUBSCRIBER_SUCCESS:
            return {
                ...state,
                subscribers: {
                    ...state.subscribers,
                    ...{
                        subscribers: deleteSubscriber(action.subscriberId, state.subscribers.subscribers)
                    }
                }
            };
        case types.BEGIN_LOAD_EMAIL_SUBSCRIBERS_LIST_ITEM:
            return {
                ...state,
                ...{
                    isLoadingSubscribersListItem: true,
                    errorSubscribersListItem: false,
                }
            };
        case types.LOAD_EMAIL_SUBSCRIBERS_LIST_ITEM_SUCCESS:
            return {
                ...state,
                ...{
                    isLoadingSubscribersListItem: false,
                    errorSubscribersListItem: false,
                    subscribersListItem: action.subscribersListItem
                }
            };
        case types.LOAD_EMAIL_SUBSCRIBERS_LIST_ITEM_ERROR:
            return {
                ...state,
                ...{
                    isLoadingSubscribersListItem: false,
                    errorSubscribersListItem: true
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

function deleteSubscriber(subscriberId, subscribers) {
    if (subscribers) {
        subscribers = subscribers.filter(subscriberItem => subscriberItem.id !== subscriberId);
    }
    return subscribers;
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

function changeSubscribers(subscriberData, subscribers) {
    if (subscribers) {
        subscribers = subscribers.map((subscriber) => {
            if (subscriber.id === subscriberData.id) {
                return subscriberData;
            }
            return subscriber;
        });
    }
    return subscribers;
}