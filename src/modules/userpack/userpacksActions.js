import * as types from '../../constants/actionTypes';
import * as userpacksApis from './userpacksApis';
import * as helper from '../../helpers/helper';


export function loadUserpacks(page, limit, query) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_LOAD_USERPACKS,
        });
        userpacksApis.loadUserpacksApi(page, limit, query)
            .then((res) => {
                dispatch({
                    type: types.LOADED_USERPACKS_SUCCESS,
                    totalPagesPacks: res.data.paginator.total_pages,
                    ListUserpacks: res.data.user_packs,
                });
            })
            .catch(() => {
                dispatch({
                    type: types.LOADED_USERPACKS_ERROR,
                });
            });
    };
}

export function uploadImage(file) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_UPLOAD_IMAGE_USERPACK,
        });
        userpacksApis.uploadImage(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            dispatch(uploadImageUserpackSuccess(data.link));
        }, () => {
            helper.showErrorNotification("Đăng ảnh thất bại.");
            dispatch(uploadImageUserpackFailed());
        });
    };
}

export function uploadImageUserpackSuccess(avatar_url) {
    return (
        {
            type: types.UPLOAD_IMAGE_USERPACK_SUCCESS,
            avatar_url: avatar_url,
        }
    );
}

export function uploadImageUserpackFailed() {
    return (
        {
            type: types.UPLOAD_IMAGE_USERPACK_FAILED,
        }
    );
}

export function updateFormUserpack(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_FORM_USERPACK,
            data: data,
        });
    };
}
export function updateFormSubscription(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_FORM_SUBSCRIPTION,
            data: data,
        });
    };
}
export function updateFormSubscriptionKind(data) {
    return function (dispatch) {
        dispatch({
            type: types.UPDATE_FORM_SUBSCRIPTION_KIND,
            data: data,
        });
    };
}

export function addUserpack(userpack) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_USERPACK,
        });
        userpacksApis.addUserpackApi(userpack)
            .then((res) => {
                if (res.data.status) {
                    dispatch(loadUserpacks(1, 9, ""));
                    dispatch({type: types.ADDED_USERPACK_SUCCESS});
                    helper.showNotification("Đã thêm gói " + userpack.name, "success");
                }
            else {
                    helper.showErrorNotification("Lỗi");
                    dispatch({type: types.ADDED_USERPACK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Lỗi");
                dispatch({
                    type: types.ADDED_USERPACK_ERROR,
                });
            });
    };
}

export function changeStatus(id, status, name) {
    return function (dispatch) {
        dispatch({
            type: types.CHANGE_STATUS_IN_USERPACK,
            id, status
        });
        userpacksApis.changeStatusApi(id)
            .then((res) => {
                if (res.data.status) {
                    status ?
                        helper.showNotification("Đã ẩn " + name)
                        :
                        helper.showNotification("Đã hiển thị " + name);
                }
            })
        ;
    };
}

export function changeSubscriptionKind(value) {
    return function (dispatch) {
        dispatch({type: types.CHANGE_SUBSCRIPTION_KIND, value: value});
    };
}

export function loadDetailUserpack(id) {
    return function (dispatch) {
        dispatch({type: types.BEGIN_LOAD_DETAIL_USERPACK});
        userpacksApis.loadDetailUserpackApi(id)
            .then((res) => {
                dispatch({type: types.LOADED_DETAIL_USERPACK_SUCCCESS,
                    userpack : res.data.data.userPack,
                    subscriptions : res.data.data.subscriptions,
                });
            })
            .catch(() => {
                dispatch({type: types.LOADED_DETAIL_USERPACK_ERROR});
            });
    };

}
export  function editUserpack(userpack, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_USERPACK,
        });
        userpacksApis.editUserpackApi(userpack)
            .then((res) => {
                if (res.data.status) {
                    dispatch(loadUserpacks(1, 9, ""));
                    dispatch({type: types.EDITED_USERPACK_SUCCESS});
                    closeModal();
                    helper.showNotification("Đã sửa gói " + userpack.name, "success");
                }
                else {
                    helper.showErrorNotification("Lỗi");
                    dispatch({type: types.EDITED_USERPACK_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Lỗi");
                dispatch({
                    type: types.EDITED_USERPACK_ERROR,
                });
            });
    };
}
export  function addSubscription(id,subscription, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_SUBSCRIPTION,
        });
        userpacksApis.addSubscriptionApi(id ,subscription)
            .then((res) => {
                if (res.data.status) {
                    dispatch({type: types.ADDED_SUBSCRIPTION_SUCCESS,
                        subscription,
                    });
                    closeModal();
                    helper.showNotification("Đã thêm ", "success");
                }
                else {
                    helper.showErrorNotification("Lỗi");
                    dispatch({type: types.ADDED_SUBSCRIPTION_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Lỗi");
                dispatch({
                    type: types.ADDED_SUBSCRIPTION_ERROR,
                });
            });
    };
}



export  function editSubscription(id,subscription, closeModal) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_EDIT_SUBSCRIPTION,
        });
        userpacksApis.editSubscriptionApi(id ,subscription)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Đã sửa ", "success");
                    dispatch({type: types.EDITED_SUBSCRIPTION_SUCCESS,
                        subscription,
                    });
                    closeModal();
                }
                else {
                    helper.showErrorNotification("Lỗi");
                    dispatch({type: types.EDITED_SUBSCRIPTION_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Lỗi");
                dispatch({
                    type: types.EDITED_SUBSCRIPTION_ERROR,
                });
            });
    };
}


export  function addSubscriptionKind(subscriptionKind, closeModal ) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_SUBSCRIPTION_KIND,
        });
        userpacksApis.addSubscriptionKindApi(subscriptionKind)
            .then((res) => {
                if (res.data.status) {
                    helper.showNotification("Đã thêm " + subscriptionKind.name , "success");
                    dispatch({type: types.ADDED_SUBSCRIPTION_KIND_SUCCESS,
                        subscriptionKind,
                    });
                    closeModal();
                }
                else {
                    helper.showErrorNotification("Lỗi");
                    dispatch({type: types.ADDED_SUBSCRIPTION_KIND_ERROR});
                }
            })
            .catch(() => {
                helper.showErrorNotification("Lỗi");
                dispatch({
                    type: types.ADDED_SUBSCRIPTION_ERROR,
                });
            });
    };
}