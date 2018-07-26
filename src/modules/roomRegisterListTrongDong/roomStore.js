import { observable, action, computed } from "mobx";
import * as roomApi from "./roomApi";
import { 
    showErrorNotification, 
    showNotification,
} from "../../helpers/helper";
import moment from "moment";
import { DATETIME_FORMAT, DATETIME_FORMAT_SQL,  } from "../../constants/constants";

const date_format = "Y-M-D H-M";
// const date_format = "H:M D-M-Y";

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
    @observable disableCreateRegister = false;
    @observable month = {};
    @observable isShowMonthBox = false;
    @observable filter = {
        time : {},
        base_id : 0,
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
        roomApi.submitBooking(this.createData, this.filter)
        .then(() => {
            this.isBooking = false;
            this.showCreateModal = false;
            this.loadRegisters("base_id", this.filter.base_id);
            showNotification("Lưu thành công!");
        })
        .catch(() => {
            showErrorNotification("Có lỗi xảy ra.");
            this.isBooking = false;
        });
    }

    @action
    loadRegisters(key = null, value) {
        let filter = {};
        if(key
            && key !== "time"
        ){
            filter[key] = value;
            // console.log("key\n" +
            //     "            && key !== \"time\"", filter);
        }
        else if (key === "time"){
            filter = {...this.filter};
            filter[key] = value;
            // console.log("key === \"time\")", filter);
        }
        this.filter = filter;
        this.isLoading = true;
        // console.log(filter,"ssssssssss");
        roomApi.loadRegisters(filter)
            .then((res) => {
                this.isLoading = false;
                this.registers =  res.data.room_service_registers;
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
    // @computed
    // get allRooms() {
    //     let data = this.rooms || [];
    //     return data.map(function (obj) {
    //         return {
    //             value: obj.id,
    //             label: obj.name,
    //             ...obj
    //         };
    //     });
    // }

    @computed
    get baseData() {
        let selectData = this.bases.map(function (base) {
            return {
                key: base.id,
                value: base.name,
            };
        });
        return [
            {
                key: 0,
                value: "Tất cả",
            },
            ...selectData,
        ];
    }
    //
    // @computed
    // get disableCreateRegister(){
    //     return this.filter
    // }

    @computed
    get campaignData() {
        return this.campaigns && this.campaigns.map(function (campaign) {
            return {
                ...campaign,
                value: campaign.id,
                label: campaign.name
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
