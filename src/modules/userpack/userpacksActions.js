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

export function addUserpack(userpack) {
    return function (dispatch) {
        dispatch({
            type: types.BEGIN_ADD_USERPACK,
        });
        userpacksApis.addUserpackApi(userpack)
            .then((res) => {
                    if (res.data.status) {
                        dispatch(loadUserpacks(1,9,""));
                        helper.showNotification("Đã thêm gói", "success" );
                        dispatch({type: types.ADDED_USERPACK_SUCCESS});
                    }
                    else {
                        helper.showErrorNotification("Lỗi");
                        dispatch({type: types.ADDED_USERPACK_ERROR});
                    }
                })
            .catch(()=>{
                helper.showErrorNotification("Lỗi");
                dispatch({
                type : types.ADDED_USERPACK_ERROR,
            });
            });
    };
}
export function changeStatus(id, status,name) {
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