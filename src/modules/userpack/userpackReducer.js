import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

let tmpUserpacks , subs;
export default function userpackReducer(state = initialState.userpacks, action) {
    switch (action.type) {
        case types.BEGIN_LOAD_USERPACKS:
            return {
                ...state,
                isLoadingUserpacks: true,
            };
        case types.LOADED_USERPACKS_SUCCESS:
            return {
                ...state,
                isLoadingUserpacks: false,
                ListUserpacks: action.ListUserpacks,
                totalPagesPacks: action.totalPagesPacks,
            };
        case types.LOADED_USERPACKS_ERROR:
            return {
                ...state,
                isLoadingUserpacks: false,
            };
        case types.BEGIN_UPLOAD_IMAGE_USERPACK:
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isUpdatingImage: true,
                    updateImageError: false,
                }
            };
        case types.UPLOAD_IMAGE_USERPACK_SUCCESS :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isUpdatingImage: false,
                    updateImageError: false,
                    avatar_url: action.avatar_url,
                }
            };
        case  types.UPLOAD_IMAGE_USERPACK_FAILED:
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isUpdatingImage: false,
                    updateImageError: true,
                }
            };
        case types.UPDATE_FORM_USERPACK :
            return {
                ...state,
                userpack: action.data,
            };
        case types.UPDATE_FORM_SUBSCRIPTION :
            return {
                ...state,
                subscription: action.data,
            };
        case types.UPDATE_FORM_SUBSCRIPTION_KIND :
            return {
                ...state,
                subscriptionKind: action.data,
            };


        case types.BEGIN_ADD_USERPACK :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isSavingAddUserpack: true,
                },
            };
        case types.ADDED_USERPACK_SUCCESS :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isSavingAddUserpack: false,
                },
            };
        case types.ADDED_USERPACK_ERROR :
            return {
                ...state,
                userpack: {
                    ...state.userpack,
                    isSavingAddUserpack: false,
                },
            };


        case types.BEGIN_EDIT_USERPACK :
            return {
                ...state,
                isSavingEditUserpack: true,
            };
        case types.EDITED_USERPACK_SUCCESS :
            return {
                ...state,
                isSavingEditUserpack: false,
            };
        case types.EDITED_USERPACK_ERROR :
            return {
                ...state,
                isSavingEditUserpack: false,
            };


        case types.BEGIN_ADD_SUBSCRIPTION :
            return {
                ...state,
                isSavingSubscription: true,
            };
        case types.ADDED_SUBSCRIPTION_SUCCESS :
            return {
                ...state,
                isSavingSubscription: false,
                userpack: {
                    ...state.userpack,
                    subscriptions: [...state.userpack.subscriptions, action.subscription],
                },
            };
        case types.ADDED_SUBSCRIPTION_ERROR :
            return {
                ...state,
                isSavingSubscription: false,
            };





        case types.BEGIN_EDIT_SUBSCRIPTION :
            return {
                ...state,
                isSavingSubscription: true,
            };
        case types.EDITED_SUBSCRIPTION_SUCCESS :
            subs = changeSubscription(state.userpack.subscriptions,action.subscription);
            return {
                ...state,
                isSavingSubscription: false,
                userpack: {
                    ...state.userpack,
                    subscriptions: subs,
                },
            };
        case types.EDITED_SUBSCRIPTION_ERROR :
            return {
                ...state,
                isSavingSubscription: false,
            };





        case types.BEGIN_ADD_SUBSCRIPTION_KIND :
            return {
                ...state,
                isSavingSubscriptionKind: true,
            };
        case types.ADDED_SUBSCRIPTION_KIND_SUCCESS :
            return {
                ...state,
                isSavingSubscriptionKind: false,
            };
        case types.ADDED_SUBSCRIPTION_KIND_ERROR :
            return {
                ...state,
                isSavingSubscriptionKind: false,
            };


        case types.CHANGE_STATUS_IN_USERPACK :
            tmpUserpacks = changeStatus(state.ListUserpacks, action.id, action.status);
            return {
                ...state,
                ListUserpacks: tmpUserpacks,
            };
        case types.CHANGE_SUBSCRIPTION_KIND :
            return {
                ...state,
                subscription: {
                    ...state.subscription,
                    subscriptionKind: action.value,

                },
            };
        case types.LOAD_SUBSCRIPTIONKINDS:{
            return {
                ...state,
                subscriptionKinds : action.subscriptionKinds,
            };
        }

        case types.BEGIN_LOAD_DETAIL_USERPACK:
            return {
                ...state,
                isLoadingUserpack: true,
            };
        case types.LOADED_DETAIL_USERPACK_SUCCCESS:
            return {
                ...state,
                isLoadingUserpack: false,
                userpack: {
                    ...action.userpack,
                    subscriptions: action.subscriptions,
                }
            };
        case types.LOADED_DETAIL_USERPACK_ERROR:
            return {
                ...state,
                isLoadingUserpack: false,
            };
        default:
            return state;
    }
}

function changeStatus(ListUserpacks, id, status) {
    tmpUserpacks = [];
    tmpUserpacks = ListUserpacks.map((pack) => {
        if (pack.id === id) {
            return {...pack, status: 1 - status};
        }
        else {
            return pack;
        }
    });
    return tmpUserpacks;
}
function changeSubscription(subscriptions , subscription) {
 subs = subscriptions.map((sub)=>{
     if(sub.id === subscription.id){
         return subscription;
     }
     else return sub;
 });
 return subs;
}
