/* eslint-disable */
import {observable, action, computed} from "mobx";
import {showErrorNotification, showNotification, showTypeNotification} from "../../helpers/helper";
import {approvalTeachingSalaryApi} from "../salaryTeaching/salaryTeachingApi";
import {getAllSettingApi, saveSettingsApi} from "./settingApi";

export default class SettingStore {
    @observable isLoading = false;
    @observable isSaving = false;
    @observable settings = [];


    @action
    loadSettings() {
        this.isLoading = true;
        getAllSettingApi().then((res) => {
            this.settings = res.data.settings;
        }).finally(() => {
            this.isLoading = false;
        });
    }

    @action
    saveSettings() {
        this.isSaving = true;
        showTypeNotification("Đang lưu", "info");
        saveSettingsApi(this.settings).then((res) => {
            showNotification("Sửa thành công");
        }).catch(() => {
            showErrorNotification("Có lỗi xảy ra");
        }).finally(() => {
            this.isSaving = false;
        });
    }
}