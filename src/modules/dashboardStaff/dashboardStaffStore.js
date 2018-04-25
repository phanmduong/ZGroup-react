import { observable, action, computed } from "mobx";
import * as dashboardStaffApi from "./dashboardStaffApi";
import { showErrorNotification } from "../../helpers/helper";

export const store = new class DashboardStaffStore {
    @observable isLoadingGens = false;
    @observable gens = [];
    @observable isLoadingBases = false;
    @observable bases = [];
    @observable selectedGenId = 0;
    @observable selectedBaseId = 0;
    @observable isLoading = false;
    @observable isLoadingTeachingSchedule = false;
    @observable isLoadingWorkShifts = false;
    @observable isLoadingShifts = false;
    @observable user = {};

    @action
    loadGens() {
        this.isLoadingGens = true;
        dashboardStaffApi.loadGens().then(res => {
            this.gens = res.data.data.gens;
            this.selectedGenId = res.data.data.current_gen.id;
            this.isLoadingGens = false;
        });
    }

    @action
    loadBases() {
        this.isLoadingBases = true;
        dashboardStaffApi
            .loadBases()
            .then(res => {
                this.bases = res.data.data.bases;
                this.isLoadingBases = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingBases = false;
            });
    }

    @action
    loadDashboardStaff() {
        this.isLoading = true;
        dashboardStaffApi
            .loadDashboard(this.selectedGenId, this.selectedBaseId)
            .then(res => {
                this.user = res.data.data.user;
                this.isLoading = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @action
    loadTeachingSchedule(startTime, endTime) {
        this.isLoadingTeachingSchedule = true;
        dashboardStaffApi
            .loadTeachingSchedule(startTime, endTime)
            .then(res => {
                this.user = { ...this.user, now_classes: res.data.data.classes };
                this.isLoadingTeachingSchedule = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingTeachingSchedule = false;
            });
    }

    @action
    loadWorkShifts(startTime, endTime) {
        this.isLoadingWorkShifts = true;
        dashboardStaffApi
            .loadWorkShifts(startTime, endTime)
            .then(res => {
                this.user = { ...this.user, work_shifts: res.data.data.work_shifts };
                this.isLoadingWorkShifts = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingWorkShifts = false;
            });
    }

    @action
    loadShifts(startTime, endTime) {
        this.isLoadingShifts = true;
        dashboardStaffApi
            .loadShifts(startTime, endTime)
            .then(res => {
                this.user = { ...this.user, shifts: res.data.data.shifts };
                this.isLoadingShifts = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingShifts = false;
            });
    }

    @computed
    get gensData() {
        return this.gens.map(function(gen) {
            return {
                key: gen.id,
                value: "Khóa " + gen.name
            };
        });
    }

    @computed
    get basesData() {
        let baseData = this.bases.map(function(base) {
            return {
                key: base.id,
                value: base.name
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả"
            },
            ...baseData
        ];
    }
}();
