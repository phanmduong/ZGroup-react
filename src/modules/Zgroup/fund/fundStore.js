import { observable, action, computed, } from "mobx";
import * as fundApi from "./fundApi";
import { showErrorNotification, showNotification } from "../../../helpers/helper";
//import moment from "moment";
//import { DATETIME_FORMAT, DATETIME_FORMAT_SQL, CONTRACT_TYPES } from "../../../constants/constants";
//import { browserHistory } from 'react-router';

export const store = new class Store {
    @observable isLoading = false;
    @observable isCommitting = false;
    @observable showCreateModal = false;
    @observable showTransferModal = false;
    @observable historyFund = [];
    @observable funds = [];
    @observable allFund = [];
    @observable page = 1;
    @observable paginator = {
        current_page: 1,
        limit: 20,
        total_count: 0,
        total_pages: 1,
    };
    @observable createData = defaultData;
    @observable transferData = {
        payer_id: null,
        receiver_id: null,
        money_value: 0,
        content:'',
    };
    
    @action
    resetData() {
        this.createData = defaultData;
    }

    @action
    openTransferModal = (data)=> {
        this.transferData = {
            payer_id: null,
            receiver_id: null,
            money_value: 0,
            content:'',
        };
        this.transferData.payer_id = data.id;
        this.showTransferModal = true;
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
    transfer = () =>{
        this.isCommitting = true;
        fundApi.transfer(this.transferData)
            .then(() => {
                showNotification('Lưu thành công.');
                this.showTransferModal = false;
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
    loadAllFund(page) {
        this.isLoading = true;
        fundApi.loadAllFund(page)
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

    @action
    loadAllFundNoPaging() {
        fundApi.loadAllFundNoPaging()
            .then((res) => {
                this.allFund = res.data.data.funds;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }

    @action
    loadAllHistoryFund(page) {
        this.isLoading = true;
        fundApi.loadAllHistoryFund(page)
            .then((res) => {
                this.paginator = res.data.paginator;
                this.historyFund = res.data.historyFunds;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            })
            .finally(()=>{
                this.isLoading = false;
            });
    }

    @computed
    get allFunds() {
        return this.allFund.map(function (obj, index) {
            return {
                id: index + 1,
                value: index + 1,
                label: obj.name,
            };
        });
    }

}();

const defaultData = {
    money_value: 0,
    name :'',
    id: null,
};