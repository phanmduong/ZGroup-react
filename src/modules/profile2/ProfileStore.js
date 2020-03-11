import {action, computed, observable} from "mobx";
import {
    changeAvatar as changeAvatarApi,
    getRoles,
    getProfile,
    loadBaseApi,
    loadDepartments, editProfile,
} from "./profileApi";
import {
    showErrorNotification,
    showNotification,
    showTypeNotification
} from "../../helpers/helper";

class ProfileStore {
    @observable isLoading = false;
    @observable isStoring = false;
    @observable showModalEditProfile = false;
    @observable profile = {};
    @observable bases = [];
    @observable roles = [];
    @observable departments = [];

    constructor() {
    }

    @action
    getProfileInfo() {
        this.isLoading = true;
        getProfile().then((res) => {
            this.profile = res.data.data.user;
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @action
    changeAvatar(file, callback) {
        changeAvatarApi(file, function (event) {
            let data = JSON.parse(event.currentTarget.response);
            showNotification(data.message);
            this.profile.avatar_url = data.avatar_url;
            let user = JSON.parse(localStorage.getItem('user'));
            if (user.id == this.profile.id) {
                user.avatar_url = data.avatar_url;
                localStorage.setItem('user', JSON.stringify(user));
            }
            if (callback) {
                callback(data.avatar_url);
            }
        }, this.profile.id);
    }

    @action
    editStaff(profile) {
        this.isStoring = true;
        editProfile(profile).then((res) => {
            this.showModalEditProfile = false;
            this.profile = res.data.data.user;
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isStoring = false;
        })
    }

    @action
    resetPassword() {
        showTypeNotification("Đang khôi phục mật khẩu", "info");
        // resetPasswordApi(userID)
        //     .then(() => {
        //         showTypeNotification("Mới khẩu mới của là: 123456");
        //     })
        //     .catch(() => {
        //         showErrorNotification("Có lỗi xảy ra");
        //     });
    }

    @action
    getBases() {
        loadBaseApi().then((res) => {
            this.bases = res.data.bases;
        }).finally(() => {
        });
    }

    @action
    getRoles() {
        getRoles().then((res) => {
            this.roles = res.data.data.roles;
        }).finally(() => {
        });
    }

    @action
    getDepartments() {
        loadDepartments().then((res) => {
            this.departments = res.data.data.departments;
        }).finally(() => {
        });
    }

    @computed
    get base() {
        const base = this.bases.filter((base) => base.id == this.profile.base_id)[0];
        return base ? base : {};
    }

    @computed
    get department() {
        const department = this.departments.filter((department) => department.id == this.profile.department_id)[0];
        return department ? department : {};
    }

    @computed
    get role() {
        const role = this.roles.filter((role) => role.id == this.profile.role_id)[0];
        return role ? role : {};
    }
}

export default ProfileStore;
