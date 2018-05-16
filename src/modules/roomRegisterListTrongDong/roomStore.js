import { observable, action, computed } from "mobx";
import * as roomApi from "./roomApi";
import { showErrorNotification, showNotification } from "../../helpers/helper";
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL,  } from "../../constants/constants";
//import { browserHistory } from 'react-router';

const date_format = "H:M D-M-Y";

export const store = new class DashboardStaffStore {
    @observable isLoading = false;
    @observable isBooking = false;
    @observable showCreateModal = false;
    @observable registers = [];
    @observable bases = [];
    @observable rooms = [];
    @observable campaigns = [];
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
      
    };


    @action
    openCreateModal(data) {
        this.showCreateModal = true;
        if(data){
            data.start_time = moment( data.start_time || moment.now(),  [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(date_format);
            data.end_time = moment(data.end_time  || moment.now() ,  [DATETIME_FORMAT, DATETIME_FORMAT_SQL]).format(date_format);
            this.createData = data;
        }else{
            this.createData = defaultData;
        }
    }

    @action
    submitBooking() {
        this.isBooking = true;
        roomApi.submitBooking(this.createData)
        .then(() => {
            this.isBooking = false;
            this.showCreateModal = false;
            this.loadRegisters(this.filter);
        })
        .catch(() => {
            showErrorNotification("Có lỗi xảy ra.");
            this.isBooking = false;
        });
    }

    @action
    loadRegisters() {
        this.isLoading = true;
        roomApi.loadRegisters(this.filter)
            .then((res) => {
                this.isLoading = false;
                this.registers =  res.data.data;
                this.paginator = res.data.paginator;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoading = false;
            });
    }
    
    @action
    loadCampaigns() {
        roomApi.loadCampaigns()
            .then((res) => {
                this.campaigns =  res.data.data.marketing_campaigns;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }
    
    @action
    loadAllBases() {
        roomApi.loadAllBasesApi()
            .then((res) => {
                this.bases =  res.data.data.bases;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }
    @action
    loadAllRooms() {
        roomApi.loadRooms()
            .then((res) => {
                this.rooms =  res.data.data.rooms;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
            });
    }


    @computed
    get allBases() {
        let data = this.bases || [];
        return data.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name,
                ...obj
            };
        });
    }
    
    @computed
    get allCampaigns() {
        let data = this.campaigns || [];
        return data.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name,
                ...obj
            };
        });
    }
    @computed
    get allRooms() {
        let data = this.rooms || [];
        return data.map(function (obj) {
            return {
                value: obj.id,
                label: obj.name,
                ...obj
            };
        });
    }

}();

const defaultData = {
    id:null,
    name: '',
    phone: '',
    email: '',
    address: '',
    note: '',
    status: '',
    campaign_id: 0,
    base_id: null,
    room_id: null,
    start_time: moment(moment.now()).format(date_format),
    end_time: moment(moment.now()).add(1,'days').format(date_format),
    price: '',
};