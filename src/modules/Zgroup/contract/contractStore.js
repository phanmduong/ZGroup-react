import { observable, action, computed } from "mobx";
import * as contractApi from "./contractApi";
import { showErrorNotification } from "../../../helpers/helper";
import { CONTRACT_TYPES } from "../../../constants/constants";

export const store = new class DashboardStaffStore {
    @observable isLoading = false;
    @observable isCommitting = false;
    @observable companies = [];
    @observable contracts = [];
    @observable staffs = [];
    @observable createData = {
        company_a: {},
        company_b: {},
        sign_staff: {},
        staff: {},
        type: {},
        contract_number: "",
        value: 0,
        status: 0,
    };




    @action
    getContractDetail(id) {
        this.isLoading = true;
        this.createContract.id = id;
        contractApi
            .getContractDetail(id)
            .then((res) => {
                this.isLoading = false;
                console.log("load detail", res.data);
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }

    @action
    createContract() {
        this.isLoading = true;
        contractApi
            .createContract(this.createContract)
            .then(() => {
                this.isLoading = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }
    @action
    loadAllCompanies(data) {

        contractApi
            .loadAllCompanies(data)
            .then((res) => {
                this.companies = res.data.data.company;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");

            });
    }
    @action
    loadAllContract(data) {

        contractApi
            .loadAllContract(data)
            .then((res) => {
                console.log("company", res.data);
                this.companies = res.data.data.company;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");

            });
    }
    @action
    loadStaffs(data) {
        contractApi
            .loadStaffs(data)
            .then((res) => {
                this.staffs = res.data.staffs;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");

            });
    }


    @computed
    get allCompany() {
        return this.companies.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name,
                ...obj
            };
        });
    }
    @computed
    get allStaff() {
        return this.staffs.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name,
                ...obj
            };
        });
    }

    @computed
    get allContractType() {
        return CONTRACT_TYPES.map(function (obj, index) {
            return {
                id: index,
                value: index,
                label: obj,
            };
        });
    }


}();
