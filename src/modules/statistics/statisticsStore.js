import {observable, action, computed} from "mobx";
import * as statisticsApis from "./statisticsApis";
import {showErrorNotification} from "../../helpers/helper";


export default new class statisticsStore {
    @observable isLoadingRegisterSummary = false;
    @observable date_array = [];
    @observable register_by_date_cancel = [];
    @observable register_by_date_done = [];
    @observable register_by_date_seed = [];
    @observable register_by_date_view = [];


    @observable new_register_by_date_seed = [];
    @observable new_register_by_date_cancel = [];
    @observable new_register_by_date_done = [];
    @observable new_register_by_date_view = [];
    @observable new_date_array = [];

    @observable isLoadingRooms = false;
    @observable rooms = [];
    @observable selectedRoomId = 0;


    @observable isLoadingBases = false;
    @observable bases = [];
    @observable selectedBaseId = 0;


    @observable isLoadingRoomTypes = false;
    @observable roomTypes = [];
    @observable selectedRoomTypeId = 0;

    // @observable start_time = "";
    // @observable end_time = "";
    @observable start_time_form = "";
    @observable end_time_form = "";

    @observable registers = [];
    @observable isLoadingRegisters = false;
    @observable registerPage = 0;
    @observable totalRegisterPages = 0;
    @observable isExporting = false;




    // @action
    // loadChart() {
    //     this.isLoadingRegisterSummary = true;
    //     statisticsApis
    //         .loadChartApi(this.selectedBaseId, this.selectedRoomTypeId, this.selectedRoomId,this.start_time)
    //         .then(res => {
    //             this.date_array = res.data.data.date_array;
    //             this.register_by_date_cancel = res.data.data.register_by_date.cancel;
    //             this.register_by_date_done = res.data.data.register_by_date.done;
    //             this.register_by_date_view = res.data.data.register_by_date.view;
    //             this.register_by_date_seed = res.data.data.register_by_date.seed;
    //             this.isLoadingRegisterSummary = false;
    //
    //         })
    //         .catch(() => {
    //             showErrorNotification("Có lỗi xảy ra.");
    //             this.isLoadingRegisterSummary = false;
    //         });
    // }

    @action
    loadChart() {
        this.isLoadingRegisterSummary = true;
        statisticsApis
            .loadChartApi(this.selectedBaseId, this.selectedRoomTypeId, this.selectedRoomId, this.start_time_form, this.end_time_form)
            .then(res => {
                this.date_array = res.data.data.date_array;
                this.new_date_array = res.data.data.date_array;
                this.register_by_date_cancel = res.data.data.register_by_date.cancel;
                this.new_register_by_date_cancel = res.data.data.register_by_date.cancel;
                this.register_by_date_done = res.data.data.register_by_date.done;
                this.new_register_by_date_done = res.data.data.register_by_date.done;
                this.register_by_date_view = res.data.data.register_by_date.view;
                this.new_register_by_date_view = res.data.data.register_by_date.view;
                this.register_by_date_seed = res.data.data.register_by_date.seed;
                this.new_register_by_date_seed = res.data.data.register_by_date.seed;
                this.isLoadingRegisterSummary = false;

            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingRegisterSummary = false;
            });
    }

    @action
    loadRegisters(registerPage){
        this.registerPage = registerPage;
        this.isLoadingRegisters = true;
        statisticsApis
            .loadRegistersApi(20,this.registerPage,this.selectedBaseId, this.selectedRoomTypeId, this.selectedRoomId, this.start_time_form, this.end_time_form)
            .then(res => {
                this.registers = res.data.room_service_registers;
                this.totalRegisterPages = res.data.paginator.total_pages;
                this.isLoadingRegisters = false;
            });
            // .catch(() => {
            //     showErrorNotification("Có lỗi xảy ra.");
            //     this.isLoadingRegisters = false;
            // });
    }


    @action
    loadBases() {
        this.isLoadingBases = true;
        statisticsApis
            .loadBasesApi()
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
    loadRooms() {
        this.isLoadingRooms = true;
        statisticsApis
            .loadRoomsApi()
            .then(res => {
                this.rooms = res.data.data.rooms;
                this.isLoadingRooms = false;
            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingRooms = false;
            });
    }

    @action
    loadRoomTypes() {
        this.isLoadingRoomTypes = true;
        statisticsApis
            .loadRoomTypesApi()
            .then(res => {
                this.roomTypes = res.data.data.room_types;
                this.isLoadingRoomTypes = false;

            })
            .catch(() => {
                showErrorNotification("Có lỗi xảy ra.");
                this.isLoadingRoomTypes = false;
            });
    }


    @computed
    get register_by_date_view_data() {
        return this.register_by_date_view.map((val) => {
            return val;
        });
    }

    @computed
    get basesData() {
        let baseData = this.bases.map(function (base) {
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

    @computed
    get roomTypesData() {
        let roomTypesData = this.roomTypes.map(function (base) {
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
            ...roomTypesData
        ];
    }

    @computed
    get dataSet() {
        return {
            labels: this.new_date_array,
            datasets: [{
                label: "view",
                backgroundColor: '#ffaa00',
                borderColor: '#ffaa00',
                data: this.new_register_by_date_view && this.new_register_by_date_view.slice(),
            },
                {
                    label: "done",
                    backgroundColor: '#4caa00',
                    borderColor: '#4caa00',
                    data: this.new_register_by_date_done && this.new_register_by_date_done.slice(),
                },
                {
                    label: "cancel",
                    backgroundColor: '#ff4444',
                    borderColor: '#ff4444',
                    data: this.new_register_by_date_cancel&&this.new_register_by_date_cancel.slice(),
                },
                {
                    label: "seed",
                    backgroundColor: '#9b9b9b',
                    borderColor: '#9b9b9b',
                    data: this.new_register_by_date_seed&&this.new_register_by_date_seed.slice(),
                },
            ]
        };
    }

    @computed
    get roomsData() {
        let rooms = this.rooms;
        if (this.selectedBaseId != 0) {
            rooms = rooms.filter(room => room.base_id == this.selectedBaseId);
        }
        if (this.selectedRoomTypeId != 0) {
            rooms = rooms.filter(room => room.room_type_id == this.selectedRoomTypeId);
        }
        rooms = rooms.map(function (base) {
            return {
                key: base.id,
                value: base.name,
                id: base.id
            };
        });

        return [
            {
                key: 0,
                value: "Tất cả phòng tại cơ sở"
            },
            ...rooms
        ];
    }


}();
