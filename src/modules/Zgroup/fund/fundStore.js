import { observable, action, } from "mobx";
import * as fundApi from "./fundApi";
import { showErrorNotification, showNotification } from "../../../helpers/helper";
//import moment from "moment";
//import { DATETIME_FORMAT, DATETIME_FORMAT_SQL, CONTRACT_TYPES } from "../../../constants/constants";
//import { browserHistory } from 'react-router';

export const store = new class Store {
    @observable isLoading = false;
    @observable isCommitting = false;
    @observable showCreateModal = false;
    @observable funds = [];
    @observable page = 1;
    @observable paginator = {
        current_page: 1,
        limit: 20,
        total_count: 0,
        total_pages: 1,
    };
    @observable createData = defaultData;
    
    @action
    resetData() {
        this.createData = defaultData;
    }

    @action
    createFund = () =>{
        this.isCommitting = true;
        fundApi.createFund(this.createData)
            .then(() => {
                showNotification('Lưu thành công.');
                this.showCreateModal = false;
                this.loadAllFund();
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            })
            .finally(()=>{
                this.isCommitting = false;
            });    
    }

    @action
    loadAllFund() {
        this.isLoading = true;
        fundApi.loadAllFund(this.page)
            .then((res) => {
                this.paginator = res.data.paginator;
                this.funds = res.data.funds;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            })
            .finally(()=>{
                this.isLoading = false;
            });
    }
}();

const defaultData = {
    money_value: 0,
    name :'',
    id: null,
};