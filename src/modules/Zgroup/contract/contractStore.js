import { observable, action, computed } from "mobx";
import * as contractApi from "./contractApi";
import { showErrorNotification, showNotification } from "../../../helpers/helper";
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL, CONTRACT_TYPES } from "../../../constants/constants";
import { browserHistory } from 'react-router';

export const store = new class DashboardStaffStore {
    @observable isLoading = false;
    @observable isCommitting = false;
    @observable isInfoModal = false;
    @observable showPanel = false;
    @observable companies = [];
    @observable contracts = [];
    @observable staffs = [];
    @observable paginator = {
        current_page: 1,
        limit: 20,
        total_count: 0,
        total_pages: 1,
    };
    @observable createData = defaultData;
    @observable filter = {
        start_time: "",
        end_time: "",
        staff_name: "",
        sign_staff_name: "",
        company_a_id: "",
        company_b_id: "",
        contract_number: "",
        limit: "20",
    };




    @action
    resetData() {
        this.createData = defaultData;
    }

    @action
    openInfoModal(data) {
        this.isInfoModal = true;
        let due_date = data.due_date;
        due_date = moment(due_date, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT);
        let type = data.type;
        this.createData = {
            ...data,
            value: data.value + "", due_date,
            type: { id: type, value: type }
        };

    }
    @action
    getContractDetail(id) {
        this.isLoading = true;
        this.createContract.id = id;
        contractApi.getContractDetail(id)
            .then((res) => {
                this.isLoading = false;
                let due_date = res.data.data.contract.due_date;
                due_date = moment(due_date, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT);
                let type = res.data.data.contract.type;
                this.createData = {
                    ...res.data.data.contract,
                    value: res.data.data.contract.value + "", due_date,
                    type: { id: type, value: type }
                };
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                browserHistory.push("/administration/contract");
                this.isLoading = false;
            });
    }

    @action
    createContract() {
        this.isLoading = true;
        let due_date = moment(this.createData.due_date, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT_SQL);
        let res = { ...this.createData, due_date };
        contractApi.createContract(res)
            .then(() => {
                this.isLoading = false;
                showNotification("Tạo thành công");
                browserHistory.push("/administration/contract");
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }
    @action
    editContract() {
        this.isLoading = true;
        let due_date = moment(this.createData.due_date, [DATETIME_FORMAT_SQL, DATETIME_FORMAT]).format(DATETIME_FORMAT_SQL);
        let res = { ...this.createData, due_date };
        contractApi.editContract(res)
            .then(() => {
                this.isLoading = false;
                showNotification("Sửa thành công");
                browserHistory.push("/administration/contract");
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }
    @action
    loadAllCompanies(data) {

        contractApi.loadAllCompanies(data)
            .then((res) => {
                this.companies = res.data.data.company;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                browserHistory.push("/administration/contract");
            });
    }
    @action
    loadAllContract() {
        contractApi.loadAllContract(filter)
            .then((res) => {
                this.paginator = res.data.paginator;
                this.contracts = res.data.data;
                console.log("load all: ", res.data);
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");

            });
    }
    @action
    loadStaffs(data) {
        contractApi.loadStaffs(data)
            .then((res) => {
                this.staffs = res.data.staffs;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                browserHistory.push("/administration/contract");
            });
    }


    @computed
    get allCompany() {
        let data = this.companies || [];
        return data.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name,
                ...obj
            };
        });
    }
    @computed
    get allStaff() {
        let data = this.staffs || [];
        return data.map(function (obj) {
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

const defaultData = {
    company_a: { id: "", name: "", },
    company_b: { id: "", name: "" },
    sign_staff: { id: "", name: "", phone: "", avatar_url: "" },
    staff: { id: "", name: "", phone: "", avatar_url: "" },
    type: { id: '', value: '', label: '' },
    contract_number: 0,
    value: "",
    status: 0,
};